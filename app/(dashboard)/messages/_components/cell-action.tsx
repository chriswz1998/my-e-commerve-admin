import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Edit, MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SendInfo } from '@/app/(dashboard)/messages/page'

export const CellAction = ({ data }: { data: SendInfo }) => {
  const route = useRouter()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className={'h-8 w-8 p-0'}>
            <span className={'sr-only'}>Open menu</span>
            <MoreHorizontal className={'h-4 w-4'} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => route.push(`/messages/${data.id}`)}>
            <Edit className={'mr-2 w-4 h-4'} /> Add common
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
