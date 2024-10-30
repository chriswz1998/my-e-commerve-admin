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
  ProductColum
} from '@/app/(dashboard)/products/_components/columns'

export const ProductClient = ({ data }: { data: ProductColum[] }) => {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Products (${data.length})`}
          description={'manage products for your store'}
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className={'w-4 h-4 mr-2'} />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'name'} />
      <Heading title={'API'} description={'API calls for Billboards'} />
      <ApiList entityName={'products'} entityIdName={'productId'} />
    </>
  )
}
