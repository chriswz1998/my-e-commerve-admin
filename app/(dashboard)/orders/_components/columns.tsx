'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from '@/app/(dashboard)/orders/_components/cell-action'
import { formatter } from '@/lib/utils'

export interface OrderColumn {
  id: string
  price: string
  createAt: string
  isPaid: boolean
  phone: string
  wx: string
  email: string
  status?: string
  statusId: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'wx',
    header: 'weChat'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid',
    cell: ({ row }) => (row.original.isPaid ? 'Yes' : 'No')
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <span className={'bg-amber-200 px-4 py-3 rounded-md'}>
          {row.original.status}
        </span>
      )
    }
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
