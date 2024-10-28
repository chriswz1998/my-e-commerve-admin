'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Nav3 } from '@prisma/client'
import { CellAction } from '@/app/(dashboard)/nav3s/_components/cell-action'
export const columns: ColumnDef<Nav3 & { nav2: { name_ch: string } }>[] = [
  {
    accessorKey: 'name_ch',
    header: 'Name_ch'
  },
  {
    accessorKey: 'name_en',
    header: 'Name_en'
  },
  {
    accessorKey: 'link',
    header: 'Link'
  },
  {
    accessorKey: 'nav_name_en',
    header: 'F_Name_en',
    cell: ({ row }) => {
      return <span className={'text-red-600'}>{row.original.nav2.name_ch}</span>
    }
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
