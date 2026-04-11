import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { buildSystemPrompt } from '@/lib/buildSystemPrompt';
import { OnboardingData } from '@/types';

const BOT_LIMITS: Record<string, number> = {
  starter: 1,
  pro: 3,
  agency: 10,
};

export async function POST(req: NextRequest) {
  try {
    const data: OnboardingData = await req.json();

    // Rate limit: check bot count vs plan limit
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (token) {
      const { data: { user } } = await supabaseAdmin.auth.getUser(token);
      if (user) {
        const { data: sub } = await supabaseAdmin
          .from('subscriptions')
          .select('plan')
          .eq('email', user.email)
          .eq('status', 'active')
          .single();

        const plan = sub?.plan ?? 'starter';
        const limit = BOT_LIMITS[plan] ?? 1;

        const { count } = await supabaseAdmin
          .from('bots')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if ((count ?? 0) >= limit) {
          return NextResponse.json(
            { error: `Your ${plan} plan allows up to ${limit} bot(s). Upgrade to add more.` },
            { status: 403 }
          );
        }
      }
    }

    const systemPrompt = buildSystemPrompt(data);

    const { data: bot, error } = await supabaseAdmin
      .from('bots')
      .insert({
        business_name: data.businessName,
        industry: data.industry,
        system_prompt: systemPrompt,
        bot_name: data.botName,
        tone: data.tone,
        widget_color: data.widgetColor,
        welcome_message: data.welcomeMessage,
        contact_info: {
          phone: data.phone,
          email: data.email,
          whatsapp: data.whatsapp,
          method: data.contactMethod,
        },
        onboarding_data: data,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ botId: bot.id });
  } catch (err) {
    console.error('create-bot error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
