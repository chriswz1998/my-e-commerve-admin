import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    if (!params.orderId)
      return new NextResponse('order id is required', { status: 400 })

    const order = await db.liscensOrder.findUnique({
      where: {
        id: params.orderId
      }
    })

    return NextResponse.json(order)
  } catch (e) {
    console.log('[order_get]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const body = await req.json()

    const { statusId } = body

    if (!params.orderId)
      return new NextResponse('content id is required', { status: 400 })

    if (!statusId)
      return new NextResponse('status Id is required', { status: 400 })

    const order = await db.liscensOrder.updateMany({
      where: {
        id: params.orderId
      },
      data: {
        statusId
      }
    })

    return NextResponse.json(order)
  } catch (e) {
    console.log('[order_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    if (!params.orderId)
      return new NextResponse('orderId id is required', { status: 400 })

    const cases = await db.liscensOrder.delete({
      where: {
        id: params.orderId
      }
    })

    return NextResponse.json(cases)
  } catch (e) {
    console.log('[orderId_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
