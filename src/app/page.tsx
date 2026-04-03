'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MessageSquare, Zap, Code2, Check, ArrowRight, Star } from 'lucide-react';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: { monthly: 39, annual: 32 },
    desc: '1 bot · 300 chats/month',
    sub: 'Perfect for solo operators',
    features: ['1 AI chatbot', '300 conversations/mo', 'Embed on any website', 'Lead capture built-in', 'Email support'],
    popular: false,
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 79, annual: 65 },
    desc: '3 bots · Unlimited chats',
    sub: 'For growing businesses',
    features: ['3 AI chatbots', 'Unlimited conversations', 'Conversation dashboard', 'Priority support', 'Custom bot personality'],
    popular: true,
    cta: 'Start Free Trial',
  },
  {
    id: 'agency',
    name: 'Agency',
    price: { monthly: 199, annual: 165 },
    desc: '10 bots · White label',
    sub: 'For agencies & resellers',
    features: ['10 AI chatbots', 'White label branding', 'Client sub-dashboards', 'Resell to your clients', 'Dedicated support'],
    popular: false,
    cta: 'Get Started',
  },
];

const INDUSTRIES = [
  { emoji: '🏠', name: 'Real Estate', use: 'Qualify buyers, book showings 24/7' },
  { emoji: '💅', name: 'Beauty & Spa', use: 'Handle bookings without lifting the phone' },
  { emoji: '🔨', name: 'Construction', use: 'Qualify leads, collect project details' },
  { emoji: '⚖️', name: 'Legal', use: 'Screen clients, schedule consultations' },
  { emoji: '🏋️', name: 'Fitness', use: 'Convert walk-ins into memberships' },
  { emoji: '🍽️', name: 'Restaurant', use: 'Answer FAQs, take reservations' },
];

export default function Landing() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0] font-sans">
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00F5A0] rounded-lg flex items-center justify-center font-black text-[#0A0A0F] text-sm">R</div>
          <span className="font-black text-xl tracking-tight">REPLIQ</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm text-[#F0F0F0]/60 hover:text-[#00F5A0] transition-colors">Pricing</a>
          <Link href="/pricing" className="bg-[#00F5A0] text-[#0A0A0F] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#00F5A0]/90 transition-colors">
            Create My Bot →
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-[#00F5A0]/10 border border-[#00F5A0]/20 rounded-full px-4 py-1.5 text-[#00F5A0] text-sm font-medium mb-8">
          <Zap size={14} fill="currentColor" />
          Live in 10 minutes. No code required.
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
          Your AI Employee.<br />
          <span className="text-[#00F5A0]">Zero Salary.</span><br />
          Always On.
        </h1>
        <p className="text-xl text-[#F0F0F0]/60 max-w-2xl mx-auto mb-10">
          Create a custom AI chatbot for your business in 10 minutes. No code. No tech team. Just answers — 24/7.
        </p>
        <Link href="/pricing" className="inline-flex items-center gap-2 bg-[#00F5A0] text-[#0A0A0F] px-8 py-4 rounded-xl text-lg font-black hover:bg-[#00F5A0]/90 transition-all hover:scale-105 active:scale-95">
          Create My Bot Free
          <ArrowRight size={20} />
        </Link>

        <div className="mt-16 relative max-w-2xl mx-auto">
          <div className="bg-[#1A1A2E] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0A0A0F] border-b border-white/10">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" /></div>
              <div className="flex-1 bg-white/5 rounded px-3 py-1 text-xs text-white/30 mx-4">mybusiness.com</div>
            </div>
            <div className="relative p-8 min-h-48 bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0F]">
              <div className="text-white/20 text-sm space-y-2">
                <div className="h-3 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
                <div className="h-3 bg-white/10 rounded w-2/3" />
              </div>
              <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
                <div className="bg-[#1A1A2E] border border-white/10 rounded-xl p-3 text-xs shadow-xl w-48">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-[#00F5A0] rounded-full flex items-center justify-center text-[#0A0A0F] font-black text-xs">S</div>
                    <span className="text-[#00F5A0] font-semibold">Sofia · AI Assistant</span>
                  </div>
                  <p className="text-white/70 text-xs">Hi! How can I help you today? 👋</p>
                </div>
                <div className="w-12 h-12 bg-[#00F5A0] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <MessageSquare size={20} className="text-[#0A0A0F]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-4">Up and running in 3 steps.</h2>
        <p className="text-[#F0F0F0]/50 text-center mb-12">No developers. No meetings. No waiting.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <MessageSquare className="text-[#00F5A0]" size={28} />, step: '01', title: 'Fill the form', desc: 'Tell us about your business, what you offer, and how you want the bot to behave.' },
            { icon: <Zap className="text-[#00F5A0]" size={28} />, step: '02', title: 'Bot gets trained', desc: 'Our AI instantly creates a custom chatbot that knows your business inside and out.' },
            { icon: <Code2 className="text-[#00F5A0]" size={28} />, step: '03', title: 'Paste 1 line of code', desc: 'Copy one script tag into your website. Works on WordPress, Wix, Shopify — anything.' },
          ].map(item => (
            <div key={item.step} className="bg-[#1A1A2E] rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                {item.icon}
                <span className="text-[#00F5A0]/40 font-black text-2xl">{item.step}</span>
              </div>
              <h3 className="font-black text-lg mb-2">{item.title}</h3>
              <p className="text-[#F0F0F0]/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-4">Built for the businesses everyone else <span className="text-[#00F5A0]">ignores.</span></h2>
        <p className="text-[#F0F0F0]/50 text-center mb-12">Local service businesses with 1–20 employees. They need results, not features.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map(ind => (
            <div key={ind.name} className="bg-[#1A1A2E] rounded-xl p-5 border border-white/5 hover:border-[#00F5A0]/20 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{ind.emoji}</span>
                <span className="font-bold">{ind.name}</span>
              </div>
              <p className="text-[#F0F0F0]/50 text-sm">{ind.use}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20" id="pricing">
        <h2 className="text-3xl font-black text-center mb-2">Recurring revenue. Every single month.</h2>
        <p className="text-[#F0F0F0]/50 text-center mb-8">Three simple tiers. Low churn. High lifetime value.</p>
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-white/40'}`}>Monthly</span>
          <button onClick={() => setAnnual(a => !a)} className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-[#00F5A0]' : 'bg-white/20'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${annual ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-white/40'}`}>Annual <span className="text-[#00F5A0]">2 months free</span></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(plan => (
            <div key={plan.name} className={`rounded-2xl p-6 border relative ${plan.popular ? 'border-[#00F5A0] bg-[#00F5A0]/5' : 'border-white/10 bg-[#1A1A2E]'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00F5A0] text-[#0A0A0F] text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={10} fill="currentColor" /> MOST POPULAR
                </div>
              )}
              <div className="mb-4">
                <p className="text-[#F0F0F0]/40 text-xs uppercase tracking-widest mb-1">{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black">${annual ? plan.price.annual : plan.price.monthly}</span>
                  <span className="text-[#F0F0F0]/40 mb-1">/mo</span>
                </div>
                <p className="text-[#F0F0F0]/50 text-xs mt-1">{plan.desc}</p>
                <p className="text-[#F0F0F0]/30 text-xs">{plan.sub}</p>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-[#00F5A0] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={`/pricing?plan=${plan.id}`} className={`w-full block text-center py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 ${plan.popular ? 'bg-[#00F5A0] text-[#0A0A0F]' : 'border border-white/20 hover:border-[#00F5A0] hover:text-[#00F5A0]'}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-[#00F5A0]/5 border border-[#00F5A0]/20 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: '10 Starter clients', value: '$1,180 MRR' },
            { label: '10 Starter + 10 Pro', value: '$2,370 MRR' },
            { label: 'Month 3 target', value: '$5,000+ MRR' },
            { label: 'Year 1 potential', value: '$60K+' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl font-black text-[#00F5A0]">{s.value}</div>
              <div className="text-[#F0F0F0]/40 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-black mb-4">Ready to hire your AI employee?</h2>
        <p className="text-[#F0F0F0]/50 mb-8">Zero salary. Zero sick days. Answers every question. 24/7.</p>
        <Link href="/pricing" className="inline-flex items-center gap-2 bg-[#00F5A0] text-[#0A0A0F] px-10 py-5 rounded-xl text-xl font-black hover:bg-[#00F5A0]/90 transition-all hover:scale-105 active:scale-95">
          Create My Bot Free →
        </Link>
      </section>

      <footer className="border-t border-white/5 px-6 py-8 text-center text-[#F0F0F0]/30 text-sm">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 bg-[#00F5A0] rounded-md flex items-center justify-center font-black text-[#0A0A0F] text-xs">R</div>
          <span className="font-black text-white">REPLIQ</span>
        </div>
        <p className="mb-1">© 2026 REPLIQ. All rights reserved.</p>
        <p><a href="mailto:hello@repliqio.com" className="hover:text-[#00F5A0] transition-colors">hello@repliqio.com</a></p>
      </footer>
    </div>
  );
}
