import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { LiscensOrder } from '@prisma/client'

const ShowOrderClient = ({ data }: { data: LiscensOrder }) => {
  return (
    <div className={'max-w-4xl mx-auto'}>
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Phone number
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {data.phone}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            WeChat
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {data.wx}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {data.email}
          </dd>
        </div>
      </dl>
      <div className={'grid gap-10 grid-cols-2'}>
        <Card>
          <CardHeader>
            <CardTitle className={'text-sm font-medium'}>
              驾驶证正本正面
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={data.pic_1}
              alt={''}
              width={500} // Set a specific width
              height={200}
              className={'aspect-square object-cover rounded-md'}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            className={
              'flex flex-row items-center justify-between space-y-0 pb-2'
            }
          >
            <CardTitle className={'text-sm font-medium'}>
              驾驶证正本背面
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={data.pic_2}
              alt={''}
              width={500} // Set a specific width
              height={200}
              className={'aspect-square object-cover rounded-md'}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            className={
              'flex flex-row items-center justify-between space-y-0 pb-2'
            }
          >
            <CardTitle className={'text-sm font-medium'}>
              驾驶证副本正面
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={data.pic_3}
              alt={''}
              width={500} // Set a specific width
              height={200}
              className={'aspect-square object-cover rounded-md'}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            className={
              'flex flex-row items-center justify-between space-y-0 pb-2'
            }
          >
            <CardTitle className={'text-sm font-medium'}>
              驾驶证副本背面
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={data.pic_4}
              alt={''}
              width={500} // Set a specific width
              height={200}
              className={'aspect-square object-cover rounded-md'}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default ShowOrderClient
