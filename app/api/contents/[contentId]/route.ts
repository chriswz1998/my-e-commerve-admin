import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { contentId: string } }
) {
  try {
    if (!params.contentId)
      return new NextResponse('content id is required', { status: 400 })

    const content = await db.content.findUnique({
      where: {
        id: params.contentId
      }
    })

    return NextResponse.json(content)
  } catch (e) {
    console.log('[content_get]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { contentId: string } }
) {
  try {
    const body = await req.json()

    const { title_ch, title_en, image_url, desc_ch, desc_en } = body

    if (!params.contentId)
      return new NextResponse('content id is required', { status: 400 })

    if (!title_ch)
      return new NextResponse('title_ch is required', { status: 400 })

    if (!image_url)
      return new NextResponse('Image Url is required', { status: 400 })

    if (!desc_ch)
      return new NextResponse('desc_ch is required', { status: 400 })

    const content = await db.content.updateMany({
      where: {
        id: params.contentId
      },
      data: {
        title_ch,
        title_en,
        image_url,
        desc_ch,
        desc_en
      }
    })

    return NextResponse.json(content)
  } catch (e) {
    console.log('[content_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { contentId: string } }
) {
  try {
    if (!params.contentId)
      return new NextResponse('content id is required', { status: 400 })

    const content = await db.content.delete({
      where: {
        id: params.contentId
      }
    })

    return NextResponse.json(content)
  } catch (e) {
    console.log('[content_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
