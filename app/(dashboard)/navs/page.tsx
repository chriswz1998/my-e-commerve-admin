import db from '@/lib/prismadb'
import {Nav1Client} from "@/app/(dashboard)/navs/_components/client";

const NavsPage = async () => {
  const nav1 = await db.nav1.findMany()

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <Nav1Client data={nav1} />
      </div>
    </div>
  )
}

export default NavsPage
