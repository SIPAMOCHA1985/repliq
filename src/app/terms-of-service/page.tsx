import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — RepliQio',
  description: 'Terms and conditions for using RepliQio.',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl font-black mb-4 text-[#00F5A0]">{title}</h2>
    <div className="text-[#F0F0F0]/70 space-y-3 text-sm leading-relaxed">{children}</div>
  </div>
);

export default function TermsOfService() {
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
          <h1 className="text-4xl font-black mb-3">Terms of Service</h1>
          <p className="text-[#F0F0F0]/40 text-sm">Effective Date: April 5, 2026</p>
        </div>

        <Section title="1. Acceptance of Terms">
          <p>By accessing or using RepliQio ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service.</p>
          <p>These Terms constitute a legally binding agreement between you and <strong className="text-white">SkillBridgeAI LLC</strong>, a company registered in Orange County, Florida.</p>
        </Section>

        <Section title="2. Description of Service">
          <p>RepliQio is a Software-as-a-Service (SaaS) platform that enables local businesses to create, configure, and deploy AI-powered chatbots on their websites. The chatbots are powered by the Anthropic Claude API and are designed to answer customer questions, capture leads, and facilitate bookings.</p>
        </Section>

        <Section title="3. User Responsibilities">
          <p>By using RepliQio, you agree to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide accurate and truthful business information when setting up your chatbot</li>
            <li>Not use the Service for any illegal, fraudulent, or harmful purpose</li>
            <li>Not create chatbots that impersonate other people or businesses</li>
            <li>Not use the Service to send spam or unsolicited communications</li>
            <li>Not attempt to reverse-engineer, hack, or interfere with the Service</li>
            <li>Comply with all applicable laws and regulations in your jurisdiction</li>
          </ul>
        </Section>

        <Section title="4. Subscription and Billing">
          <p>RepliQio offers the following subscription plans:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white">Starter:</strong> $39/month — 1 chatbot, 300 conversations/month</li>
            <li><strong className="text-white">Pro:</strong> $79/month — 3 chatbots, unlimited conversations</li>
            <li><strong className="text-white">Agency:</strong> $199/month — 10 chatbots, white-label branding</li>
          </ul>
          <p>Annual plans are available at a discounted rate. All prices are in USD and billed in advance. Payments are processed securely by Stripe.</p>
          <p>By subscribing, you authorize RepliQio to charge your payment method on a recurring basis until you cancel.</p>
        </Section>

        <Section title="5. Cancellation and Refund Policy">
          <p><strong className="text-white">Cancellation:</strong> You may cancel your subscription at any time through your account settings or by contacting support. Cancellation takes effect at the end of your current billing period — you retain access to the Service until then.</p>
          <p><strong className="text-white">Refunds:</strong> We do not provide refunds for partial months of service. If you cancel mid-cycle, you will continue to have access through the end of the paid period. No prorated refunds are issued.</p>
          <p><strong className="text-white">Exceptions:</strong> Refund requests for technical failures that prevented service access will be evaluated on a case-by-case basis.</p>
        </Section>

        <Section title="6. AI-Generated Content Disclaimer">
          <p>RepliQio uses the Anthropic Claude API to generate chatbot responses. By using the Service, you acknowledge:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>AI responses are generated automatically and may not always be accurate</li>
            <li>You are responsible for reviewing and configuring your bot's behavior appropriately</li>
            <li>RepliQio is not liable for inaccurate or inappropriate AI-generated responses</li>
            <li>You should not rely on AI chatbot responses for medical, legal, financial, or safety-critical advice</li>
          </ul>
        </Section>

        <Section title="7. Intellectual Property">
          <p>You retain ownership of all business information and content you provide to configure your chatbot. RepliQio retains ownership of the platform, codebase, and underlying technology.</p>
          <p>By using the Service, you grant RepliQio a limited license to process your content solely for the purpose of providing the Service.</p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>To the maximum extent permitted by applicable law, SkillBridgeAI LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of the Service.</p>
          <p>Our total liability to you for any claim shall not exceed the amount you paid to us in the 3 months prior to the claim.</p>
        </Section>

        <Section title="9. Service Availability">
          <p>We strive for high availability but do not guarantee uninterrupted service. We may perform maintenance, updates, or experience technical issues that temporarily affect access. RepliQio is not liable for downtime or service interruptions.</p>
        </Section>

        <Section title="10. Termination">
          <p>We reserve the right to suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or use the Service in a way that harms other users or the platform. You may also terminate your account at any time.</p>
        </Section>

        <Section title="11. Governing Law">
          <p>These Terms are governed by the laws of the <strong className="text-white">State of Florida</strong>, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Orange County, Florida.</p>
        </Section>

        <Section title="12. Changes to Terms">
          <p>We may update these Terms from time to time. We will notify you of material changes via email or a notice on the Service. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
        </Section>

        <Section title="13. Contact">
          <p>For questions about these Terms, contact us at: <a href="mailto:support@repliqio.com" className="text-[#00F5A0] hover:underline">support@repliqio.com</a></p>
          <p>SkillBridgeAI LLC · Orange County, Florida, United States</p>
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
