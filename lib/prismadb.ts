import { PrismaClient } from '@prisma/client'

declare global {
  // @ts-ignore
  var prisma: PrismaClient | undefined
}

// @ts-ignore
const db = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  globalThis.prisma = db
}

export default db
