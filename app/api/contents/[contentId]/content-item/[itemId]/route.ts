import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    if (!params.itemId)
      return new NextResponse('contentItem id is required', { status: 400 })

    const contentItem = await db.contentItem.findUnique({
      where: {
        id: params.itemId
      }
    })

    return NextResponse.json(contentItem)
  } catch (e) {
    console.log('[contentItem_get]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { itemId: string; contentId: string } }
) {
  try {
    const body = await req.json()

    const { title_ch, title_en, detail, desc_ch, desc_en } = body

    if (!params.itemId)
      return new NextResponse('content id is required', { status: 400 })

    if (!params.contentId)
      return new NextResponse('content id is required', { status: 400 })

    if (!title_ch)
      return new NextResponse('title_ch is required', { status: 400 })

    if (!detail)
      return new NextResponse('Image Url is required', { status: 400 })

    if (!desc_ch)
      return new NextResponse('desc_ch is required', { status: 400 })

    const content = await db.contentItem.updateMany({
      where: {
        id: params.itemId
      },
      data: {
        title_ch,
        title_en,
        detail,
        desc_ch,
        desc_en,
        contentId: params.contentId
      }
    })

    return NextResponse.json(content)
  } catch (e) {
    console.log('[contentItem_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    if (!params.itemId)
      return new NextResponse('contentItem id is required', { status: 400 })

    const contentItem = await db.contentItem.delete({
      where: {
        id: params.itemId
      }
    })

    return NextResponse.json(contentItem)
  } catch (e) {
    console.log('[contentItem_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
