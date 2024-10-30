import db from '@/lib/prismadb'
import { OrdersClient } from '@/app/(dashboard)/orders/_components/client'
import { formatter } from '@/lib/utils'
import { format } from 'date-fns'
import { OrderColumn } from '@/app/(dashboard)/orders/_components/columns'

const OrdersPage = async () => {
  const orders = await db.liscensOrder.findMany({
    include: {
      status: {
        select: {
          name: true
        }
      }
    }
  })

  const formattedOrders: OrderColumn[] = orders.map((product: any) => ({
    id: product.id,
    price: formatter.format(product.price.toNumber()),
    createAt: format(product.createAt, 'MMMM do, yyyy'),
    isPaid: product.isPaid,
    phone: product.phone,
    wx: product.wx,
    email: product.email,
    status: product.status.name
  }))

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <OrdersClient data={formattedOrders} />
      </div>
    </div>
  )
}
export default OrdersPage
