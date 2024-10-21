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

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived
    } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!name) return new NextResponse('name is required', { status: 400 })

    if (!price) return new NextResponse('price is required', { status: 400 })
    if (!categoryId)
      return new NextResponse('category is required', { status: 400 })

    if (!colorId) return new NextResponse('color is required', { status: 400 })

    if (!sizeId) return new NextResponse('size is required', { status: 400 })

    if (!images || !images.length)
      return new NextResponse('image is required', { status: 400 })

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

    const product = await db.product.create({
      data: {
        name,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)]
          }
        },
        sizeId,
        categoryId,
        colorId,
        price,
        isArchived,
        isFeatured,
        storeId: params.storeId
      }
    })

    return NextResponse.json(product)
  } catch (e) {
    console.log(`[products_post]`, e)
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined
    const colorId = searchParams.get('colorId') || undefined
    const sizeId = searchParams.get('sizeId') || undefined
    const isFeatured = searchParams.get('isFeatured')

    if (!params.storeId)
      return new NextResponse('store Id is required', { status: 400 })

    const products = await db.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        sizeId
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true
      },
      orderBy: {
        createAt: 'desc'
      }
    })

    return NextResponse.json(products)
  } catch (e) {
    console.log(`[products_get]`, e)
  }
}
