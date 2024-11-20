'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const routes = [
    {
      href: `/`,
      label: 'Overview',
      active: pathname === `/`
    },
    {
      href: `/navs`,
      label: 'Navs',
      active: pathname === `/navs`
    },
    {
      href: `/nav2s`,
      label: 'Navs_2',
      active: pathname === `/nav2s`
    },
    {
      href: `/contents`,
      label: 'Contents',
      active: pathname === `/contents`
    },
    {
      href: `/case-center`,
      label: 'Cases',
      active: pathname === `/case-center`
    },
    {
      href: `/news`,
      label: 'News',
      active: pathname === `/news`
    },
    {
      href: `/orders`,
      label: 'Orders',
      active: pathname === `/orders`
    },
    {
      href: `/messages`,
      label: 'Message',
      active: pathname === `/messages`
    },
    {
      href: `/COSC219`,
      label: 'COSC219-Contact',
      active: pathname === `/COSC219`
    },
    {
      href: `/settings`,
      label: 'Settings',
      active: pathname === `/settings`
    }
  ]
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
