import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function POST(req: Request) {
  try {
    const { userId } = auth()

    const body = await req.json()
    const { name_ch, name_en, disable, can_has_sub_nav, link } = body

    if (!name_ch)
      return new NextResponse('name_ch is required', { status: 400 })

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const nav1 = await db.nav1.create({
      data: {
        name_ch,
        name_en,
        disable,
        link,
        can_has_sub_nav
      }
    })

    return NextResponse.json(nav1)
  } catch (e) {
    console.log(`[nav1_post]`, e)
  }
}
