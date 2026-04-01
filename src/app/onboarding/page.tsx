'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingData, BotGoal, BotTone, ContactMethod } from '@/types';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const INDUSTRIES = ['Restaurant','Real Estate','Beauty/Spa','Legal','Medical','Fitness','Construction/Remodeling','Accounting','Retail','Other'];
const GOALS: BotGoal[] = ['Answer FAQs','Capture Leads','Book Appointments','Qualify Clients','Share Pricing','All of the above'];
const TONES: BotTone[] = ['Friendly','Professional','Luxury','Bold'];
const CONTACTS: ContactMethod[] = ['Phone','WhatsApp','Email','Contact Form'];
const COLORS = ['#00F5A0','#6366F1','#F472B6','#FB923C','#38BDF8','#A78BFA'];

const DEFAULT: OnboardingData = {
  businessName: '', industry: '', city: '', businessHours: '',
  offer: '', idealCustomer: '', differentiator: '', promotions: '',
  goals: [], topQuestions: ['','','','',''],
  contactMethod: 'Phone', phone: '', email: '', whatsapp: '',
  botName: '', tone: 'Friendly', widgetColor: '#00F5A0', welcomeMessage: '',
};

const STEPS = ['Business Info', 'What You Do', 'Bot Behavior', 'Bot Personality'];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(DEFAULT);
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) =>
    setData(prev => ({ ...prev, [key]: value }));

  const toggleGoal = (goal: BotGoal) => {
    const current = data.goals;
    set('goals', current.includes(goal) ? current.filter(g => g !== goal) : [...current, goal]);
  };

  const setQuestion = (i: number, val: string) => {
    const q = [...data.topQuestions];
    q[i] = val;
    set('topQuestions', q);
  };

  const handleNext = () => {
    if (step === 3) {
      handleSubmit();
    } else {
      setStep(s => s + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const welcome = data.welcomeMessage || `Hi! I'm ${data.botName || 'your AI assistant'} from ${data.businessName}. How can I help you today? 👋`;
    const payload = { ...data, welcomeMessage: welcome };

    try {
      const res = await fetch('/api/create-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const { botId, error } = await res.json();
      if (error) throw new Error(error);
      router.push(`/generating?botId=${botId}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const inp = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00F5A0] transition-colors';

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0] flex flex-col">
      <div className="px-6 py-5 flex items-center gap-2">
        <div className="w-7 h-7 bg-[#00F5A0] rounded-md flex items-center justify-center font-black text-[#0A0A0F] text-xs">R</div>
        <span className="font-black text-lg">REPLIQ</span>
      </div>
      <div className="px-6 mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step ? 'bg-[#00F5A0] text-[#0A0A0F]' :
                  i === step ? 'bg-[#00F5A0]/20 border-2 border-[#00F5A0] text-[#00F5A0]' :
                  'bg-white/10 text-white/30'
                }`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === step ? 'text-[#00F5A0]' : 'text-white/30'}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`h-px w-8 sm:w-16 ml-2 ${i < step ? 'bg-[#00F5A0]' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 px-6 pb-12">
        <div className="max-w-2xl mx-auto bg-[#1A1A2E] rounded-2xl border border-white/10 p-8">
          <h2 className="text-2xl font-black mb-1">{STEPS[step]}</h2>
          <p className="text-white/40 text-sm mb-8">Step {step + 1} of {STEPS.length}</p>
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Business Name *</label>
                <input value={data.businessName} onChange={e => set('businessName', e.target.value)} placeholder="e.g. Sunrise Realty Group" className={inp} />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Industry *</label>
                <select value={data.industry} onChange={e => set('industry', e.target.value)} className={inp + ' cursor-pointer'}>
                  <option value="" className="bg-[#1A1A2E]">Select industry...</option>
                  {INDUSTRIES.map(i => <option key={i} value={i} className="bg-[#1A1A2E]">{i}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">City / Service Area *</label>
                <input value={data.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Orlando, FL" className={inp} />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Business Hours</label>
                <input value={data.businessHours} onChange={e => set('businessHours', e.target.value)} placeholder="e.g. Mon–Fri 9am–6pm, Sat 10am–4pm" className={inp} />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">What do you sell or offer? *</label>
                <textarea value={data.offer} onChange={e => set('offer', e.target.value)} placeholder="Describe your main services or products..." rows={3} className={inp + ' resize-none'} />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Who is your ideal customer? *</label>
                <input value={data.idealCustomer} onChange={e => set('idealCustomer', e.target.value)} placeholder="e.g. First-time homebuyers in Orlando" className={inp} />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">What makes you different from competitors? *</label>
                <textarea value={data.differentiator} onChange={e => set('differentiator', e.target.value)} placeholder="Your unique value proposition..." rows={3} className={inp + ' resize-none'} />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Active promotions or offers? <span className="text-white/30">(optional)</span></label>
                <textarea value={data.promotions} onChange={e => set('promotions', e.target.value)} placeholder="e.g. Free consultation in April..." rows={2} className={inp + ' resize-none'} />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm text-white/60 mb-3 block">What should the bot do? *</label>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map(g => (
                    <button key={g} type="button" onClick={() => toggleGoal(g)} className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${data.goals.includes(g) ? 'bg-[#00F5A0] text-[#0A0A0F] border-[#00F5A0]' : 'bg-white/5 border-white/10 hover:border-[#00F5A0]/50'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-white/60 mb-3 block">Top 5 questions customers ask you</label>
                <div className="space-y-3">
                  {data.topQuestions.map((q, i) => (
                    <input key={i} value={q} onChange={e => setQuestion(i, e.target.value)} placeholder={`Q${i + 1}: e.g. What are your prices?`} className={inp} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-white/60 mb-3 block">Preferred contact method</label>
                <div className="flex flex-wrap gap-2">
                  {CONTACTS.map(c => (
                    <button key={c} type="button" onClick={() => set('contactMethod', c)} className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${data.contactMethod === c ? 'bg-[#00F5A0] text-[#0A0A0F] border-[#00F5A0]' : 'bg-white/5 border-white/10 hover:border-[#00F5A0]/50'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input value={data.phone} onChange={e => set('phone', e.target.value)} placeholder="Phone" className={inp} />
                <input value={data.email} onChange={e => set('email', e.target.value)} placeholder="Email" className={inp} />
                <input value={data.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="WhatsApp" className={inp} />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Bot Name *</label>
                <input value={data.botName} onChange={e => set('botName', e.target.value)} placeholder='e.g. Sofia, Max, Alex' className={inp} />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-3 block">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {TONES.map(t => (
                    <button key={t} type="button" onClick={() => set('tone', t)} className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${data.tone === t ? 'bg-[#00F5A0] text-[#0A0A0F] border-[#00F5A0]' : 'bg-white/5 border-white/10 hover:border-[#00F5A0]/50'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-white/60 mb-3 block">Widget Color</label>
                <div className="flex items-center gap-3 flex-wrap">
                  {COLORS.map(c => (
                    <button key={c} type="button" onClick={() => set('widgetColor', c)} className={`w-8 h-8 rounded-full border-2 transition-transform ${data.widgetColor === c ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`} style={{ backgroundColor: c }} />
                  ))}
                  <input type="color" value={data.widgetColor} onChange={e => set('widgetColor', e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
                  <input value={data.widgetColor} onChange={e => set('widgetColor', e.target.value)} placeholder="#00F5A0" className="w-28 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00F5A0]" />
                </div>
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Welcome Message</label>
                <textarea
                  value={data.welcomeMessage}
                  onChange={e => set('welcomeMessage', e.target.value)}
                  placeholder={`Hi! I'm ${data.botName || 'your AI assistant'} from ${data.businessName || 'us'}. How can I help you today? 👋`}
                  rows={2}
                  className={inp + ' resize-none'}
                />
              </div>
            </div>
          )}
          <div className="flex justify-between mt-10">
            <button onClick={() => setStep(s => s - 1)} disabled={step === 0} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/30 disabled:opacity-0 transition-all">
              <ArrowLeft size={16} /> Back
            </button>
            <button onClick={handleNext} disabled={loading} className="flex items-center gap-2 bg-[#00F5A0] text-[#0A0A0F] px-6 py-3 rounded-xl font-bold hover:bg-[#00F5A0]/90 disabled:opacity-70 transition-all">
              {loading ? 'Creating...' : step === 3 ? 'Train My Bot →' : <>Next <ArrowRight size={16} /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
