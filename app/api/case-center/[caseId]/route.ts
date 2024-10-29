import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { caseId: string } }
) {
  try {
    if (!params.caseId)
      return new NextResponse('case id is required', { status: 400 })

    const cases = await db.case.findUnique({
      where: {
        id: params.caseId
      }
    })

    return NextResponse.json(cases)
  } catch (e) {
    console.log('[case_get]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { caseId: string } }
) {
  try {
    const body = await req.json()

    const { title_ch, title_en, detail, case_categoryId } = body

    if (!params.caseId)
      return new NextResponse('content id is required', { status: 400 })

    if (!title_ch)
      return new NextResponse('title_ch is required', { status: 400 })

    if (!case_categoryId)
      return new NextResponse('case_category is required', { status: 400 })

    if (!detail) return new NextResponse('detail is required', { status: 400 })

    const cases = await db.case.updateMany({
      where: {
        id: params.caseId
      },
      data: {
        title_ch,
        title_en,
        detail,
        case_categoryId
      }
    })

    return NextResponse.json(cases)
  } catch (e) {
    console.log('[case_patch]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { caseId: string } }
) {
  try {
    if (!params.caseId)
      return new NextResponse('content id is required', { status: 400 })

    const cases = await db.case.delete({
      where: {
        id: params.caseId
      }
    })

    return NextResponse.json(cases)
  } catch (e) {
    console.log('[case_delete]', e)
    return new NextResponse('internal error', { status: 500 })
  }
}
