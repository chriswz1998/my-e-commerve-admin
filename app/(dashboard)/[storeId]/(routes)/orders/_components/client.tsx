'use client'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import {
  columns,
  OrderColum
} from '@/app/(dashboard)/[storeId]/(routes)/orders/_components/columns'

export const OrderClient = ({ data }: { data: OrderColum[] }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description={'manage Orders for your store'}
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'products'} />
    </>
  )
}
