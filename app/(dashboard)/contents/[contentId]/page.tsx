import db from '@/lib/prismadb'
import { ContentForm } from '@/app/(dashboard)/contents/[contentId]/_components/content-form'

const ContentPage = async ({ params }: { params: { contentId: string } }) => {
  const content = await db.content.findUnique({
    where: {
      id: params.contentId
    }
  })

  const contentItems = await db.contentItem.findMany({
    where: {
      contentId: params.contentId
    },
    select: {
      id: true,
      title_ch: true,
      desc_ch: true
    }
  })

  return (
    <div className={'flex-col'}>
      <div className={'p-6 space-y-6'}>
        <ContentForm initialData={content} detailsData={contentItems} />
      </div>
    </div>
  )
}

export default ContentPage
