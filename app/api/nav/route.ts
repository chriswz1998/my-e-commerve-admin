import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'
import { Nav1, Nav2 } from '@prisma/client'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name_ch, name_en, disable, can_has_sub_nav, link } = body

    if (!name_ch)
      return new NextResponse('name_ch is required', { status: 400 })

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

export async function GET(req: Request) {
  try {
    const navs = await db.nav1.findMany({
      include: {
        nav_2: true // Use `nav_2` here to match the model definition
      }
    })

    const transformedNavs = navs.map((item: Nav1 & { nav_2: Nav2[] }) => ({
      ...item,
      nav_2: item.nav_2.map((Item: Nav2) => ({
        id: Item.id,
        name_ch: Item.name_ch,
        name_en: Item.name_en,
        description_ch: Item.description_ch,
        description_en: Item.description_en,
        link: Item.link,
        disable: Item.disable
      }))
    }))

    return NextResponse.json(transformedNavs)
  } catch (e) {
    console.log(`[news_get]`, e)
  }
}
