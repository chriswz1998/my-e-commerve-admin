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

    const { name, value } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!name) return new NextResponse('name is required', { status: 400 })

    if (!value) return new NextResponse('value is required', { status: 400 })

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

    const color = await db.color.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    })

    return NextResponse.json(color)
  } catch (e) {
    console.log(`[colors_post]`, e)
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse('store Id is required', { status: 400 })

    const color = await db.color.findMany({
      where: {
        storeId: params.storeId
      }
    })

    return NextResponse.json(color)
  } catch (e) {
    console.log(`[colors_get]`, e)
  }
}
