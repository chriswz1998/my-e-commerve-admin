import db from '@/lib/prismadb'
import { ProductForm } from '@/app/(dashboard)/products/[productId]/_components/product-form'

const ProductPage = async ({
  params
}: {
  params: { productId: string; storeId: string }
}) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId
    },
    include: {
      images: true
    }
  })

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId
    }
  })
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId
    }
  })
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId
    }
  })

  return (
    <div className={'flex-col'}>
      <div className={'p-6'}>
        <ProductForm
          categories={categories}
          sizes={sizes}
          colors={colors}
          initialData={product}
        />
      </div>
    </div>
  )
}

export default ProductPage
