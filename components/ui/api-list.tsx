'use client'

import { APIAlert } from '@/components/ui/api-alert'
import { useParams } from 'next/navigation'
import { useOrigin } from '@/hooks/use-origin'

interface ApiListProps {
  entityName: string
  entityIdName: string
}
export const ApiList = ({ entityName, entityIdName }: ApiListProps) => {
  const params = useParams()
  const origin = useOrigin()

  const baseUrl = `${origin}/api/${params.storeId}`

  return (
    <div>
      <APIAlert
        title={'GET'}
        variant={'public'}
        description={`${baseUrl}/${entityName}`}
      />
      <APIAlert
        title={'GET'}
        variant={'public'}
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />
      <APIAlert
        title={'POST'}
        variant={'admin'}
        description={`${baseUrl}/${entityName}`}
      />
      <APIAlert
        title={'PATCH'}
        variant={'admin'}
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />
      <APIAlert
        title={'DELETE'}
        variant={'admin'}
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />
    </div>
  )
}
