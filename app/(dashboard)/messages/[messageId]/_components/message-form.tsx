'use client'

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
import UEditorComponent from '@/components/u-editor'
import { SendInfo } from '@/app/(dashboard)/messages/page'

interface MessageProps {
  initialData: SendInfo | null
}

const formSchema = z.object({
  common: z.string().min(1)
})

type MessageFormValues = z.infer<typeof formSchema>

export const MessageForm = ({ initialData }: MessageProps) => {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const route = useRouter()

  const title = initialData ? 'Edit common' : 'Create common'
  const description = initialData ? 'Edit common' : 'Add a common common'
  const toastMessage = initialData ? 'Common updated.' : 'Common Created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      common: initialData?.common || ''
    }
  })

  const onSubmit = async (data: MessageFormValues) => {
    try {
      setLoading(true)
      await axios.patch(`/api/messages/${params.messageId}`, data)
      route.push(`/messages`)
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
              name="common"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title chinese</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Title chinese"
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
