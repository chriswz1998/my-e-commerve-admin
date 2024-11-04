import Cors from 'cors'
import { NextRequest, NextResponse } from 'next/server'

// 初始化 CORS 中间件
const cors = Cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type']
})

// 帮助函数来运行中间件
export function runMiddleware(
  req: NextRequest,
  res: NextResponse,
  fn: Function
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export default cors
