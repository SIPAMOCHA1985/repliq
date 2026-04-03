import Anthropic from '@anthropic-ai/sdk';
import { ChatMessage } from '@/types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function chat(
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 512,
    system: systemPrompt,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
  });

  return response.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('');
}
