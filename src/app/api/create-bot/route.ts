import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { buildSystemPrompt } from '@/lib/buildSystemPrompt';
import { OnboardingData } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const data: OnboardingData = await req.json();

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
