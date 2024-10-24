import db from '@/lib/prismadb'
import { Nav2Form } from '@/app/(dashboard)/[storeId]/(routes)/nav2s/[nav2Id]/_components/nav2-form'

const Nav2Page = async ({ params }: { params: { nav2Id: string } }) => {
  const nav2 = await db.nav2.findUnique({
    where: {
      id: params.nav2Id
    }
  })

  const nav1 = await db.nav1.findMany()

  return (
    <div className={'flex-col'}>
      <div className={'p-6 space-y-6'}>
        <Nav2Form initialData={nav2} nav1={nav1} />
      </div>
    </div>
  )
}

export default Nav2Page
