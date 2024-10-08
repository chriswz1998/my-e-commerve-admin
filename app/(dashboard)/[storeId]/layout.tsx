import { ReactNode } from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import db from '@/lib/prismadb'
import Navbar from '@/components/navbar'

export default async function DashboardLayout({
  children,
  params
}: {
  children: ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  })

  if (!store) {
    redirect('/')
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
