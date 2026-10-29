import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-08-01' })

export async function POST(req) {
  try {
    const body = await req.json();
    const priceId = body.priceId || process.env.STRIPE_PRICE_ID;
    if (!priceId) return NextResponse.json({ error: 'priceId required' }, { status: 400 });
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: body.successUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?success=1`,
      cancel_url: body.cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?canceled=1`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
