'use client'

import { ContentItem } from '@prisma/client'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Plus, Trash } from 'lucide-react'
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
import { AlertModal } from '@/components/modals/alert-modal'
import ImageUpload from '@/components/ui/image-upload'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataAction } from '@/app/(dashboard)/contents/[contentId]/_components/detail-action'
import UEditorComponent from '@/components/u-editor'

interface DetailProps {
  initialData: ContentItem | null
}

const formSchema = z.object({
  title_ch: z.string().min(1),
  title_en: z.string().optional(),
  desc_ch: z.string().min(1),
  desc_en: z.string().optional(),
  detail: z.string().min(1)
})

type DetailFormValues = z.infer<typeof formSchema>

export const DetailForm = ({ initialData }: DetailProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const route = useRouter()

  const title = initialData ? 'Edit detail' : 'Create detail'
  const description = initialData ? 'Edit detail' : 'Add a new detail'
  const toastMessage = initialData ? 'Detail updated.' : 'Detail Created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<DetailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_ch: initialData?.title_ch ?? '', // 如果是null或undefined，设置为空字符串
      title_en: initialData?.title_en ?? '', // 如果是null或undefined，设置为空字符串
      desc_ch: initialData?.desc_ch ?? '', // 如果是null或undefined，设置为false
      desc_en: initialData?.desc_en ?? '',
      detail: initialData?.detail ?? ''
    }
  })

  const onSubmit = async (data: DetailFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(
          `/api/contents/${params.contentId}/content-item/${params.detailId}`,
          data
        )
      } else {
        await axios.post(`/api/contents/${params.contentId}/content-item`, data)
      }
      route.push(`/contents/${params.contentId}`)
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
      await axios.delete(
        `/api/contents/${params.contentId}/content-item/${params.detailId}`
      )
      route.push(`/contents/${params.contentId}`)
      route.refresh()
      toast.success('Detail successfully deleted')
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
              name="title_ch"
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
            <FormField
              control={form.control}
              name="title_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title english</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Title english"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc_ch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description english</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description english"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description english</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description english"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div className={'flex flex-col items-center'}>
            <h1 className={'pb-6 font-semibold'}>Edit Content Detail</h1>
            <h2 className={'pb-6 font-medium text-red-500'}>
              if the detail didn&#39;t show the image, please click the replace
              image url button.
            </h2>
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Put your need write</FormLabel>
                  <FormControl>
                    <UEditorComponent {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <Button type="submit" className={'ml-auto'} disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
    </div>
  )
}
