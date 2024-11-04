import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/prismadb'

// 定义 CORS 头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // 可根据需要限制域名
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type'
}

// 处理 OPTIONS 请求
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

// 处理 POST 请求
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, message } = body

    if (!name) {
      return new NextResponse('name is required', {
        status: 400,
        headers: corsHeaders
      })
    }

    if (!phone) {
      return new NextResponse('phone is required', {
        status: 400,
        headers: corsHeaders
      })
    }

    if (!email) {
      return new NextResponse('email is required', {
        status: 400,
        headers: corsHeaders
      })
    }

    const info = await db.snedInfo.create({
      data: {
        name,
        phone,
        email,
        message
      }
    })

    return new NextResponse(JSON.stringify(info), {
      status: 200,
      headers: corsHeaders
    })
  } catch (e) {
    console.log(`[sendInfo_post]`, e)
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: corsHeaders }
    )
  }
}

// 处理 GET 请求
export async function GET(req: NextRequest) {
  try {
    const infos = await db.snedInfo.findMany()
    return new NextResponse(JSON.stringify(infos), {
      status: 200,
      headers: corsHeaders
    })
  } catch (e) {
    console.log(`[sendInfo_get]`, e)
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: corsHeaders }
    )
  }
}
