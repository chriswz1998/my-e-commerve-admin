import db from '@/lib/prismadb'
import { format } from 'date-fns'
import { SizesColum } from '@/app/(dashboard)/[storeId]/(routes)/sizes/_components/columns'
import { SizesClient } from '@/app/(dashboard)/[storeId]/(routes)/sizes/_components/client'

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createAt: 'desc'
    }
  })

  const formattedSizes: SizesColum[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createAt: format(size.createAt, 'MMMM do, yyyy')
  }))

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  )
}

export default SizesPage
