'use client'

import { ColumnDef } from '@tanstack/react-table'
import { News } from '@prisma/client'
import { CellAction } from '@/app/(dashboard)/news/_components/cell-action'

export const columns: ColumnDef<News>[] = [
  {
    accessorKey: 'title_ch',
    header: 'Title_ch'
  },
  {
    accessorKey: 'title_en',
    header: 'Title_en'
  },
  {
    accessorKey: 'case_category',
    header: 'Case_category'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
