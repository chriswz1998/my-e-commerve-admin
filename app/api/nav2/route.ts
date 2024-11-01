import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name_ch,
      name_en,
      disable,
      description_ch,
      description_en,
      nav1Id
    } = body

    if (!name_ch)
      return new NextResponse('name_ch is required', { status: 400 })
    if (!nav1Id)
      return new NextResponse('f_nav id is required', { status: 400 })

    const nav2 = await db.nav2.createMany({
      data: {
        name_ch,
        name_en,
        disable,
        description_ch,
        nav1Id,
        description_en
      }
    })

    return NextResponse.json(nav2)
  } catch (e) {
    console.log(`[nav1_post]`, e)
  }
}
