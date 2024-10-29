'use client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'
import { Case } from '@prisma/client'
import { columns } from '@/app/(dashboard)/case-center/_components/columns'

export const CaseClient = ({ data }: { data: Case[] }) => {
  const router = useRouter()
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Case (${data.length})`}
          description={'manage nav for your website'}
        />
        <Button onClick={() => router.push(`/case-center/new`)}>
          <Plus className={'w-4 h-4 mr-2'} />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={'title_ch'} />
    </>
  )
}
