'use client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'
import {
  CategoryColum,
  columns
} from '@/app/(dashboard)/[storeId]/(routes)/categories/_components/columns'

export const CategoryClient = ({ data }: { data: CategoryColum[] }) => {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Categories (${data.length})`}
          description={'manage categories for your store'}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className={'w-4 h-4 mr-2'} />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'name'} />
      <Heading title={'API'} description={'API calls for Categories'} />
      <ApiList entityName={'Categories'} entityIdName={'categoryId'} />
    </>
  )
}
