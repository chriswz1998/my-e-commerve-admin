'use client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'
import { Content } from '@prisma/client'
import { columns } from '@/app/(dashboard)/contents/_components/columns'

export const ContentsClient = ({ data }: { data: Content[] }) => {
  const router = useRouter()
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Content (${data.length})`}
          description={'manage content for your website'}
        />
        <Button onClick={() => router.push(`/contents/new`)}>
          <Plus className={'w-4 h-4 mr-2'} />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'title_ch'} />
    </>
  )
}
