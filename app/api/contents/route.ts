import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title_ch, title_en, image_url, desc_ch, desc_en } = body

    if (!title_ch)
      return new NextResponse('title_ch is required', { status: 400 })

    if (!image_url)
      return new NextResponse('Image Url is required', { status: 400 })

    if (!desc_ch)
      return new NextResponse('desc_ch is required', { status: 400 })

    const content = await db.content.create({
      data: {
        title_ch,
        title_en,
        image_url,
        desc_ch,
        desc_en,
        is_connected: false
      }
    })

    return NextResponse.json(content)
  } catch (e: any) {
    console.log(`[content_post]`, e)
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const contents = await db.content.findMany()

    return NextResponse.json(contents)
  } catch (e) {
    console.log(`[contents_get]`, e)
  }
}
