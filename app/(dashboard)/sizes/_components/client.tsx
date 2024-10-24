'use client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'
import {
  columns,
  SizesColum
} from '@/app/(dashboard)/[storeId]/(routes)/sizes/_components/columns'

export const SizesClient = ({ data }: { data: SizesColum[] }) => {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Sizes (${data.length})`}
          description={'manage billboards for your store'}
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className={'w-4 h-4 mr-2'} />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'name'} />
      <Heading title={'API'} description={'API calls for Sizes'} />
      <ApiList entityName={'sizes'} entityIdName={'sizesId'} />
    </>
  )
}
