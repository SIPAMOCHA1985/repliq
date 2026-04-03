import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { chat } from '@/lib/claude';
import { ChatMessage } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { botId, message, history = [] }: {
      botId: string;
      message: string;
      history: ChatMessage[];
    } = await req.json();

    // Fetch bot config
    const { data: bot, error } = await supabaseAdmin
      .from('bots')
      .select('system_prompt, is_active, bot_name')
      .eq('id', botId)
      .single();

    if (error || !bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    if (!bot.is_active) {
      return NextResponse.json({ error: 'Bot is inactive' }, { status: 403 });
    }

    const messages: ChatMessage[] = [
      ...history,
      { role: 'user', content: message },
    ];

    const reply = await chat(bot.system_prompt, messages);

    // Save conversation (fire and forget)
    supabaseAdmin.from('conversations').insert({
      bot_id: botId,
      visitor_message: message,
      bot_reply: reply,
    }).then(() => {});

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('chat error:', err);
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 });
  }
}

// Allow CORS for widget embeds
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
