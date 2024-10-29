import db from '@/lib/prismadb'
import DetailForm from '@/app/(dashboard)/contents/[contentId]/[detailId]/_components/detail-form'

const DetailPage = async ({ params }: { params: { detailId: string } }) => {
  const data = await db.contentItem.findUnique({
    where: {
      id: params.detailId
    }
  })

  return <DetailForm data={data} />
}

export default DetailPage
