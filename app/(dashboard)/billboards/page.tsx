import db from '@/lib/prismadb'
import { format } from 'date-fns'
import { BillboardClient } from '@/app/(dashboard)/billboards/_components/client'

const billboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createAt: 'desc'
    }
  })

  const formattedBillboards = billboards.map((billboard: any) => ({
    id: billboard.id,
    label: billboard.label,
    createAt: format(billboard.createAt, 'MMMM do, yyyy')
  }))

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  )
}

export default billboardsPage
