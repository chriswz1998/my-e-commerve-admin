'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Case } from '@prisma/client'
import { CellAction } from '@/app/(dashboard)/case-center/_components/cell-action'

export const columns: ColumnDef<Case>[] = [
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
