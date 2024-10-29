import db from '@/lib/prismadb'
import { DetailForm } from '@/app/(dashboard)/contents/[contentId]/[detailId]/_components/detail-form'

const DetailPage = async ({ params }: { params: { detailId: string } }) => {
  const contentItem = await db.contentItem.findUnique({
    where: {
      id: params.detailId
    }
  })
  return (
    <div className={'flex-col'}>
      <div className={'p-6 space-y-6'}>
        <DetailForm initialData={contentItem} />
      </div>
    </div>
  )
}

export default DetailPage
