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

export async function GET(
  req: Request,
  { params }: { params: { messagesId: string } }
) {
  try {
    if (!params.messagesId)
      return new NextResponse('case id is required', { status: 400 })

    const message = await db.blogMessage.findUnique({
      where: {
        id: params.messagesId
      }
    })

    return new NextResponse(JSON.stringify(message), {
      status: 200,
      headers: corsHeaders
    })
  } catch (e) {
    console.log('[case_get]', e)
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: corsHeaders }
    )
  }
}
