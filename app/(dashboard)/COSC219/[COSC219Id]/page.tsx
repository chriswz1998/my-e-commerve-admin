import db from '@/lib/prismadb'
import { MessageForm } from '@/app/(dashboard)/messages/[messageId]/_components/message-form'
import { COSC219Form } from '@/app/(dashboard)/COSC219/[COSC219Id]/_components/COSC219-form'

const MessagePage = async ({ params }: { params: { COSC219Id: string } }) => {
  const message = await db.blogMessage.findUnique({
    where: {
      id: params.COSC219Id
    }
  })

  return (
    <div className={'flex-col'}>
      <div className={'p-6 space-y-6'}>
        <COSC219Form initialData={message} />
      </div>
    </div>
  )
}
export default MessagePage
