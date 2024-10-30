import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { newId: string } }
) {
  try {
    if (!params.newId)
      return new NextResponse('new id is required', { status: 400 })

    const news = await db.news.findUnique({
      where: {
        id: params.newId
      }
    })

    return NextResponse.json(news)
  } catch (e) {
    console.log('[new_get]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { newId: string } }
) {
  try {
    const body = await req.json()

    const { title_ch, title_en, detail, newsCategoryId } = body

    if (!params.newId)
      return new NextResponse('content id is required', { status: 400 })

    if (!title_ch)
      return new NextResponse('title_ch is required', { status: 400 })

    if (!newsCategoryId)
      return new NextResponse('case_category is required', { status: 400 })

    if (!detail) return new NextResponse('detail is required', { status: 400 })

    const news = await db.news.updateMany({
      where: {
        id: params.newId
      },
      data: {
        title_ch,
        title_en,
        detail,
        newsCategoryId
      }
    })

    return NextResponse.json(news)
  } catch (e) {
    console.log('[news_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { newId: string } }
) {
  try {
    if (!params.newId)
      return new NextResponse('news id is required', { status: 400 })

    const news = await db.news.delete({
      where: {
        id: params.newId
      }
    })

    return NextResponse.json(news)
  } catch (e) {
    console.log('[news_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
