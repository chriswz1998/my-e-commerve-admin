import db from '@/lib/prismadb'
import { format } from 'date-fns'
import { formatter } from '@/lib/utils'
import { ProductClient } from '@/app/(dashboard)/[storeId]/(routes)/products/_components/client'
import { ProductColum } from '@/app/(dashboard)/[storeId]/(routes)/products/_components/columns'

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      size: true,
      color: true
    },
    orderBy: {
      createAt: 'desc'
    }
  })

  const formattedProducts: ProductColum[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createAt: format(product.createAt, 'MMMM do, yyyy')
  }))

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}

export default ProductsPage
