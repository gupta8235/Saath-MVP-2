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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-petal">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/feed" className="font-serif text-xl text-bark tracking-tight hover:opacity-70 transition-opacity">
          Saath
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-0.5">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide transition-all
                  ${active ? 'bg-petal text-bark' : 'text-mauve hover:text-bark'}`}>
                <Icon size={14} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="flex items-center gap-3">
          {profile && (
            <span className="hidden sm:block text-xs text-mauve">
              {profile.name} & {profile.partnerName}
            </span>
          )}
          <button onClick={handleLogout}
            className="text-mauve hover:text-bark p-1.5 rounded-full hover:bg-petal transition-all" title="Reset profile">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  )
}
