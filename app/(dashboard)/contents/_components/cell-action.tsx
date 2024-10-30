import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useState } from 'react'
import { AlertModal } from '@/components/modals/alert-modal'
import { Content } from '@prisma/client'

export const CellAction = ({ data }: { data: Content }) => {
  const route = useRouter()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id)
    toast.success('Already Copy.')
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/contents/${data.id}`)
      route.refresh()
      toast.success('nav successfully deleted')
    } catch (e) {
      toast.error('something went wrong.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className={'h-8 w-8 p-0'}>
            <span className={'sr-only'}>Open menu</span>
            <MoreHorizontal className={'h-4 w-4'} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className={'mr-2 w-4 h-4'} /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route.push(`/contents/${data.id}`)}>
            <Edit className={'mr-2 w-4 h-4'} /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className={'mr-2 w-4 h-4'} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
