'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  const inp = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00F5A0] transition-colors text-sm';

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0] flex flex-col">
      <nav className="px-6 py-5">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-7 h-7 bg-[#00F5A0] rounded-md flex items-center justify-center font-black text-[#0A0A0F] text-xs">R</div>
          <span className="font-black">RepliQio</span>
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black mb-2">Welcome back</h1>
            <p className="text-[#F0F0F0]/50 text-sm">Sign in to manage your chatbots</p>
          </div>

          <form onSubmit={handleLogin} className="bg-[#1A1A2E] rounded-2xl border border-white/10 p-8 space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm text-white/60 mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@yourbusiness.com"
                required
                className={inp}
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={inp}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00F5A0] text-[#0A0A0F] py-3 rounded-xl font-black text-sm hover:bg-[#00F5A0]/90 disabled:opacity-70 transition-all"
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>

            <p className="text-center text-[#F0F0F0]/40 text-xs">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#00F5A0] hover:underline">
                Create one free
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
