import db from '@/lib/prismadb'

export const getStockCount = (storeId: string) => {
  return db.product.count({
    where: {
      storeId,
      isArchived: false
    }
  })
}
