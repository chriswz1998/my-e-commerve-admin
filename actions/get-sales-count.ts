import db from '@/lib/prismadb'

export const getSalesCount = (storeId: string) => {
  return db.order.count({
    where: {
      storeId,
      isPaid: true
    }
  })
}
