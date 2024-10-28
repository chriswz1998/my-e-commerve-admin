import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function POST(req: Request) {
  try {
    const { userId } = auth()

    const body = await req.json()
    const { name_ch, name_en, disable, nav2Id, link } = body

    if (!name_ch)
      return new NextResponse('name_ch is required', { status: 400 })
    if (!nav2Id)
      return new NextResponse('f_nav id is required', { status: 400 })
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const nav3 = await db.nav3.createMany({
      data: {
        name_ch,
        name_en,
        disable,
        link,
        nav2Id
      }
    })

    return NextResponse.json(nav3)
  } catch (e) {
    console.log(`[nav3_post]`, e)
  }
}
