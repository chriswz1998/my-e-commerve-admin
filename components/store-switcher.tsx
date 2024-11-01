'use client'

import { ComponentPropsWithoutRef, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopoverTriggerProps {
  items: any[]
}

export default function StoreSwitcher({
  className,
  items = []
}: StoreSwitcherProps) {
  const storeModal = useStoreModal()
  const params = useParams()
  const router = useRouter()

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }))

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  )

  const [open, setOpen] = useState(false)

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={'sm'}
          role="combobox"
          aria-expanded={open}
          aria-label={'Select a store'}
          className="w-[200px] justify-between"
        >
          <StoreIcon className={cn('mr-2 h-4 w-4', className)} />
          {currentStore?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={'w-[200px] p-0'}>
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup>
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  value={store.value}
                  onSelect={() => onStoreSelect(store)}
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      currentStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  storeModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
