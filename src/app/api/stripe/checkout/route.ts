import { NextRequest, NextResponse } from 'next/server';
import { stripe, PLANS, PlanId } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = await req.json();

    if (!plan || !(plan in PLANS)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://repliq-kohl.vercel.app';
    const priceId = PLANS[plan as PlanId].priceId;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/onboarding?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${appUrl}/pricing`,
      metadata: { plan },
      subscription_data: {
        metadata: { plan },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
