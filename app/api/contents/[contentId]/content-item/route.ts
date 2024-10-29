import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title_ch, title_en, detail, desc_ch, desc_en } = body

    if (!title_ch)
      return new NextResponse('title_ch is required', { status: 400 })

    if (!detail) return new NextResponse('detail is required', { status: 400 })

    if (!desc_ch)
      return new NextResponse('desc_ch is required', { status: 400 })

    const contentItem = await db.contentItem.create({
      data: {
        title_ch,
        title_en,
        desc_ch,
        desc_en,
        detail
      }
    })

    return NextResponse.json(contentItem)
  } catch (e: any) {
    console.log(`[contentItem_post]`, e)
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const contentItems = await db.contentItem.findMany()

    return NextResponse.json(contentItems)
  } catch (e) {
    console.log(`[contentItems_get]`, e)
  }
}
