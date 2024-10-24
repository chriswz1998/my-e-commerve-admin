import db from '@/lib/prismadb'
import { Nav1Form } from '@/app/(dashboard)/[storeId]/(routes)/navs/[navId]/_components/nav-form'

const Nav1Page = async ({ params }: { params: { navId: string } }) => {
  const nav1 = await db.nav1.findUnique({
    where: {
      id: params.navId
    }
  })

  return (
    <div className={'flex-col'}>
      <div className={'p-6 space-y-6'}>
        <Nav1Form initialData={nav1} />
      </div>
    </div>
  )
}

export default Nav1Page
