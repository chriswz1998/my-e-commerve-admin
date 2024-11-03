'use client'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { SendInfo } from '@/app/(dashboard)/messages/page'
import { columns } from '@/app/(dashboard)/messages/_components/columns'

export const MessageClient = ({ data }: { data: SendInfo[] }) => {
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Messages (${data.length})`}
          description={'manage messages for your website'}
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'name'} />
    </>
  )
}
