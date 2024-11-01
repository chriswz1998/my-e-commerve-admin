import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title_ch, title_en, detail, newsCategoryId } = body

    if (!title_ch)
      return new NextResponse('title_ch is required', { status: 400 })

    if (!detail) return new NextResponse('detail is required', { status: 400 })

    if (!newsCategoryId)
      return new NextResponse('case_categoryId is required', { status: 400 })

    const news = await db.news.create({
      data: {
        title_ch,
        title_en,
        detail,
        newsCategoryId
      }
    })

    return NextResponse.json(news)
  } catch (e) {
    console.log(`[news_post]`, e)
  }
}

export async function GET(req: Request) {
  try {
    const news = await db.newsCategory.findMany({
      include: {
        newsItems: true
      }
    })

    return NextResponse.json(news)
  } catch (e) {
    console.log(`[news_get]`, e)
  }
}
