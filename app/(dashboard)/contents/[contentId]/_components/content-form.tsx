'use client'

import { Content, ContentItem } from '@prisma/client'
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

interface ContentProps {
  initialData: Content | null
  detailsData: { id: string; title_ch: string; desc_ch: string }[] | null
}

const formSchema = z.object({
  title_ch: z.string().min(1),
  title_en: z.string().optional(),
  image_url: z.string().min(1),
  desc_ch: z.string().min(1),
  desc_en: z.string().optional()
})

type ContentFormValues = z.infer<typeof formSchema>

export const ContentForm = ({ initialData, detailsData }: ContentProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const route = useRouter()

  const title = initialData ? 'Edit content' : 'Create content'
  const description = initialData ? 'Edit content' : 'Add a new content'
  const toastMessage = initialData ? 'content updated.' : 'content Created.'
  const action = initialData ? 'Save changes' : 'Create'
  const sub_title = detailsData ? 'Edit details' : 'Create details'
  const sub_description = detailsData ? 'Edit details' : 'Add a new details'

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_ch: initialData?.title_ch ?? '', // 如果是null或undefined，设置为空字符串
      title_en: initialData?.title_en ?? '', // 如果是null或undefined，设置为空字符串
      image_url: initialData?.image_url ?? '', // 如果是null或undefined，设置为false
      desc_ch: initialData?.desc_ch ?? '', // 如果是null或undefined，设置为false
      desc_en: initialData?.desc_en ?? '' // 如果是null或undefined，设置为false
    }
  })

  const onSubmit = async (data: ContentFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/contents/${params.contentId}`, data)
      } else {
        await axios.post(`/api/contents`, data)
      }
      route.push(`/contents`)
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
      await axios.delete(`/api/contents/${params.contentId}`)
      route.push(`/contents`)
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
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type="submit" className={'ml-auto'} disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
      <div className={'flex items-center justify-between pt-10'}>
        <Heading title={sub_title} description={sub_description} />
        <Button onClick={() => route.push(`/contents/${params.contentId}/new`)}>
          <Plus className={'w-4 h-4 mr-2'} />
          Add New
        </Button>
      </div>
      <Separator />
      <div className={'grid gap-4 grid-cols-5'}>
        {detailsData?.map((item) => (
          <Card key={item.id}>
            <CardHeader
              className={
                'flex flex-row items-center justify-between space-y-0 pb-2'
              }
            >
              <CardTitle className={'text-sm font-medium'}>
                {item.desc_ch}
              </CardTitle>
              <DataAction data={item} />
            </CardHeader>
            <CardContent>
              <div className={'text-2xl font-bold'}> {item.title_ch}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
