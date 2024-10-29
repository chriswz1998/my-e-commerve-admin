'use client'

import { Case, CaseCategory, Content, ContentItem } from '@prisma/client'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import UEditorComponent from '@/components/u-editor'

interface CaseProps {
  initialData: Case | null
  detailsData: CaseCategory[] | null
}

const formSchema = z.object({
  title_ch: z.string().min(1),
  title_en: z.string().optional(),
  detail: z.string().min(1),
  case_categoryId: z.string().min(1)
})

type CaseFormValues = z.infer<typeof formSchema>

export const CaseForm = ({ initialData, detailsData }: CaseProps) => {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const route = useRouter()

  const title = initialData ? 'Edit case' : 'Create case'
  const description = initialData ? 'Edit case' : 'Add a new case'
  const toastMessage = initialData ? 'Case updated.' : 'Case Created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<CaseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_ch: initialData?.title_ch ?? '', // 如果是null或undefined，设置为空字符串
      title_en: initialData?.title_en ?? '',
      case_categoryId: initialData?.case_categoryId ?? '',
      detail: initialData?.detail ?? ''
    }
  })

  const onSubmit = async (data: CaseFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/case-center/${params.caseId}`, data)
      } else {
        await axios.post(`/api/case-center`, data)
      }
      route.push(`/case-center`)
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
      await axios.delete(`/api/case-center/${params.caseId}`)
      route.push(`/case-center`)
      route.refresh()
      toast.success('nav successfully deleted')
    } catch (e) {
      toast.error('something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={'space-y-6'}>
      <div className={'flex items-center justify-between'}>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant={'destructive'}
            size={'icon'}
            onClick={onDelete}
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
              name="case_categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
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
