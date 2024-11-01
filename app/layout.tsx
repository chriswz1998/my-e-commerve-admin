import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import { ModalProvider } from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider'
import Navbar from '@/components/navbar'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Hello Dashboard!'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await auth()
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider />
          <ModalProvider />
          {user.userId ? <Navbar /> : null}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
