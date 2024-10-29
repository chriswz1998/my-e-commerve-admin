import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title_ch, title_en, detail, case_categoryId } = body

    if (!title_ch)
      return new NextResponse('title_ch is required', { status: 400 })

    if (!detail) return new NextResponse('detail is required', { status: 400 })

    if (!case_categoryId)
      return new NextResponse('case_categoryId is required', { status: 400 })

    const cases = await db.case.create({
      data: {
        title_ch,
        title_en,
        detail,
        case_categoryId
      }
    })

    return NextResponse.json(cases)
  } catch (e) {
    console.log(`[case_post]`, e)
  }
}

export async function GET(req: Request) {
  try {
    const cases = await db.case.findMany()

    return NextResponse.json(cases)
  } catch (e) {
    console.log(`[case_get]`, e)
  }
}
