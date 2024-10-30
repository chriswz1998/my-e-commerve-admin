import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { navId: string } }
) {
  try {
    if (!params.navId)
      return new NextResponse('nav id is required', { status: 400 })

    const nav_1 = await db.nav1.findUnique({
      where: {
        id: params.navId
      }
    })

    return NextResponse.json(nav_1)
  } catch (e) {
    console.log('[nav_1_get]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { navId: string } }
) {
  try {
    const body = await req.json()
    const { name_ch, name_en, disable, link, can_has_sub_nav } = body

    if (!params.navId)
      return new NextResponse('nav Id is required', { status: 400 })

    if (!name_ch)
      return new NextResponse('name_ch is required', { status: 400 })

    const nav_1 = await db.nav1.update({
      where: {
        id: params.navId
      },
      data: {
        name_ch,
        name_en,
        disable,
        can_has_sub_nav,
        link
      }
    })

    return NextResponse.json(nav_1)
  } catch (e) {
    console.log('[nav_1_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { navId: string } }
) {
  try {
    if (!params.navId)
      return new NextResponse('nav id is required', { status: 400 })

    const nav_1 = await db.nav1.delete({
      where: {
        id: params.navId
      }
    })

    return NextResponse.json(nav_1)
  } catch (e) {
    console.log('[nav_1_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
