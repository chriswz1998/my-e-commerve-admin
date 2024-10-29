'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Content } from '@prisma/client'
import { CellAction } from '@/app/(dashboard)/contents/_components/cell-action'

export const columns: ColumnDef<Content>[] = [
  {
    accessorKey: 'title_ch',
    header: 'Title_ch'
  },
  {
    accessorKey: 'title_en',
    header: 'Title_en'
  },
  {
    accessorKey: 'desc_ch',
    header: 'Description_ch'
  },
  {
    accessorKey: 'desc_en',
    header: 'Description_en'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
