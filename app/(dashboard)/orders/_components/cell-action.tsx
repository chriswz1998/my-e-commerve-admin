import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Edit, MoreHorizontal, ScanSearch } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { OrderColumn } from '@/app/(dashboard)/orders/_components/columns'

export const CellAction = ({ data }: { data: OrderColumn }) => {
  const route = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className={'h-8 w-8 p-0'}>
          <span className={'sr-only'}>Open menu</span>
          <MoreHorizontal className={'h-4 w-4'} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => route.push(`/orders/${data.id}/show-order`)}
        >
          <ScanSearch className={'mr-2 w-4 h-4'} /> Check
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => route.push(`/orders/${data.id}`)}>
          <Edit className={'mr-2 w-4 h-4'} /> Update
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
