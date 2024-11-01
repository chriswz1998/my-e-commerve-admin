import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-headers': 'Authorization, Content-Type'
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { phone, wx, email, id1, id2, id3, id4 } = body

    if (!id1) return new NextResponse('id is required', { status: 400 })
    if (!id2) return new NextResponse('id is required', { status: 400 })
    if (!id3) return new NextResponse('id is required', { status: 400 })
    if (!id4) return new NextResponse('id is required', { status: 400 })
    if (!phone) return new NextResponse('phone is required', { status: 400 })
    if (!wx) return new NextResponse('wx is required', { status: 400 })
    if (!email) return new NextResponse('email is required', { status: 400 })

    const status = await db.status.findMany({
      where: {
        name: 'Waiting for payment'
      }
    })

    console.log(`[status]`, status)

    const order = await db.liscensOrder.create({
      data: {
        phone,
        wx,
        email,
        pic_1: id1,
        pic_2: id2,
        pic_3: id3,
        pic_4: id4,
        price: 0.5,
        isPaid: false,
        statusId: status[0].id,
        address: ''
      }
    })

    return NextResponse.json(order)
  } catch (e) {
    console.log(`[order_post]`, e)
  }
}

export async function GET(req: Request) {
  try {
    const cases = await db.liscensOrder.findMany()

    return NextResponse.json(cases)
  } catch (e) {
    console.log(`[case_get]`, e)
  }
}
