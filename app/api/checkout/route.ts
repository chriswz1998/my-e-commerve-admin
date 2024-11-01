import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-headers': 'Authorization, Content-Type'
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { liscensOrderId } = await req.json()

  if (!liscensOrderId)
    return new NextResponse('productId is required', { status: 400 })

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  line_items.push({
    quantity: 1,
    price_data: {
      currency: 'CAD',
      product_data: {
        name: '驾照翻译费用'
      },
      unit_amount: 0.5 * 100
    }
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    success_url: `${process.env.FRONTEND_STORE_URL}/immigrateTools/driveLicenseTranslate/${liscensOrderId}?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/immigrateTools/driveLicenseTranslate/${liscensOrderId}?cancel=1`,
    metadata: {
      orderId: liscensOrderId
    }
  })

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders
    }
  )
}
