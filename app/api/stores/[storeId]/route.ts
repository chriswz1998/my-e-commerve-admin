import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import db from '@/lib/prismadb'

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!name) return new NextResponse('Name is required', { status: 400 })

    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 })

    const store = await db.store.updateMany({
      where: {
        id: params.storeId,
        userId
      },
      data: {
        name
      }
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log('[store_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 })

    const store = await db.store.delete({
      where: {
        id: params.storeId,
        userId
      }
    })

    return NextResponse.json(store)
  } catch (e) {
    console.log('[store_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
