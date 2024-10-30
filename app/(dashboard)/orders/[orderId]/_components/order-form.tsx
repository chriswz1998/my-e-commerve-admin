'use client'

import { Status } from '@prisma/client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { OrderColumn } from '@/app/(dashboard)/orders/_components/columns'

interface OrderProps {
  initialData: OrderColumn | null
  detailsData: Status[] | null
}

const formSchema = z.object({
  isPaid: z.boolean().optional(),
  phone: z.string().optional(),
  wx: z.string().optional(),
  email: z.string().optional(),
  statusId: z.string(),
  price: z.string().optional()
})

type OrderFormValues = z.infer<typeof formSchema>

export const OrderForm = ({ initialData, detailsData }: OrderProps) => {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const route = useRouter()

  const title = initialData ? 'Edit order' : 'Create order'
  const description = initialData ? 'Edit order' : 'Add a new order'
  const toastMessage = initialData ? 'Order updated.' : 'Order Created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isPaid: initialData?.isPaid || false,
      phone: initialData?.phone ?? '',
      wx: initialData?.wx ?? '',
      email: initialData?.email ?? '',
      statusId: initialData?.statusId ?? '',
      price: String(initialData?.price) ?? 0.0
    }
  })

  const onSubmit = async (data: OrderFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/orders/${params.orderId}`, data)
      } else {
        await axios.post(`/api/orders`, data)
      }
      route.push(`/orders`)
      route.refresh()
      toast.success(toastMessage)
    } catch (e) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={'space-y-6'}>
      <div className={'flex items-center justify-between'}>
        <Heading title={title} description={description} />
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input disabled={true} placeholder="phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wx"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WeChat</FormLabel>
                  <FormControl>
                    <Input disabled={true} placeholder="weChat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input disabled={true} placeholder="price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={true} placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statusId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
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
                            placeholder={'Select a category'}
                          ></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {detailsData?.map((item) => (
                          <SelectItem value={item.id} key={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className={'ml-auto'} disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
    </div>
  )
}
