import db from '@/lib/prismadb'
import { NewForm } from '@/app/(dashboard)/news/[newId]/_components/new-form'

const NewPage = async ({ params }: { params: { newId: string } }) => {
  const news = await db.news.findUnique({
    where: {
      id: params.newId
    }
  })

  const newsCategory = await db.newsCategory.findMany()

  return (
    <div className={'flex-col'}>
      <div className={'p-6 space-y-6'}>
        <NewForm initialData={news} detailsData={newsCategory} />
      </div>
    </div>
  )
}
export default NewPage
