import { NextRequest, NextResponse } from 'next/server';
import { stripe, PLANS, PlanId } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { plan, email, annual } = await req.json();
    const planKey = plan?.toLowerCase() as PlanId;

    if (!planKey || !(planKey in PLANS)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const planData = PLANS[planKey];
    const priceId = annual ? planData.priceIdAnnual : planData.priceId;

    if (!priceId) {
      return NextResponse.json({ error: 'Price not configured' }, { status: 500 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email || undefined,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${planKey}`,
      cancel_url: `${appUrl}/#pricing`,
      metadata: { plan: planKey, billing: annual ? 'annual' : 'monthly' },
      subscription_data: { metadata: { plan: planKey, billing: annual ? 'annual' : 'monthly' } },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
