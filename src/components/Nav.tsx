'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutGrid, Store, LogOut } from 'lucide-react'
import { getProfile, clearProfile } from '@/lib/storage'

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const profile = getProfile()

  const handleLogout = () => {
    clearProfile()
    router.push('/onboarding')
  }

  const links = [
    { href: '/feed',    label: 'Community', icon: LayoutGrid },
    { href: '/vendors', label: 'Vendors',   icon: Store },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-blush shadow-soft">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/feed" className="font-serif text-2xl text-bark tracking-tight hover:text-rose transition-colors">
          साथ
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all
                  ${active
                    ? 'bg-blush text-bark'
                    : 'text-mauve hover:text-bark hover:bg-blush/50'
                  }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User pill */}
        <div className="flex items-center gap-3">
          {profile && (
            <span className="hidden sm:block text-xs text-mauve font-medium">
              Hi, {profile.name} 🌸
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-mauve hover:text-bark p-1.5 rounded-full hover:bg-blush transition-all"
            title="Reset profile"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}
