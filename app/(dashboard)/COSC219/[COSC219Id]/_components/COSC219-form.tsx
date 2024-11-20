'use client'

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
import { BlogMessage } from '@prisma/client'
import { Textarea } from '@/components/ui/textarea'

interface COSC219Props {
  initialData: BlogMessage | null
}

const formSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  service: z.string().min(1),
  message: z.string().min(1)
})

type COSC219FormValues = z.infer<typeof formSchema>

export const COSC219Form = ({ initialData }: COSC219Props) => {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const route = useRouter()

  const title = initialData ? 'Edit common' : 'Create common'
  const description = initialData ? 'Edit common' : 'Add a common common'
  const toastMessage = initialData ? 'Common updated.' : 'Common Created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<COSC219FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: initialData?.firstname || '',
      lastname: initialData?.lastname || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      service: initialData?.service || '',
      message: initialData?.message || ''
    }
  })

  const onSubmit = async (data: COSC219FormValues) => {
    try {
      toast.success('only can view')
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
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>firstname</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="firstname"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>lastname</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="lastname"
                      {...field}
                    />
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
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>service</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="service"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>message</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="message"
                      {...field}
                    />
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
