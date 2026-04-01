'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const MESSAGES = [
  'Analyzing your business...',
  'Training your AI assistant...',
  'Writing response templates...',
  'Configuring lead capture...',
  'Almost ready...',
  'Your bot is live! 🎉',
];

function GeneratingContent() {
  const router = useRouter();
  const params = useSearchParams();
  const botId = params.get('botId');
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => setIdx(i => Math.min(i + 1, MESSAGES.length - 1)), 1500);
    const progInterval = setInterval(() => setProgress(p => Math.min(p + 2, 100)), 120);

    const redirect = setTimeout(() => {
      if (botId) router.push(`/dashboard?botId=${botId}`);
    }, 6000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
      clearTimeout(redirect);
    };
  }, [botId, router]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center gap-10 px-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-4 border-[#00F5A0]/20 border-t-[#00F5A0] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#00F5A0]/10 flex items-center justify-center font-black text-[#00F5A0] text-2xl animate-pulse">R</div>
        </div>
      </div>
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black text-white">Building your AI employee...</h2>
        <p className="text-[#00F5A0] text-lg font-medium transition-all duration-500">{MESSAGES[idx]}</p>
      </div>
      <div className="w-80 space-y-2">
        <div className="w-full bg-white/10 rounded-full h-2">
          <div className="bg-[#00F5A0] h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-white/30 text-sm text-center">{progress}%</p>
      </div>
      <p className="text-white/20 text-sm">This takes about 5 seconds...</p>
    </div>
  );
}

export default function Generating() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0F]" />}>
      <GeneratingContent />
    </Suspense>
  );
}
