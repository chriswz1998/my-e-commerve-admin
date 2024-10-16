import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import db from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId)
      return new NextResponse('categoryId id is required', { status: 400 })

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId
      }
    })

    return NextResponse.json(category)
  } catch (e) {
    console.log('[category_GTE]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name, billboardId } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!name) return new NextResponse('name is required', { status: 400 })

    if (!billboardId)
      return new NextResponse('billboardId is required', { status: 400 })

    if (!params.categoryId)
      return new NextResponse('categoryId id is required', { status: 400 })

    const storeByUserId = await prisma?.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const category = await db.category.updateMany({
      where: {
        id: params.categoryId
      },
      data: {
        name,
        billboardId
      }
    })

    return NextResponse.json(category)
  } catch (e) {
    console.log('[category_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!params.categoryId)
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

    const category = await db.category.delete({
      where: {
        id: params.categoryId
      }
    })

    return NextResponse.json(category)
  } catch (e) {
    console.log('[category_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
