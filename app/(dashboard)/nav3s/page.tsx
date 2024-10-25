import db from '@/lib/prismadb'
import {Nav3Client} from "@/app/(dashboard)/nav3s/_components/client";

const NavsPage = async () => {
  const nav3 = await db.nav3.findMany({
    include: {
      nav2: {
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
        <Nav3Client data={nav3} />
      </div>
    </div>
  )
}

export default NavsPage
