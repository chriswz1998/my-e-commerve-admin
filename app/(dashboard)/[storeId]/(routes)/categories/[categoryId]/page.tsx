import db from '@/lib/prismadb'
import { CategoryForm } from '@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/_components/category-form'

const CategoryPage = async ({
  params
}: {
  params: { categoryId: string; storeId: string }
}) => {
  const categories = await db.category.findUnique({
    where: {
      id: params.categoryId
    }
  })

  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  })
  return (
    <div className={'flex-col'}>
      <div className={'p-6'}>
        <CategoryForm initialData={categories} billboards={billboards} />
      </div>
    </div>
  )
}

export default CategoryPage
