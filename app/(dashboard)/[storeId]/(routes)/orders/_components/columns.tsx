'use client'

import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColum = {
  id: string
  phone: string
  address: string
  isPaid: boolean
  products: string
  totalPrice: string
  createAt: string
}

export const columns: ColumnDef<OrderColum>[] = [
  {
    accessorKey: 'label',
    header: 'Label'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'totalPrice',
    header: 'TotalPrice'
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid'
  }
]
