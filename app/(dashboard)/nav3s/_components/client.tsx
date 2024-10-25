'use client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'
import { Nav3 } from '@prisma/client'
import {columns} from "@/app/(dashboard)/nav3s/_components/columns";

export const Nav3Client = ({
  data
}: {
  data: (Nav3 & { nav2: { name_ch: string } })[]
}) => {
  const router = useRouter()
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Nav_3 (${data.length})`}
          description={'manage nav for your website'}
        />
        <Button onClick={() => router.push(`/nav3s/new`)}>
          <Plus className={'w-4 h-4 mr-2'} />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'name_ch'} />
    </>
  )
}
