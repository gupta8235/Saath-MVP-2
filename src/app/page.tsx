'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getProfile } from '@/lib/storage'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.replace(getProfile() ? '/dashboard' : '/onboarding')
  }, [router])
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="font-serif text-2xl text-ink">Saath</p>
    </div>
  )
}
