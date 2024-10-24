'use client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'
import { Nav1 } from '@prisma/client'
import { columns } from '@/app/(dashboard)/[storeId]/(routes)/navs/_components/columns'

export const Nav1Client = ({ data }: { data: Nav1[] }) => {
  const params = useParams()
  const router = useRouter()
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Nav_1 (${data.length})`}
          description={'manage nav for your website'}
        />
        <Button onClick={() => router.push(`/${params.storeId}/navs/new`)}>
          <Plus className={'w-4 h-4 mr-2'} />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'name_ch'} />
    </>
  )
}
