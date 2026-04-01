'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { BotConfig, Conversation } from '@/types';
import { Monitor, Smartphone, Copy, Check, Code2, MessageSquare, Settings, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

const PLATFORMS = [
  { name: 'WordPress', steps: 'Go to Appearance → Theme Editor → footer.php. Paste the script just before </body>.' },
  { name: 'Wix', steps: 'Go to Settings → Custom Code → Add Code. Paste in the Body section.' },
  { name: 'Squarespace', steps: 'Settings → Advanced → Code Injection → Footer. Paste your script.' },
  { name: 'Shopify', steps: 'Online Store → Themes → Edit Code → theme.liquid. Paste before </body>.' },
  { name: 'Webflow', steps: 'Project Settings → Custom Code → Footer Code. Paste and publish.' },
  { name: 'HTML', steps: 'Open your HTML file. Paste the script tag just before the closing </body> tag.' },
];

function DashboardContent() {
  const params = useSearchParams();
  const botId = params.get('botId');
  const [bot, setBot] = useState<BotConfig | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [openPlatform, setOpenPlatform] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://repliq.ai';
  const embedCode = `<script src="${appUrl}/widget.js?id=${botId}"></script>`;

  useEffect(() => {
    if (!botId) return;

    async function load() {
      const { data } = await supabase.from('bots').select('*').eq('id', botId).single();
      if (data) setBot(data as BotConfig);

      const { data: convs } = await supabase
        .from('conversations')
        .select('*')
        .eq('bot_id', botId)
        .order('created_at', { ascending: false })
        .limit(10);
      if (convs) setConversations(convs as Conversation[]);
      setLoading(false);
    }

    load();
  }, [botId]);

  const copyEmbed = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success('Embed code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#00F5A0]/20 border-t-[#00F5A0] rounded-full animate-spin" />
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center text-white">
        Bot not found. <a href="/onboarding" className="text-[#00F5A0] ml-2">Create one →</a>
      </div>
    );
  }

  const iframeDoc = `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; font-family: sans-serif; background: #f5f5f5; }
  .page { padding: 40px; }
  .h { height: 20px; background: #ddd; border-radius: 4px; margin-bottom: 12px; }
  .h.short { width: 60%; }
  .h.medium { width: 80%; }
</style>
</head>
<body>
  <div class="page">
    <div class="h medium"></div>
    <div class="h short"></div>
    <div class="h"></div>
    <div class="h medium"></div>
    <div class="h short"></div>
  </div>
  <script>
    window.REPLIQ_CONFIG = {
      botId: '${botId}',
      botName: '${bot.botName}',
      welcomeMessage: '${(bot.welcomeMessage || '').replace(/'/g, "\\'\"").replace(/\"/g, "\\\"")}',
      color: '${bot.widgetColor}',
      apiUrl: '${appUrl}'
    };
  </script>
  <script src="${appUrl}/widget.js?id=${botId}"></script>
</body>
</html>`;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0]">
      <Toaster theme="dark" />
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#00F5A0] rounded-md flex items-center justify-center font-black text-[#0A0A0F] text-xs">R</div>
          <span className="font-black">REPLIQ</span>
          <span className="text-white/20">·</span>
          <span className="text-white/50 text-sm">{bot.businessName}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#00F5A0] rounded-full animate-pulse" />
          <span className="text-[#00F5A0] text-sm font-medium">{bot.botName} is Live</span>
        </div>
      </header>
      <div className="flex flex-col lg:flex-row gap-0 h-[calc(100vh-65px)]">
        <div className="flex-1 flex flex-col p-6 border-r border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm text-white/60 uppercase tracking-wider">Live Preview</h2>
            <div className="flex gap-2">
              <button onClick={() => setViewport('desktop')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${viewport === 'desktop' ? 'bg-[#00F5A0] text-[#0A0A0F] font-bold' : 'text-white/40 hover:bg-white/5'}`}>
                <Monitor size={12} /> Desktop
              </button>
              <button onClick={() => setViewport('mobile')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${viewport === 'mobile' ? 'bg-[#00F5A0] text-[#0A0A0F] font-bold' : 'text-white/40 hover:bg-white/5'}`}>
                <Smartphone size={12} /> Mobile
              </button>
            </div>
          </div>
          <div className={`flex-1 flex items-center justify-center ${viewport === 'mobile' ? 'py-8' : ''}`}>
            <div className={`bg-white rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${viewport === 'mobile' ? 'w-[390px] h-[700px]' : 'w-full h-full'}`}>
              <iframe srcDoc={iframeDoc} className="w-full h-full border-0" title="Bot preview" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96 overflow-y-auto p-6 space-y-6">
          <div className="bg-[#1A1A2E] rounded-xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={16} className="text-[#00F5A0]" />
              <h3 className="font-bold text-sm">Add to your website</h3>
            </div>
            <div className="bg-black/40 rounded-lg p-3 mb-3 font-mono text-xs text-[#00F5A0] break-all">
              {embedCode}
            </div>
            <button onClick={copyEmbed} className="w-full flex items-center justify-center gap-2 bg-[#00F5A0] text-[#0A0A0F] py-2.5 rounded-lg font-bold text-sm hover:bg-[#00F5A0]/90 transition-all">
              {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Embed Code</>}
            </button>
            <div className="mt-4 space-y-2">
              <p className="text-white/30 text-xs mb-2">Platform-specific guides:</p>
              {PLATFORMS.map(p => (
                <div key={p.name} className="border border-white/5 rounded-lg overflow-hidden">
                  <button onClick={() => setOpenPlatform(openPlatform === p.name ? null : p.name)} className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-white/5 transition-colors">
                    <span className="text-white/70">{p.name}</span>
                    <ChevronDown size={14} className={`text-white/30 transition-transform ${openPlatform === p.name ? 'rotate-180' : ''}`} />
                  </button>
                  {openPlatform === p.name && (
                    <div className="px-3 pb-3 text-xs text-white/40 leading-relaxed">{p.steps}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#1A1A2E] rounded-xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={16} className="text-[#00F5A0]" />
              <h3 className="font-bold text-sm">Your Bot Settings</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-white/60">Bot Name</span>
                <span className="font-medium">{bot.botName}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-white/60">Tone</span>
                <span className="font-medium">{bot.tone}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-white/60">Status</span>
                <span className="text-[#00F5A0] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#00F5A0] rounded-full" /> Active
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-white/60">Conversations</span>
                <span className="font-medium">{conversations.length}</span>
              </div>
              <div className="py-2">
                <span className="text-white/60 block mb-1">Widget Color</span>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: bot.widgetColor }} />
                  <span className="font-mono text-xs text-white/50">{bot.widgetColor}</span>
                </div>
              </div>
            </div>
            <a href="/onboarding" className="mt-4 w-full block text-center py-2 rounded-lg border border-white/10 text-white/40 hover:border-[#00F5A0]/50 hover:text-[#00F5A0] text-sm transition-colors">
              Edit Bot Info →
            </a>
          </div>
          <div className="bg-[#1A1A2E] rounded-xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={16} className="text-[#00F5A0]" />
              <h3 className="font-bold text-sm">Recent Conversations</h3>
            </div>
            {conversations.length === 0 ? (
              <p className="text-white/30 text-xs text-center py-4">No conversations yet. Share your bot to get started.</p>
            ) : (
              <div className="space-y-2">
                {conversations.map(conv => (
                  <div key={conv.id} className="p-3 bg-black/20 rounded-lg">
                    <p className="text-white/70 text-xs truncate">{conv.visitorMessage}</p>
                    <p className="text-white/30 text-xs mt-1">{new Date(conv.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0F]" />}>
      <DashboardContent />
    </Suspense>
  );
}
