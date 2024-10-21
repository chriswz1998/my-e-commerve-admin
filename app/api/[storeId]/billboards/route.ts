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

    const { label, imageUrl } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!label) return new NextResponse('Label is required', { status: 400 })

    if (!imageUrl)
      return new NextResponse('Image Url is required', { status: 400 })

    if (!params.storeId)
      return new NextResponse('store Id is required', { status: 400 })

    const storeByUserId = await prisma?.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const billboard = await db.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId
      }
    })

    return NextResponse.json(billboard)
  } catch (e: any) {
    console.log(`[Billboards_post]`, e)
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    )
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse('store Id is required', { status: 400 })

    const billboard = await db.billboard.findMany({
      where: {
        storeId: params.storeId
      }
    })

    return NextResponse.json(billboard)
  } catch (e) {
    console.log(`[Billboards_get]`, e)
  }
}
