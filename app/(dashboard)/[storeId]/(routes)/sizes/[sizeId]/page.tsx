import db from '@/lib/prismadb'
import { SizeForm } from '@/app/(dashboard)/[storeId]/(routes)/sizes/[sizeId]/_components/size-form'

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId
    }
  })
  return (
    <div className={'flex-col'}>
      <div className={'p-6'}>
        <SizeForm initialData={size} />
      </div>
    </div>
  )
}

export default SizePage
