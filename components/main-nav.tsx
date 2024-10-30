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
      href: `/nav3s`,
      label: 'Navs_3',
      active: pathname === `/nav3s`
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
      href: `/billboards`,
      label: 'Billboards',
      active: pathname === `/billboards`
    },
    {
      href: `/categories`,
      label: 'Categories',
      active: pathname === `/categories`
    },
    {
      href: `/sizes`,
      label: 'Sizes',
      active: pathname === `/sizes`
    },
    {
      href: `/colors`,
      label: 'Colors',
      active: pathname === `/colors`
    },
    {
      href: `/products`,
      label: 'Products',
      active: pathname === `/products`
    },
    {
      href: `/orders`,
      label: 'Orders',
      active: pathname === `/orders`
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
