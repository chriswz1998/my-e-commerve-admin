import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import db from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId)
      return new NextResponse('product id is required', { status: 400 })

    const product = await db.product.findUnique({
      where: {
        id: params.productId
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true
      }
    })

    return NextResponse.json(product)
  } catch (e) {
    console.log('[product_get]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
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

    if (!params.productId)
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

    await db.product.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isArchived,
        isFeatured,
        images: {
          deleteMany: {}
        }
      }
    })

    const product = await db.product.update({
      where: {
        id: params.productId
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)]
          }
        }
      }
    })

    return NextResponse.json(product)
  } catch (e) {
    console.log('[product_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!params.productId)
      return new NextResponse('product id is required', { status: 400 })

    const storeByUserId = await prisma?.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const product = await db.product.delete({
      where: {
        id: params.productId
      }
    })

    return NextResponse.json(product)
  } catch (e) {
    console.log('[product_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
