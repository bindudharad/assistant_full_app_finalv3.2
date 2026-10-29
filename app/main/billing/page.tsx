'use client'
import React from 'react'
export default function Billing() {
  const startCheckout = async () => {
    const r = await fetch('/api/stripe/create-checkout-session', {method:'POST'});
    const j = await r.json();
    if (j.url) window.location.href = j.url;
    else alert('Error creating session');
  }
  return (
    <div style={{padding:20}}>
      <h2>Billing</h2>
      <p>This is a placeholder billing page. Connect Stripe keys and implement server routes.</p>
      <button onClick={startCheckout}>Subscribe (placeholder)</button>
    </div>
  )
}
