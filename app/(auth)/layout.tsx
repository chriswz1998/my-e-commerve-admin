import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className={'w-full h-full flex items-center justify-center'}>
      {children}
    </div>
  )
}
