'use client'

import { LibraryFinderTabBarStyle } from '@/8th/shared/styled/FeaturesStyled'
import Link from 'next/link'

export default function LibraryTabBar({
  items,
}: {
  items: { href: string; active: boolean; label: string }[]
}) {
  return (
    <LibraryFinderTabBarStyle>
      <div className="tabs">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`tab ${item.active ? 'active' : 'inactive'}`}
            aria-current={item.active ? 'page' : undefined}
            scroll={false}>
            {item.label}
          </Link>
        ))}
      </div>
    </LibraryFinderTabBarStyle>
  )
}
