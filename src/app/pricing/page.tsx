'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 39,
    subtitle: '1 bot · 300 chats/month',
    description: 'Perfect for solo operators',
    popular: false,
    features: [
      '1 AI chatbot',
      '300 conversations/mo',
      'Embed on any website',
      'Lead capture built-in',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    subtitle: '3 bots · Unlimited chats',
    description: 'For growing businesses',
    popular: true,
    features: [
      '3 AI chatbots',
      'Unlimited conversations',
      'Conversation dashboard',
      'Priority support',
      'Custom bot personality',
    ],
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 199,
    subtitle: '10 bots · White label',
    description: 'For agencies & resellers',
    popular: false,
    features: [
      '10 AI chatbots',
      'White label branding',
      'Client sub-dashboards',
      'Resell to your clients',
      'Dedicated support',
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSelect(planId: string) {
    setLoading(planId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0] flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#00F5A0] rounded-md flex items-center justify-center font-black text-[#0A0A0F] text-sm">R</div>
          <span className="font-black text-xl tracking-tight">REPLIQ</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Recurring revenue.<br />
          <span className="text-[#00F5A0]">Every single month.</span>
        </h1>
        <p className="text-white/40 text-lg max-w-md mx-auto">
          Three simple tiers. Low churn. High lifetime value.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-8 border flex flex-col ${
              plan.popular
                ? 'bg-[#0D2B1F] border-[#00F5A0]/40'
                : 'bg-[#1A1A2E] border-white/5'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#00F5A0] text-[#0A0A0F] text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <p className="text-white/40 text-sm uppercase tracking-widest mb-2">{plan.name}</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-black">${plan.price}</span>
                <span className="text-white/40 mb-2">/mo</span>
              </div>
              <p className="text-white/40 text-sm">{plan.subtitle}</p>
              <p className="text-white/30 text-xs mt-1">{plan.description}</p>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <span className="text-[#00F5A0] font-bold">→</span>
                  <span className="text-white/70">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelect(plan.id)}
              disabled={loading !== null}
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                plan.popular
                  ? 'bg-[#00F5A0] text-[#0A0A0F] hover:bg-[#00F5A0]/90'
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading === plan.id ? 'Redirecting...' : 'Get Started →'}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-12 text-white/20 text-sm text-center">
        No contracts. Cancel anytime. Setup in 10 minutes.
      </p>

      <button
        onClick={() => router.push('/')}
        className="mt-6 text-white/30 hover:text-white/60 text-sm transition-colors"
      >
        ← Back to home
      </button>
    </div>
  );
}
