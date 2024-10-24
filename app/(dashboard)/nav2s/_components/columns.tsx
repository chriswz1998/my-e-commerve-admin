'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Nav2 } from '@prisma/client'
import { CellAction } from '@/app/(dashboard)/[storeId]/(routes)/nav2s/_components/cell-action'

export const columns: ColumnDef<Nav2 & { nav1: { name_ch: string } }>[] = [
  {
    accessorKey: 'name_ch',
    header: 'Name_ch'
  },
  {
    accessorKey: 'name_en',
    header: 'Name_en'
  },
  {
    accessorKey: 'nav_name_en',
    header: 'F_Name_en',
    cell: ({ row }) => {
      return <span className={'text-red-600'}>{row.original.nav1.name_ch}</span>
    }
  },
  {
    accessorKey: 'description_ch',
    header: 'Description_ch'
  },
  {
    accessorKey: 'description_en',
    header: 'Description_en'
  },
  {
    accessorKey: 'disable',
    header: 'Disable'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
