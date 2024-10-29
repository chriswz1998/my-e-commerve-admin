'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from '@/app/(dashboard)/billboards/_components/cell-action'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColum = {
  id: string
  label: string
  createAt: string
}

export const columns: ColumnDef<BillboardColum>[] = [
  {
    accessorKey: 'label',
    header: 'Label'
  },
  {
    accessorKey: 'createAt',
    header: 'Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
