import db from '@/lib/prismadb'
import { COSC219Client } from '@/app/(dashboard)/COSC219/_components/client'

const MessagesPage = async () => {
  const messages = await db.blogMessage.findMany()

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <COSC219Client data={messages} />
      </div>
    </div>
  )
}
export default MessagesPage
