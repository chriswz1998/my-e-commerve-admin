import db from '@/lib/prismadb'
import { ContentsClient } from '@/app/(dashboard)/contents/_components/client'

const ContentsPage = async () => {
  const contents = await db.content.findMany()

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <ContentsClient data={contents} />
      </div>
    </div>
  )
}

export default ContentsPage
