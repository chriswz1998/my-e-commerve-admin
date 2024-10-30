import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import db from '@/lib/prismadb'
import ShowOrderClient from '@/app/(dashboard)/orders/[orderId]/show-order/_components/client'

const ShowOrderPage = async ({ params }: { params: { orderId: string } }) => {
  const order = await db.liscensOrder.findUnique({
    where: {
      id: params.orderId
    }
  })
  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <Heading title={'翻译材料'} description={'Overview of document'} />
        <Separator />
        <ShowOrderClient data={order} />
      </div>
    </div>
  )
}

export default ShowOrderPage
