import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import db from '@/lib/prismadb'

export async function GTE(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId)
      return new NextResponse('color id is required', { status: 400 })

    const color = await db.color.findUnique({
      where: {
        id: params.colorId
      }
    })

    return NextResponse.json(color)
  } catch (e) {
    console.log('[color_get]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name, value } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!name) return new NextResponse('name is required', { status: 400 })

    if (!value)
      return new NextResponse('value url is required', { status: 400 })

    if (!params.colorId)
      return new NextResponse('color id is required', { status: 400 })

    const storeByUserId = await prisma?.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const color = await db.color.updateMany({
      where: {
        id: params.colorId
      },
      data: {
        name,
        value
      }
    })

    return NextResponse.json(color)
  } catch (e) {
    console.log('[size_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!params.colorId)
      return new NextResponse('color id is required', { status: 400 })

    const storeByUserId = await prisma?.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const color = await db.color.delete({
      where: {
        id: params.colorId
      }
    })

    return NextResponse.json(color)
  } catch (e) {
    console.log('[color_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
