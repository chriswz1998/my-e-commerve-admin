import db from '@/lib/prismadb'
import { BillboardForm } from '@/app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/_components/billboard-form'

const BillboardPage = async ({
  params
}: {
  params: { billboardId: string }
}) => {
  const billboards = await db.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  })

  return (
    <div className={'flex-col'}>
      <div className={'p-6'}>
        <BillboardForm initialData={billboards} />
      </div>
    </div>
  )
}

export default BillboardPage
