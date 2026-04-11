import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export type PlanId = 'starter' | 'pro' | 'agency';

export const PLANS: Record<PlanId, {
  name: string;
  priceId: string;
  priceIdAnnual: string;
  price: number;
  priceAnnual: number;
}> = {
  starter: {
    name: 'Starter',
    priceId: process.env.STRIPE_PRICE_STARTER!,
    priceIdAnnual: process.env.STRIPE_PRICE_STARTER_ANNUAL!,
    price: 39,
    priceAnnual: 390,
  },
  pro: {
    name: 'Pro',
    priceId: process.env.STRIPE_PRICE_PRO!,
    priceIdAnnual: process.env.STRIPE_PRICE_PRO_ANNUAL!,
    price: 79,
    priceAnnual: 790,
  },
  agency: {
    name: 'Agency',
    priceId: process.env.STRIPE_PRICE_AGENCY!,
    priceIdAnnual: process.env.STRIPE_PRICE_AGENCY_ANNUAL!,
    price: 199,
    priceAnnual: 1990,
  },
};
