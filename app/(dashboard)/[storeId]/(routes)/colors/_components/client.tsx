'use client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'
import {
  ColorsColum,
  columns
} from '@/app/(dashboard)/[storeId]/(routes)/colors/_components/columns'

export const ColorsClient = ({ data }: { data: ColorsColum[] }) => {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Colors (${data.length})`}
          description={'manage colors for your store'}
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className={'w-4 h-4 mr-2'} />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'name'} />
      <Heading title={'API'} description={'API calls for Colors'} />
      <ApiList entityName={'colors'} entityIdName={'ColorId'} />
    </>
  )
}
