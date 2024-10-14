import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import db from '@/lib/prismadb'

export async function GTE(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId)
      return new NextResponse('size id is required', { status: 400 })

    const size = await db.size.findUnique({
      where: {
        id: params.sizeId
      }
    })

    return NextResponse.json(size)
  } catch (e) {
    console.log('[sizeId_gte]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name, value } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!name) return new NextResponse('name is required', { status: 400 })

    if (!value)
      return new NextResponse('value url is required', { status: 400 })

    if (!params.sizeId)
      return new NextResponse('size id is required', { status: 400 })

    const storeByUserId = await prisma?.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const size = await db.size.updateMany({
      where: {
        id: params.sizeId
      },
      data: {
        name,
        value
      }
    })

    return NextResponse.json(size)
  } catch (e) {
    console.log('[size_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!params.sizeId)
      return new NextResponse('Store id is required', { status: 400 })

    const storeByUserId = await prisma?.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const size = await db.size.delete({
      where: {
        id: params.sizeId
      }
    })

    return NextResponse.json(size)
  } catch (e) {
    console.log('[size_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
