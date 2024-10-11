'use client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import {
  BillboardColum,
  columns
} from '@/app/(dashboard)/[storeId]/(routes)/billboards/_components/columns'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'

export const BillboardClient = ({ data }: { data: BillboardColum[] }) => {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Billboards (${data.length})`}
          description={'manage billboards for your store'}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className={'w-4 h-4 mr-2'} />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'label'} />
      <Heading title={'API'} description={'API calls for Billboards'} />
      <ApiList entityName={'billboards'} entityIdName={'billboardId'} />
    </>
  )
}
