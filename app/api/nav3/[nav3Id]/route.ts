import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import db from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { nav3Id: string } }
) {
  try {
    if (!params.nav3Id)
      return new NextResponse('nav id is required', { status: 400 })

    const nav_3 = await db.nav3.findUnique({
      where: {
        id: params.nav3Id
      }
    })

    return NextResponse.json(nav_3)
  } catch (e) {
    console.log('[nav_3_get]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { nav3Id: string } }
) {
  try {
    console.log('1231231244')
    const { userId } = auth()
    const body = await req.json()
    const { name_ch, name_en, disable, nav2Id, link } = body

    if (!params.nav3Id)
      return new NextResponse('nav Id is required', { status: 400 })

    if (!nav2Id)
      return new NextResponse('f_nav Id is required', { status: 400 })

    if (!name_ch)
      return new NextResponse('name_ch is required', { status: 400 })

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const nav_3 = await db.nav3.update({
      where: {
        id: params.nav3Id
      },
      data: {
        name_ch,
        name_en,
        nav2Id,
        disable,
        link
      }
    })

    return NextResponse.json(nav_3)
  } catch (e) {
    console.log('[nav_3_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { nav3Id: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!params.nav3Id)
      return new NextResponse('nav id is required', { status: 400 })

    const nav_3 = await db.nav3.delete({
      where: {
        id: params.nav3Id
      }
    })

    return NextResponse.json(nav_3)
  } catch (e) {
    console.log('[nav_3_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
