'use client'

import { Nav3, Nav2 } from '@prisma/client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { AlertModal } from '@/components/modals/alert-modal'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface Nav3FormProps {
  initialData: Nav3 | null
  nav2: Nav2[]
}

const formSchema = z.object({
  name_ch: z.string().min(1),
  name_en: z.string().optional(),
  disable: z.boolean().optional(),
  nav2Id: z.string().min(1),
  link: z.string().min(1)
})

type Nav3FormValues = z.infer<typeof formSchema>

export const Nav3Form = ({ initialData, nav2 }: Nav3FormProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const route = useRouter()

  const title = initialData ? 'Edit Nav_3' : 'Create Nav_3'
  const description = initialData ? 'Edit Nav_3' : 'Add a new Nav_3'
  const toastMessage = initialData ? 'Nav_3 updated.' : 'Nav_3 Created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<Nav3FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_ch: initialData?.name_ch ?? '', // 如果是null或undefined，设置为空字符串
      name_en: initialData?.name_en ?? '', // 如果是null或undefined，设置为空字符串
      disable: initialData?.disable ?? false, // 如果是null或undefined，设置为false
      nav2Id: '',
      link: initialData?.link ?? ''
    }
  })

  const onSubmit = async (data: Nav3FormValues) => {
    try {
      console.log(1213312)
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/nav3/${params.nav3Id}`, data)
      } else {
        await axios.post(`/api/nav3`, data)
      }
      route.push(`/nav3s`)
      route.refresh()
      toast.success(toastMessage)
    } catch (e) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/nav3/${params.nav2Id}`)
      route.push(`/nav3s`)
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
    <div className={'space-y-6'}>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className={'flex items-center justify-between'}>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant={'destructive'}
            size={'icon'}
            onClick={() => setOpen(true)}
          >
            <Trash className={'w-4 h-4'} />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className={'grid grid-cols-3 gap-8'}>
            <FormField
              control={form.control}
              name="name_ch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name chinese</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Name chinese"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name english</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Name english"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nav2Id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>上级导航</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder={'Select a navigation'}
                          ></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nav2.map((item) => (
                          <SelectItem value={item.id} key={item.id}>
                            {item.name_ch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="disable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">禁用该导航</FormLabel>
                    <FormDescription>
                      启用后该导航下面的子导航均不可用
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className={'ml-auto'} disabled={loading}>
            {action} asdasd
          </Button>
        </form>
      </Form>
      <Separator />
    </div>
  )
}
