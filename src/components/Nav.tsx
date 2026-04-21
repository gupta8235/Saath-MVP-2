'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'
import { clearAll } from '@/lib/storage'
import { getProfile } from '@/lib/storage'

export default function Nav() {
  const pathname = usePathname()
  const router   = useRouter()
  const profile  = getProfile()

  const handleReset = () => {
    clearAll()
    router.push('/onboarding')
  }

  const links = [
    { href: '/dashboard', label: 'Planning'  },
    { href: '/style-quiz', label: 'Style'    },
    { href: '/decor',      label: 'Decor'    },
    { href: '/feed',       label: 'Community' },
    { href: '/vendors',    label: 'Vendors'   },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        <Link href="/dashboard"
          className="font-serif text-xl text-ink tracking-tight hover:opacity-60 transition-opacity">
          Saath
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const active = pathname.startsWith(href)
            return (
              <Link key={href} href={href}
                className={`text-xs tracking-widest uppercase font-medium transition-colors
                  ${active ? 'text-ink' : 'text-dim hover:text-ink'}`}>
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          {profile && (
            <span className="hidden sm:block text-xs text-dim">
              {profile.name} & {profile.partnerName}
            </span>
          )}
          <button onClick={handleReset} title="Edit profile / reset"
            className="text-dim hover:text-ink transition-colors">
            <Settings size={15} />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex border-t border-border overflow-x-auto scrollbar-hide">
        {links.map(({ href, label }) => {
          const active = pathname.startsWith(href)
          return (
            <Link key={href} href={href}
              className={`flex-shrink-0 px-5 py-2.5 text-2xs tracking-widest uppercase font-medium transition-colors
                ${active ? 'text-ink border-b border-ink' : 'text-dim hover:text-ink'}`}>
              {label}
            </Link>
          )
        })}
      </div>
    </header>
  )
}
