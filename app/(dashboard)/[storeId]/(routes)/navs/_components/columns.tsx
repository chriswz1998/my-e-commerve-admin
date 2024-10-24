'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Nav1 } from '@prisma/client'
import { CellAction } from '@/app/(dashboard)/[storeId]/(routes)/navs/_components/cell-action'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Nav1>[] = [
  {
    accessorKey: 'name_ch',
    header: 'Name_ch'
  },
  {
    accessorKey: 'name_en',
    header: 'Name_en'
  },
  {
    accessorKey: 'can_has_sub_nav',
    header: 'Has_sub_nav'
  },
  {
    accessorKey: 'disable',
    header: 'Disable'
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => {
      const link = row.original?.link || 'none' // 确保 link 存在
      return link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      ) : (
        ''
      ) // 显示为超链接
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
