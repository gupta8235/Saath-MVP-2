'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, SlidersHorizontal } from 'lucide-react'
import Nav from '@/components/Nav'
import VendorCard from '@/components/VendorCard'
import { getProfile } from '@/lib/storage'
import { VENDORS } from '@/lib/mockData'
import type { VendorCategory, WeddingProfile } from '@/lib/types'

const CATEGORIES: ('All' | VendorCategory)[] = [
  'All',
  'Photographer',
  'Decorator',
  'Caterer',
  'Mehendi Artist',
  'Makeup Artist',
  'Venue',
]

// Simple AI-like matching: surfaces vendors whose tags overlap with the user's vibes
const VIBE_TO_TAGS: Record<string, string[]> = {
  'Regal & Traditional':  ['Luxury', 'Palace', 'Mughlai', 'Intricate'],
  'Romantic & Floral':    ['Floral', 'Pastel', 'Candlelit', 'Fairy Lights'],
  'Modern Minimalist':    ['Candid', 'Cinematic', 'HD Makeup'],
  'Boho Garden':          ['Garden', 'Intimate', 'Fairy Lights', 'Boho'],
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

  // Filter
  let filtered = VENDORS
    .filter(v => activeCategory === 'All' || v.category === activeCategory)
    .filter(v => !showAvailableOnly || v.available)

  // Sort by vibe match score (descending), then rating
  filtered = filtered.sort((a, b) => {
    const scoreDiff = matchScore(b, profile.vibes) - matchScore(a, profile.vibes)
    if (scoreDiff !== 0) return scoreDiff
    return b.rating - a.rating
  })

  const topMatches = filtered.filter(v => matchScore(v, profile.vibes) > 0)

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl text-bark">Vendor Recommendations</h1>
          <p className="text-sm text-mauve mt-1">
            Matched to your <span className="text-bark font-medium">{profile.vibes.join(' · ')}</span> vibe · {profile.location}
          </p>
        </div>

        {/* AI Match banner */}
        {topMatches.length > 0 && (
          <div className="card bg-gradient-to-r from-mist to-blush p-4 flex items-center gap-3">
            <Sparkles className="text-gold flex-shrink-0" size={22} />
            <div>
              <p className="text-sm font-semibold text-bark">
                {topMatches.length} vendor{topMatches.length !== 1 ? 's' : ''} match your vibe
              </p>
              <p className="text-xs text-mauve">We sorted these by how well they fit your style preferences.</p>
            </div>
          </div>
        )}

        {/* Filter bar */}
        <div className="space-y-3">
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`flex-shrink-0 text-sm px-4 py-1.5 rounded-full font-medium transition-all
                  ${activeCategory === c
                    ? 'bg-bark text-ivory'
                    : 'bg-white text-bark border border-mauve hover:bg-blush'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Availability toggle */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-mauve" />
            <button
              onClick={() => setShowAvailableOnly(v => !v)}
              className={`text-xs px-3 py-1 rounded-full border transition-all font-medium
                ${showAvailableOnly ? 'bg-rose text-ivory border-rose' : 'border-mauve text-bark hover:bg-blush'}`}
            >
              Available only
            </button>
            <span className="text-xs text-mauve">{filtered.length} vendor{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="card p-10 text-center space-y-3">
            <p className="font-serif text-lg text-bark">No vendors found</p>
            <p className="text-sm text-mauve">Try removing the availability filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-mauve pb-4">
          🌸 Vendor data is currently illustrative · Real listings coming soon
        </p>
      </main>
    </div>
  )
}
