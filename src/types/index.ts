export type Industry =
  | 'Restaurant' | 'Real Estate' | 'Beauty/Spa' | 'Legal' | 'Medical'
  | 'Fitness' | 'Construction/Remodeling' | 'Accounting' | 'Retail' | 'Other';

export type BotTone = 'Friendly' | 'Professional' | 'Luxury' | 'Bold';

export type BotGoal =
  | 'Answer FAQs' | 'Capture Leads' | 'Book Appointments'
  | 'Qualify Clients' | 'Share Pricing' | 'All of the above';

export type ContactMethod = 'Phone' | 'WhatsApp' | 'Email' | 'Contact Form';

export interface OnboardingData {
  // Step 1
  businessName: string;
  industry: Industry | string;
  city: string;
  businessHours: string;
  // Step 2
  offer: string;
  idealCustomer: string;
  differentiator: string;
  promotions?: string;
  // Step 3
  goals: BotGoal[];
  topQuestions: string[];
  contactMethod: ContactMethod;
  phone?: string;
  email?: string;
  whatsapp?: string;
  // Step 4
  botName: string;
  tone: BotTone;
  widgetColor: string;
  welcomeMessage: string;
}

export interface BotConfig extends OnboardingData {
  id: string;
  systemPrompt: string;
  isActive: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  botId: string;
  visitorMessage: string;
  botReply: string;
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
