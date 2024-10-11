import db from '@/lib/prismadb'
import { format } from 'date-fns'
import { CategoryClient } from '@/app/(dashboard)/[storeId]/(routes)/categories/_components/client'
import { CategoryColum } from '@/app/(dashboard)/[storeId]/(routes)/categories/_components/columns'

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createAt: 'desc'
    }
  })

  const formattedCategories: CategoryColum[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createAt: format(category.createAt, 'MMMM do, yyyy')
  }))

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  )
}

export default CategoriesPage
