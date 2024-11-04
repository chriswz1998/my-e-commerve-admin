import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/prismadb'

// 自定义 CORS 头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // 或者指定具体的域
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type'
}

// 处理 OPTIONS 请求
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

// 处理 POST 请求
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log(`[blog_post]`, body)

    const { lastname, firstname, phone, email, message, service } = body

    const blog = await db.blogMessage.create({
      data: {
        lastname,
        firstname,
        phone,
        email,
        message,
        service
      }
    })

    return new NextResponse(JSON.stringify(blog), {
      status: 200,
      headers: corsHeaders
    })
  } catch (e) {
    console.log(`[blog_post]`, e)
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: corsHeaders }
    )
  }
}
