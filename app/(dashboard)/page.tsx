import { FC } from 'react'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, DollarSign, Package } from 'lucide-react'
import { formatter } from '@/lib/utils'

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = 1
  const salesCount = 2
  const stockCount = 3

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <Heading title={'Dashboard'} description={'Overview of your store'} />
        <Separator />
        <div className={'grid gap-4 grid-cols-3'}>
          <Card>
            <CardHeader
              className={
                'flex flex-row items-center justify-between space-y-0 pb-2'
              }
            >
              <CardTitle className={'text-sm font-medium'}>
                Total Revenue
              </CardTitle>
              <DollarSign className={'h-4 w-4 text-muted-foreground'} />
            </CardHeader>
            <CardContent>
              <div className={'text-2xl font-bold'}>
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              className={
                'flex flex-row items-center justify-between space-y-0 pb-2'
              }
            >
              <CardTitle className={'text-sm font-medium'}>Sales</CardTitle>
              <CreditCard className={'h-4 w-4 text-muted-foreground'} />
            </CardHeader>
            <CardContent>
              <div className={'text-2xl font-bold'}>+ {salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              className={
                'flex flex-row items-center justify-between space-y-0 pb-2'
              }
            >
              <CardTitle className={'text-sm font-medium'}>
                Products In Stock
              </CardTitle>
              <Package className={'h-4 w-4 text-muted-foreground'} />
            </CardHeader>
            <CardContent>
              <div className={'text-2xl font-bold'}>{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className={'col-span-4'}>
          <CardHeader>
            <CardTitle className={'text-sm font-medium'}>Overview</CardTitle>
          </CardHeader>
          <CardContent>{/*<Overview data={graphRevenue} />*/}</CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
