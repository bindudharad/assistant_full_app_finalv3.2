import { NextResponse } from 'next/server'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-08-01' })

export async function POST(req) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature') || '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } else {
      event = JSON.parse(payload);
    }
  } catch (err) {
    return NextResponse.json({ error: 'Webhook error: ' + String(err) }, { status: 400 });
  }
  // handle event types as needed
  if (event.type === 'checkout.session.completed') {
    // TODO: grant subscription access to user
    console.log('Checkout completed', event.data.object);
  }
  return NextResponse.json({ received: true });
}
