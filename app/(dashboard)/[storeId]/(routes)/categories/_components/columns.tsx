'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from '@/app/(dashboard)/[storeId]/(routes)/categories/_components/cell-action'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColum = {
  id: string
  name: string
  billboardLabel: string
  createAt: string
}

export const columns: ColumnDef<CategoryColum>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
    cell: ({ row }) => row.original.billboardLabel
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
