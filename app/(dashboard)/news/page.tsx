import db from '@/lib/prismadb'
import { NewsClient } from '@/app/(dashboard)/news/_components/client'

const CaseCenterPage = async () => {
  const news = await db.news.findMany()

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <NewsClient data={news} />
      </div>
    </div>
  )
}
export default CaseCenterPage
