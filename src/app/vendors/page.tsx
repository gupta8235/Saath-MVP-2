'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import { getProfile, getQuizResult } from '@/lib/storage'
import { VENDORS, STYLE_PROFILES } from '@/lib/mockData'
import type { VendorCategory, WeddingProfile, StyleQuizResult } from '@/lib/types'
import { Star, MapPin, Bookmark, ArrowRight } from 'lucide-react'

const CATEGORIES: ('All' | VendorCategory)[] = [
  'All', 'Photographer', 'Decorator', 'Caterer', 'Mehendi Artist', 'Makeup Artist', 'Venue',
]

export default function VendorsPage() {
  const router = useRouter()
  const [profile,    setProfile]    = useState<WeddingProfile | null>(null)
  const [quizResult, setQuizResult] = useState<StyleQuizResult | null>(null)
  const [category,   setCategory]   = useState<typeof CATEGORIES[0]>('All')
  const [availOnly,  setAvailOnly]  = useState(false)

  useEffect(() => {
    const p = getProfile()
    if (!p) { router.replace('/onboarding'); return }
    setProfile(p)
    setQuizResult(getQuizResult())
  }, [router])

  if (!profile) return null

  const styleProfile = quizResult ? STYLE_PROFILES[quizResult.dominantStyle] : null

  let filtered = VENDORS
    .filter(v => category === 'All' || v.category === category)
    .filter(v => !availOnly || v.available)

  // Sort: style-matched first, then by rating
  if (quizResult) {
    filtered = filtered.sort((a, b) => {
      const aMatch = a.styles.includes(quizResult.dominantStyle) ? 1 : 0
      const bMatch = b.styles.includes(quizResult.dominantStyle) ? 1 : 0
      if (bMatch !== aMatch) return bMatch - aMatch
      return b.rating - a.rating
    })
  }

  const matchedCount = quizResult
    ? filtered.filter(v => v.styles.includes(quizResult.dominantStyle)).length
    : 0

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-10">

        {/* Header */}
        <div className="border-b border-border pb-8">
          <p className="label mb-2">Curated vendors</p>
          <h1 className="font-serif text-5xl text-ink">Find your team</h1>
          <p className="text-sm text-dim mt-2">
            {styleProfile
              ? <>Showing <span className="text-ink font-medium">{matchedCount} top matches</span> for your <span className="text-ink font-medium">{styleProfile.label}</span> aesthetic</>
              : 'Complete the style quiz to see personalised matches'}
          </p>
          {!quizResult && (
            <Link href="/style-quiz"
              className="inline-flex items-center gap-2 mt-4 text-xs text-dim hover:text-ink transition-colors underline underline-offset-4">
              Take the style quiz <ArrowRight size={12} />
            </Link>
          )}
          <p className="text-2xs text-faint mt-3 italic">
            All vendor listings are illustrative — real vendor data in V2.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`flex-shrink-0 text-2xs px-4 py-2 tracking-widest uppercase font-medium transition-colors
                  ${category === c ? 'bg-ink text-white' : 'border border-border text-dim hover:border-ink hover:text-ink'}`}>
                {c}
              </button>
            ))}
          </div>
          <button onClick={() => setAvailOnly(v => !v)}
            className={`text-2xs px-4 py-2 tracking-widest uppercase font-medium border transition-colors
              ${availOnly ? 'bg-ink text-white border-ink' : 'border-border text-dim hover:border-ink hover:text-ink'}`}>
            Available only
          </button>
          <span className="text-xs text-dim ml-auto">{filtered.length} vendors</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {filtered.map(vendor => {
            const isMatch = quizResult && vendor.styles.includes(quizResult.dominantStyle)
            return (
              <article key={vendor.id} className="bg-white group flex flex-col">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image src={vendor.imageUrl} alt={vendor.name} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 300px" />
                  {isMatch && (
                    <div className="absolute top-3 left-3 bg-white text-ink text-2xs font-medium px-2.5 py-1 tracking-widest uppercase">
                      Style match
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 text-ink text-2xs font-medium px-2.5 py-1 tracking-widest uppercase">
                    {vendor.category}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 gap-2.5">
                  <div className="flex items-start justify-between">
                    <h3 className="font-serif text-xl text-ink">{vendor.name}</h3>
                    <button className="text-faint hover:text-ink transition-colors mt-0.5">
                      <Bookmark size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-dim">
                    <MapPin size={10} /> {vendor.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10}
                          className={i < Math.floor(vendor.rating) ? 'text-gold fill-gold' : 'text-border'} />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-ink">{vendor.rating}</span>
                    <span className="text-xs text-dim">({vendor.reviewCount})</span>
                  </div>

                  <p className="text-sm font-medium text-ink">{vendor.priceRange}</p>
                  <p className="text-xs text-dim leading-relaxed line-clamp-2 flex-1">{vendor.description}</p>

                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {vendor.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>

                  <button disabled={!vendor.available}
                    className={`mt-2 w-full py-2.5 text-2xs tracking-widest uppercase font-medium transition-colors
                      ${vendor.available
                        ? 'bg-ink text-white hover:bg-dim'
                        : 'bg-surface text-faint cursor-not-allowed'}`}>
                    {vendor.available ? 'Enquire' : 'Join waitlist'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </main>
    </div>
  )
}
