'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import Nav from '@/components/Nav'
import VendorCard from '@/components/VendorCard'
import { getProfile } from '@/lib/storage'
import { VENDORS } from '@/lib/mockData'
import type { VendorCategory, WeddingProfile } from '@/lib/types'

const CATEGORIES: ('All' | VendorCategory)[] = [
  'All', 'Photographer', 'Decorator', 'Caterer', 'Mehendi Artist', 'Makeup Artist', 'Venue',
]

const VIBE_TO_TAGS: Record<string, string[]> = {
  'Regal & Traditional':  ['Luxury', 'Palace', 'Mughlai', 'Intricate'],
  'Romantic & Floral':    ['Floral', 'Pastel', 'Candlelit', 'Fairy Lights'],
  'Modern Minimalist':    ['Candid', 'Cinematic', 'HD Makeup'],
  'Boho Garden':          ['Garden', 'Intimate', 'Fairy Lights'],
  'Maximalist Glam':      ['Luxury', 'Palace', 'Premium', 'Drone'],
}

function matchScore(vendor: typeof VENDORS[0], vibes: string[]): number {
  const vibeTagSet = new Set(vibes.flatMap(v => VIBE_TO_TAGS[v] ?? []))
  return vendor.tags.filter(t => vibeTagSet.has(t)).length
}

export default function VendorsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<WeddingProfile | null>(null)
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[0]>('All')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  useEffect(() => {
    const p = getProfile()
    if (!p) { router.replace('/onboarding'); return }
    setProfile(p)
  }, [router])

  if (!profile) return null

  let filtered = VENDORS
    .filter(v => activeCategory === 'All' || v.category === activeCategory)
    .filter(v => !showAvailableOnly || v.available)
    .sort((a, b) => {
      const diff = matchScore(b, profile.vibes) - matchScore(a, profile.vibes)
      return diff !== 0 ? diff : b.rating - a.rating
    })

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">

        {/* Header */}
        <div className="border-b border-petal pb-8">
          <p className="text-xs text-mauve tracking-widest uppercase mb-2">Curated for you</p>
          <h1 className="font-serif text-4xl text-bark">Vendor Recommendations</h1>
          <p className="text-sm text-mauve mt-1">
            Matched to your <span className="text-bark">{profile.vibes.join(' · ')}</span> style · {profile.location}
          </p>
          <p className="text-xs text-mauve/60 mt-2 italic">
            Note: All vendor listings are illustrative placeholders — real vendor data coming in V2.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`flex-shrink-0 text-sm px-4 py-1.5 rounded-full font-medium tracking-wide transition-all
                  ${activeCategory === c ? 'bg-bark text-white' : 'bg-white text-bark border border-petal hover:border-bark/30'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <SlidersHorizontal size={13} className="text-mauve" />
            <button onClick={() => setShowAvailableOnly(v => !v)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium tracking-wide transition-all
                ${showAvailableOnly ? 'bg-bark text-white border-bark' : 'border-petal text-bark hover:border-bark/30'}`}>
              Available only
            </button>
            <span className="text-xs text-mauve">{filtered.length} vendor{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="font-serif text-xl text-bark">No vendors found</p>
            <p className="text-sm text-mauve mt-1">Try removing the availability filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(vendor => <VendorCard key={vendor.id} vendor={vendor} />)}
          </div>
        )}
      </main>
    </div>
  )
}
