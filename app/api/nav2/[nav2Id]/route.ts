import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import db from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { nav2Id: string } }
) {
  try {
    if (!params.nav2Id)
      return new NextResponse('nav id is required', { status: 400 })

    const nav_2 = await db.nav2.findUnique({
      where: {
        id: params.nav2Id
      }
    })

    return NextResponse.json(nav_2)
  } catch (e) {
    console.log('[nav_1_get]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { nav2Id: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const {
      name_ch,
      name_en,
      disable,
      description_ch,
      description_en,
      nav1Id
    } = body

    if (!params.nav2Id)
      return new NextResponse('nav Id is required', { status: 400 })

    if (!nav1Id)
      return new NextResponse('f_nav Id is required', { status: 400 })

    if (!name_ch)
      return new NextResponse('name_ch is required', { status: 400 })

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const nav_2 = await db.nav2.update({
      where: {
        id: params.nav2Id
      },
      data: {
        name_ch,
        name_en,
        disable,
        description_ch,
        description_en,
        nav1Id
      }
    })

    return NextResponse.json(nav_2)
  } catch (e) {
    console.log('[nav_1_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { nav2Id: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!params.nav2Id)
      return new NextResponse('nav id is required', { status: 400 })

    const nav_2 = await db.nav2.delete({
      where: {
        id: params.nav2Id
      }
    })

    return NextResponse.json(nav_2)
  } catch (e) {
    console.log('[nav_1_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
