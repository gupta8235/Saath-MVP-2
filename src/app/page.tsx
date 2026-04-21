'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getProfile } from '@/lib/storage'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const profile = getProfile()
    if (profile) {
      router.replace('/feed')
    } else {
      router.replace('/onboarding')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="text-center space-y-3">
        <h1 className="font-serif text-4xl text-bark tracking-tight">साथ</h1>
        <p className="text-mauve text-sm">Loading…</p>
      </div>
    </div>
  )
}
