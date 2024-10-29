import db from '@/lib/prismadb'
import { CaseForm } from '@/app/(dashboard)/case-center/[caseId]/_components/case-form'

const CasePage = async ({ params }: { params: { caseId: string } }) => {
  const is_case = await db.case.findUnique({
    where: {
      id: params.caseId
    }
  })

  const categories = await db.caseCategory.findMany()

  return (
    <div className={'flex-col'}>
      <div className={'p-6 space-y-6'}>
        <CaseForm initialData={is_case} detailsData={categories} />
      </div>
    </div>
  )
}
export default CasePage
