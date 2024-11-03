import { NextResponse } from 'next/server'
import db from '@/lib/prismadb'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-headers': 'Authorization, Content-Type'
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, email, message } = body

    if (!name) return new NextResponse('name is required', { status: 400 })

    if (!phone) return new NextResponse('phone is required', { status: 400 })

    if (!email) return new NextResponse('email is required', { status: 400 })

    const info = await db.snedInfo.create({
      data: {
        name,
        phone,
        email,
        message
      }
    })

    return NextResponse.json(info)
  } catch (e) {
    console.log(`[sendInfo_post]`, e)
  }
}

export async function GET(req: Request) {
  try {
    const infos = await db.snedInfo.findMany()
    return NextResponse.json(infos)
  } catch (e) {
    console.log(`[sendInfo_get]`, e)
  }
}
