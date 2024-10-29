import { CaseClient } from '@/app/(dashboard)/case-center/_components/client'
import db from '@/lib/prismadb'

const CaseCenterPage = async () => {
  const cases = await db.case.findMany()

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <CaseClient data={cases} />
      </div>
    </div>
  )
}
export default CaseCenterPage
