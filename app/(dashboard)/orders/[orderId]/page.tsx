import db from '@/lib/prismadb'
import { OrderForm } from '@/app/(dashboard)/orders/[orderId]/_components/order-form'
import { OrderColumn } from '@/app/(dashboard)/orders/_components/columns'
import { formatter } from '@/lib/utils'
import { format } from 'date-fns'

const OrderPage = async ({ params }: { params: { orderId: string } }) => {
  const order = await db.liscensOrder.findUnique({
    where: {
      id: params.orderId
    }
  })

  const status = await db.status.findMany()

  const formattedOrders: OrderColumn = {
    id: order?.id || '',
    price: formatter.format(order?.price.toNumber() || 0),
    createAt: format(order?.createAt || new Date(), 'MMMM do, yyyy'),
    isPaid: order?.isPaid || false,
    phone: order?.phone || '',
    wx: order?.wx || '',
    email: order?.email || '',
    statusId: order?.statusId || ''
  }
  return (
    <div className={'flex-col'}>
      <div className={'p-6 space-y-6'}>
        <OrderForm initialData={formattedOrders} detailsData={status} />
      </div>
    </div>
  )
}
export default OrderPage
