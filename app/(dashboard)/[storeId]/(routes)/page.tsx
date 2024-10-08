import { FC } from 'react'
import db from '@/lib/prismadb'

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: FC<DashboardPageProps> = async ({ params }) => {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId
    }
  })
  return <div>active store: {store?.name}</div>
}

export default DashboardPage
