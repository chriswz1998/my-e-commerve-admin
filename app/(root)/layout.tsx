import { ReactNode } from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import db from '@/lib/prismadb'

export default async function SetupLayout({
  children
}: {
  children: ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await db.store.findFirst({
    where: {
      userId: userId
    }
  })

  if (store) {
    redirect(`/${store.id}`)
  }

  return <>{children}</>
}
