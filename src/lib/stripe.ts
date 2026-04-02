import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
});

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 39,
    priceId: process.env.STRIPE_PRICE_STARTER!,
    bots: 1,
    conversations: 300,
    features: [
      '1 AI chatbot',
      '300 conversations/mo',
      'Embed on any website',
      'Lead capture built-in',
      'Email support',
    ],
  },
  pro: {
    name: 'Pro',
    price: 79,
    priceId: process.env.STRIPE_PRICE_PRO!,
    bots: 3,
    conversations: -1,
    features: [
      '3 AI chatbots',
      'Unlimited conversations',
      'Conversation dashboard',
      'Priority support',
      'Custom bot personality',
    ],
  },
  agency: {
    name: 'Agency',
    price: 199,
    priceId: process.env.STRIPE_PRICE_AGENCY!,
    bots: 10,
    conversations: -1,
    features: [
      '10 AI chatbots',
      'White label branding',
      'Client sub-dashboards',
      'Resell to your clients',
      'Dedicated support',
    ],
  },
} as const;

export type PlanId = keyof typeof PLANS;
