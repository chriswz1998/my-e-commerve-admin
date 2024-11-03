'use client'

import { ColumnDef } from '@tanstack/react-table'
import { formatterDate } from '@/lib/utils'
import { CellAction } from '@/app/(dashboard)/messages/_components/cell-action'
import { SendInfo } from '@/app/(dashboard)/messages/page'

export const columns: ColumnDef<SendInfo>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'message',
    header: 'Message'
  },
  {
    accessorKey: 'common',
    header: 'Common'
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
