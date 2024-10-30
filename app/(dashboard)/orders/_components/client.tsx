'use client'
import { Heading } from '@/components/ui/heading'

import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import {
  columns,
  OrderColumn
} from '@/app/(dashboard)/orders/_components/columns'

export const OrdersClient = ({ data }: { data: OrderColumn[] }) => {
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Orders (${data.length})`}
          description={'manage Orders for your website'}
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'email'} />
    </>
  )
}
