import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Successful — RepliQio',
};

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0] flex flex-col items-center justify-center px-6">
      <div className="w-16 h-16 bg-[#00F5A0] rounded-full flex items-center justify-center mb-8">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0A0A0F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="text-4xl font-black mb-3 text-center">You're all set!</h1>
      <p className="text-[#F0F0F0]/50 text-center max-w-md mb-10">
        Payment confirmed. Your subscription is now active. Head to your dashboard and your bot will be ready to deploy.
      </p>
      <Link
        href="/dashboard"
        className="bg-[#00F5A0] text-[#0A0A0F] px-8 py-4 rounded-xl font-black text-lg hover:bg-[#00F5A0]/90 transition-all hover:scale-105"
      >
        Go to Dashboard →
      </Link>
    </div>
  );
}
