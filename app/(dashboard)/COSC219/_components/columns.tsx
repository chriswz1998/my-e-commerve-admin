'use client'

import { ColumnDef } from '@tanstack/react-table'
import { formatterDate } from '@/lib/utils'
import { BlogMessage } from '@prisma/client'
import { CellAction } from '@/app/(dashboard)/COSC219/_components/cell-action'

export const columns: ColumnDef<BlogMessage>[] = [
  {
    accessorKey: 'firstname',
    header: 'firstname'
  },
  {
    accessorKey: 'lastname',
    header: 'lastname'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phone',
    header: 'phone'
  },
  {
    accessorKey: 'service',
    header: 'service'
  },
  {
    accessorKey: 'message',
    header: 'message'
  },
  {
    accessorKey: 'createAt',
    header: 'Create At',
    cell: ({ row }) => formatterDate(row.original.createAt.toString())
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
