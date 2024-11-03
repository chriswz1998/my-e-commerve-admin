import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    if (!params.messageId)
      return new NextResponse('message id is required', { status: 400 })

    const info = await db.snedInfo.findUnique({
      where: {
        id: params.messageId
      }
    })

    return NextResponse.json(info)
  } catch (e) {
    console.log('[sendInfo_get]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    const body = await req.json()
    const { common } = body

    if (!params.messageId)
      return new NextResponse('nav Id is required', { status: 400 })

    if (!common) return new NextResponse('common is required', { status: 400 })

    const info = await db.snedInfo.update({
      where: {
        id: params.messageId
      },
      data: {
        common
      }
    })

    return NextResponse.json(info)
  } catch (e) {
    console.log('[sendInfo_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    if (!params.messageId)
      return new NextResponse('message id is required', { status: 400 })

    const info = await db.snedInfo.delete({
      where: {
        id: params.messageId
      }
    })

    return NextResponse.json(info)
  } catch (e) {
    console.log('[info_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
