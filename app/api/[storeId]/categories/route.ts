import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name, billboardId } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!name) return new NextResponse('name is required', { status: 400 })

    if (!billboardId)
      return new NextResponse('billboardId is required', { status: 400 })

    if (!params.storeId)
      return new NextResponse('store Id is required', { status: 400 })

    const storeByUserId = await db?.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const category = await db.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId
      }
    })

    return NextResponse.json(category)
  } catch (e) {
    console.log(`[category_post]`, e)
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse('store Id is required', { status: 400 })

    const categories = await db.category.findMany({
      where: {
        storeId: params.storeId
      }
    })

    return NextResponse.json(categories)
  } catch (e) {
    console.log(`[categories_get]`, e)
  }
}
