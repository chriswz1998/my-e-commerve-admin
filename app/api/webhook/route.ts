import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import db from '@/lib/prismadb'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    return new Response(`Error with webhook: ${error}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const address = session?.customer_details?.address

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country
  ]

  const addressString = addressComponents.filter(Boolean).join(', ')

  if (event.type === 'checkout.session.completed') {
    await db.liscensOrder.update({
      where: {
        id: session?.metadata?.orderId
      },
      data: {
        address: addressString
      }
    })
  }

  return new Response(null, { status: 200 })
}
