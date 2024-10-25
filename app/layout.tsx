import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider'
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Hello Dashboard!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }
  return (
    <ClerkProvider afterSignOutUrl={'/'}>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider />
          <ModalProvider />
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
