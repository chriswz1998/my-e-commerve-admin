import db from '@/lib/prismadb'
import { format } from 'date-fns'
import { formatter } from '@/lib/utils'
import { OrderColum } from '@/app/(dashboard)/[storeId]/(routes)/orders/_components/columns'
import { OrderClient } from '@/app/(dashboard)/[storeId]/(routes)/orders/_components/client'

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await db.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createAt: 'desc'
    }
  })

  const formattedOrders: OrderColum[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems.map((order) => order.product.name).join(', '),
    totalPrice: formatter.format(
      order.orderItems.reduce(
        (acc, curr) => acc + Number(curr.product.price),
        0
      )
    ),
    createAt: format(order.createAt, 'MMMM do, yyyy')
  }))

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  )
}

export default OrdersPage
