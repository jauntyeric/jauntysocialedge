import Stripe from 'stripe';

console.log('Secret key exists:', process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    console.error('Debug: Starting checkout with secret key:', process.env.STRIPE_SECRET_KEY ? 'Key exists' : 'No key found');
    const body = await req.json();
    console.error('Debug: Request body:', body);
    
    const sessionData = {
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: 14900,
          product_data: {
            name: 'Social Skills Analysis & Feedback',
          },
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    };

    console.error('Debug: Session data:', sessionData);
    const session = await stripe.checkout.sessions.create(sessionData);
    console.error('Debug: Session created:', session.id);

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Debug: Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}