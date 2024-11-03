import db from '@/lib/prismadb'
import { MessageClient } from '@/app/(dashboard)/messages/_components/client'
import { Button } from '@/components/ui/button'

export interface SendInfo {
  id: String
  name: String
  phone: String
  email: String
  message: String
  common: string | null
  createAt: Date
  updatedAt: Date
}

const MessagesPage = async () => {
  const messages = await db.snedInfo.findMany()

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <MessageClient data={messages} />
      </div>
    </div>
  )
}
export default MessagesPage
