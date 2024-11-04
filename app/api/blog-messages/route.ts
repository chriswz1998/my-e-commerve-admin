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

    return NextResponse.json(blog)
  } catch (e) {
    console.log(`[blog_post]`, e)
  }
}

export async function GET(req: Request) {
  try {
    const blog = await db.blogMessage.findMany()
    return NextResponse.json(blog)
  } catch (e) {
    console.log(`[blog_get]`, e)
  }
}
