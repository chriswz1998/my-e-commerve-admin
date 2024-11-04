import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/prismadb'

// 定义 CORS 头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // 或者指定具体的域
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type'
}

// 处理 GET 请求
export async function GET(
  req: NextRequest,
  { params }: { params: { messageId: string } }
) {
  try {
    if (!params.messageId)
      return new NextResponse('message id is required', {
        status: 400,
        headers: corsHeaders
      })

    const info = await db.snedInfo.findUnique({
      where: {
        id: params.messageId
      }
    })

    return new NextResponse(JSON.stringify(info), {
      status: 200,
      headers: corsHeaders
    })
  } catch (e) {
    console.log('[sendInfo_get]', e)
    return new NextResponse('internal error', {
      status: 500,
      headers: corsHeaders
    })
  }
}

// 处理 PATCH 请求
export async function PATCH(
  req: NextRequest,
  { params }: { params: { messageId: string } }
) {
  try {
    const body = await req.json()
    const { common } = body

    if (!params.messageId)
      return new NextResponse('message id is required', {
        status: 400,
        headers: corsHeaders
      })

    if (!common)
      return new NextResponse('common is required', {
        status: 400,
        headers: corsHeaders
      })

    const info = await db.snedInfo.update({
      where: {
        id: params.messageId
      },
      data: {
        common
      }
    })

    return new NextResponse(JSON.stringify(info), {
      status: 200,
      headers: corsHeaders
    })
  } catch (e) {
    console.log('[sendInfo_patch]', e)
    return new NextResponse('internal error', {
      status: 500,
      headers: corsHeaders
    })
  }
}

// 处理 DELETE 请求
export async function DELETE(
  req: NextRequest,
  { params }: { params: { messageId: string } }
) {
  try {
    if (!params.messageId)
      return new NextResponse('message id is required', {
        status: 400,
        headers: corsHeaders
      })

    const info = await db.snedInfo.delete({
      where: {
        id: params.messageId
      }
    })

    return new NextResponse(JSON.stringify(info), {
      status: 200,
      headers: corsHeaders
    })
  } catch (e) {
    console.log('[info_delete]', e)
    return new NextResponse('internal error', {
      status: 500,
      headers: corsHeaders
    })
  }
}
