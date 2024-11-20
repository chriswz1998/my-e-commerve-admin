'use client'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { BlogMessage } from '@prisma/client'
import { columns } from '@/app/(dashboard)/COSC219/_components/columns'

export const COSC219Client = ({ data }: { data: BlogMessage[] }) => {
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Messages (${data.length})`}
          description={'manage messages for your website'}
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'email'} />
    </>
  )
}
