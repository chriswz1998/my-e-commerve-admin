import db from '@/lib/prismadb'
import {Nav2Client} from "@/app/(dashboard)/nav2s/_components/client";

const NavsPage = async () => {
  const nav2 = await db.nav2.findMany({
    include: {
      nav1: {
        select: {
          name_ch: true,
          id: true
        }
      }
    }
  })
  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <Nav2Client data={nav2} />
      </div>
    </div>
  )
}

export default NavsPage
