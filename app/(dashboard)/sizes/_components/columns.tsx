'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from '@/app/(dashboard)/[storeId]/(routes)/sizes/_components/cell-action'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizesColum = {
  id: string
  name: string
  value: string
  createAt: string
}

export const columns: ColumnDef<SizesColum>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'value',
    header: 'Value'
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