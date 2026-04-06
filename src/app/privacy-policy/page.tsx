import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — RepliQio',
  description: 'How RepliQio collects, uses, and protects your data.',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl font-black mb-4 text-[#00F5A0]">{title}</h2>
    <div className="text-[#F0F0F0]/70 space-y-3 text-sm leading-relaxed">{children}</div>
  </div>
);

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0]">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0A0A0F]/90 border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#00F5A0] rounded-md flex items-center justify-center font-black text-[#0A0A0F] text-xs">R</div>
            <span className="font-black">RepliQio</span>
          </Link>
          <Link href="/" className="text-sm text-[#F0F0F0]/50 hover:text-[#00F5A0] transition-colors">← Back to Home</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-3">Privacy Policy</h1>
          <p className="text-[#F0F0F0]/40 text-sm">Effective Date: April 5, 2026</p>
        </div>

        <Section title="1. Company Information">
          <p>RepliQio is operated by <strong className="text-white">SkillBridgeAI LLC</strong>, a company registered in Orange County, Florida, United States.</p>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@repliqio.com" className="text-[#00F5A0] hover:underline">support@repliqio.com</a>.</p>
        </Section>

        <Section title="2. Data We Collect">
          <p>When you use RepliQio, we may collect the following information:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white">Account information:</strong> Name, email address, and password when you create an account.</li>
            <li><strong className="text-white">Business information:</strong> Business name, industry, city, services, and other details you provide during bot setup.</li>
            <li><strong className="text-white">Chat logs:</strong> Conversations between your AI chatbot and your website visitors.</li>
            <li><strong className="text-white">Payment information:</strong> Billing details processed securely by Stripe. We do not store card numbers.</li>
            <li><strong className="text-white">Usage data:</strong> Pages visited, features used, and browser/device information for product improvement.</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Data">
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Create and operate your AI chatbot service</li>
            <li>Process payments and manage your subscription</li>
            <li>Send transactional emails (receipts, password resets)</li>
            <li>Improve and develop our product</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>We do <strong className="text-white">not</strong> sell your data to third parties.</p>
        </Section>

        <Section title="4. Third-Party Services">
          <p>RepliQio integrates with the following third-party services:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white">Stripe</strong> — Payment processing. Subject to <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00F5A0] hover:underline">Stripe's Privacy Policy</a>.</li>
            <li><strong className="text-white">Supabase</strong> — Database and authentication infrastructure.</li>
            <li><strong className="text-white">Anthropic Claude API</strong> — Powers the AI chatbot responses. Business data you provide is sent to Claude for processing.</li>
            <li><strong className="text-white">Vercel</strong> — Hosting and deployment infrastructure.</li>
          </ul>
        </Section>

        <Section title="5. Data Retention">
          <p>We retain your data for as long as your subscription is active. Upon account deletion or subscription cancellation:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your bot configurations and business data will be deleted within 30 days.</li>
            <li>Chat logs will be deleted within 30 days.</li>
            <li>Billing records may be retained for up to 7 years as required by law.</li>
          </ul>
        </Section>

        <Section title="6. Your Rights">
          <p>Depending on your location, you may have the following rights:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white">Access:</strong> Request a copy of the data we hold about you.</li>
            <li><strong className="text-white">Correction:</strong> Request correction of inaccurate data.</li>
            <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data.</li>
            <li><strong className="text-white">Portability:</strong> Request your data in a portable format.</li>
            <li><strong className="text-white">Opt-out:</strong> Opt out of any marketing communications at any time.</li>
          </ul>
          <p>To exercise any of these rights, email us at <a href="mailto:support@repliqio.com" className="text-[#00F5A0] hover:underline">support@repliqio.com</a>.</p>
        </Section>

        <Section title="7. GDPR & CCPA Compliance">
          <p><strong className="text-white">For EU/EEA residents (GDPR):</strong> We process your data based on legitimate interest and contractual necessity. You have the right to lodge a complaint with your local supervisory authority.</p>
          <p><strong className="text-white">For California residents (CCPA):</strong> We do not sell personal information. You have the right to know, delete, and opt out of the sale of personal information. To exercise your rights, contact us at the email above.</p>
        </Section>

        <Section title="8. Cookies">
          <p>We use essential cookies to maintain your session and preferences. We do not use third-party advertising cookies. You can disable cookies in your browser settings, though this may affect functionality.</p>
        </Section>

        <Section title="9. Security">
          <p>We implement industry-standard security measures including HTTPS encryption, secure password hashing, and access controls. No method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>We may update this Privacy Policy periodically. We will notify you of significant changes via email or a prominent notice on our website. Continued use of RepliQio after changes constitutes acceptance of the updated policy.</p>
        </Section>

        <div className="border-t border-white/10 pt-8 mt-8">
          <p className="text-[#F0F0F0]/30 text-xs">
            RepliQio / SkillBridgeAI LLC · Orange County, Florida · <a href="mailto:support@repliqio.com" className="text-[#00F5A0]/50 hover:text-[#00F5A0]">support@repliqio.com</a>
          </p>
        </div>
      </main>

      <footer className="border-t border-white/5 px-6 py-6 text-center text-[#F0F0F0]/30 text-xs">
        <div className="flex items-center justify-center gap-4">
          <Link href="/privacy-policy" className="hover:text-[#00F5A0] transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-[#00F5A0] transition-colors">Terms of Service</Link>
          <a href="mailto:support@repliqio.com" className="hover:text-[#00F5A0] transition-colors">Contact</a>
        </div>
        <p className="mt-3">© 2026 RepliQio / SkillBridgeAI LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}
