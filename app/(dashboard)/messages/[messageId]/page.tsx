import db from '@/lib/prismadb'
import { MessageForm } from '@/app/(dashboard)/messages/[messageId]/_components/message-form'

const MessagePage = async ({ params }: { params: { messageId: string } }) => {
  const message = await db.snedInfo.findUnique({
    where: {
      id: params.messageId
    }
  })

  return (
    <div className={'flex-col'}>
      <div className={'p-6 space-y-6'}>
        <MessageForm initialData={message} />
      </div>
    </div>
  )
}
export default MessagePage
