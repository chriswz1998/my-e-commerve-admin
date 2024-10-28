import db from '@/lib/prismadb'
import { Nav3Form } from '@/app/(dashboard)/nav3s/[nav3Id]/_components/nav4-form'

const Nav4Page = async ({ params }: { params: { nav3Id: string } }) => {
  const nav3 = await db.nav3.findUnique({
    where: {
      id: params.nav3Id
    }
  })

  const nav2 = await db.nav2.findMany()

  return (
    <div className={'flex-col'}>
      <div className={'p-6 space-y-6'}>
        <Nav3Form initialData={nav3} nav2={nav2} />
      </div>
    </div>
  )
}

export default Nav4Page
