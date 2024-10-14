import db from '@/lib/prismadb'
import { format } from 'date-fns'
import { ColorsClient } from '@/app/(dashboard)/[storeId]/(routes)/colors/_components/client'
import { ColorsColum } from '@/app/(dashboard)/[storeId]/(routes)/colors/_components/columns'

const ColorsPage = async ({ params }: { params: { colorId: string } }) => {
  const colors = await db.color.findMany({
    where: {
      storeId: params.colorId
    },
    orderBy: {
      createAt: 'desc'
    }
  })

  const formattedColors: ColorsColum[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createAt: format(color.createAt, 'MMMM do, yyyy')
  }))

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  )
}

export default ColorsPage
