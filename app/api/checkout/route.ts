import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'
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
  const { productIds } = await req.json()
  console.log('-----------------------------------------')
  console.log(productIds)
  console.log('-----------------------------------------')
  if (!productIds || productIds.length === 0)
    return new NextResponse('productId is required', { status: 400 })

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  })

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'CAD',
        product_data: {
          name: product.name
        },
        unit_amount: product.price.toNumber() * 100
      }
    })
  })

  const order = await db.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      phone: 'test',
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?cancel=1`,
    metadata: {
      orderId: order.id
    }
  })

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders
    }
  )
}
