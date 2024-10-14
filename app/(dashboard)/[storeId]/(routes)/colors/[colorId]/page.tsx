import db from '@/lib/prismadb'
import { ColorForm } from '@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/_components/color-form'

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await db.color.findUnique({
    where: {
      id: params.colorId
    }
  })
  return (
    <div className={'flex-col'}>
      <div className={'p-6'}>
        <ColorForm initialData={color} />
      </div>
    </div>
  )
}

export default ColorPage
