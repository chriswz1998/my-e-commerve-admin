import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

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

    const order = await db.liscensOrder.create({
      data: {
        phone,
        wx,
        email,
        id1,
        id2,
        id3,
        id4,
        isPaid: false,
        statusId: '05ca0bfd-965b-11ef-8153-0242ac110002'
      }
    })

    return NextResponse.json(order)
  } catch (e) {
    console.log(`[order_post]`, e)
  }
}

export async function GET(req: Request) {
  try {
    const cases = await db.case.findMany()

    return NextResponse.json(cases)
  } catch (e) {
    console.log(`[case_get]`, e)
  }
}
