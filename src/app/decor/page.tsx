'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import { getProfile, getQuizResult } from '@/lib/storage'
import { STYLE_IMAGES, STYLE_PROFILES } from '@/lib/mockData'
import type { WeddingProfile, StyleQuizResult, WeddingStyle } from '@/lib/types'
import { Sparkles, ArrowRight, Flower2, Lightbulb, UtensilsCrossed, Music } from 'lucide-react'

// ─── Event icon mapping ───────────────────────────────────────────────────────
const EVENT_CONFIG: { key: keyof typeof STYLE_PROFILES.Festive['events']; label: string; icon: React.ReactNode }[] = [
  { key: 'haldi',    label: 'Haldi',    icon: <span className="text-lg">🌿</span> },
  { key: 'mehndi',   label: 'Mehndi',   icon: <span className="text-lg">🌸</span> },
  { key: 'sangeet',  label: 'Sangeet',  icon: <span className="text-lg">🎶</span> },
  { key: 'ceremony', label: 'Ceremony', icon: <span className="text-lg">🪔</span> },
]

// ─── Inspiration images per style ────────────────────────────────────────────
const DECOR_IMAGES: Record<WeddingStyle, string[]> = {
  Festive:  [
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1617195920950-1145bf9a9c72?w=500&h=600&fit=crop',
  ],
  Garden: [
    'https://images.unsplash.com/photo-1519741347686-c1e331c20a2d?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=600&fit=crop',
  ],
  Palatial: [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1606216794079-73b6c3a69f68?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=600&fit=crop',
  ],
  Modern: [
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&h=600&fit=crop',
  ],
}

export default function DecorPage() {
  const router = useRouter()
  const [profile,    setProfile]    = useState<WeddingProfile | null>(null)
  const [quizResult, setQuizResult] = useState<StyleQuizResult | null>(null)
  const [activeEvent, setActiveEvent] = useState<typeof EVENT_CONFIG[0]['key']>('haldi')

  useEffect(() => {
    const p = getProfile()
    if (!p) { router.replace('/onboarding'); return }
    setProfile(p)
    setQuizResult(getQuizResult())
  }, [router])

  if (!profile) return null

  // ── No quiz result yet ──────────────────────────────────────────────────────
  if (!quizResult) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <main className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6 fade-up">
          <p className="label">Decor & Theme</p>
          <h1 className="font-serif text-5xl text-ink">Discover your aesthetic</h1>
          <p className="text-sm text-dim max-w-md mx-auto leading-relaxed">
            Take the 2-minute style quiz and we'll build a personalised decor guide for every event —
            your haldi, mehndi, sangeet, and ceremony.
          </p>
          <Link href="/style-quiz"
            className="inline-flex items-center gap-2 btn-primary py-3 px-8 mt-2">
            Take the style quiz <ArrowRight size={14} />
          </Link>
        </main>
      </div>
    )
  }

  const style    = quizResult.dominantStyle
  const profile_ = STYLE_PROFILES[style]
  const likedImages = STYLE_IMAGES.filter(img => quizResult.likedIds.includes(img.id))
  const inspirationImages = DECOR_IMAGES[style]

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-16">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="border-b border-border pb-10">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles size={18} className="text-gold mt-1 flex-shrink-0" />
            <p className="label">Personalised for your style</p>
          </div>
          <h1 className="font-serif text-5xl text-ink leading-tight mb-3">
            Decor &amp; Theme
          </h1>
          <p className="text-sm text-dim max-w-xl leading-relaxed">
            Based on your <span className="text-ink font-medium">{profile_.label}</span> aesthetic — a curated guide for every event across your wedding week.
          </p>
          <p className="text-2xs text-faint mt-3 italic">Recommendations are illustrative — real vendor integrations in V2.</p>
        </div>

        {/* ── Style at a glance ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Archetype card */}
          <div className="space-y-6">
            <div>
              <p className="label mb-2">Your archetype</p>
              <h2 className="font-serif text-4xl italic text-ink">{profile_.label}</h2>
              <p className="text-sm text-dim mt-3 leading-relaxed">{profile_.description}</p>
            </div>

            {/* Colour palette */}
            <div>
              <p className="label mb-3">Colour palette</p>
              <div className="flex gap-3 flex-wrap">
                {profile_.paletteHex.map((hex, i) => (
                  <div key={hex} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-12 h-12 border border-border"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="text-2xs text-dim text-center leading-tight max-w-[56px]">
                      {profile_.palette[i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flowers */}
            <div>
              <p className="label mb-3">Floral palette</p>
              <div className="flex flex-wrap gap-2">
                {profile_.flowers.map(f => (
                  <span key={f} className="tag flex items-center gap-1">
                    <Flower2 size={9} /> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Lighting & Mandap */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-surface border border-border p-4 space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={13} className="text-gold" />
                  <p className="label">Lighting direction</p>
                </div>
                <p className="text-sm text-dim leading-relaxed">{profile_.lighting}</p>
              </div>
              <div className="bg-surface border border-border p-4 space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">🪔</span>
                  <p className="label">Mandap style</p>
                </div>
                <p className="text-sm text-dim leading-relaxed">{profile_.mandapStyle}</p>
              </div>
              <div className="bg-surface border border-border p-4 space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <UtensilsCrossed size={13} className="text-gold" />
                  <p className="label">Table settings</p>
                </div>
                <p className="text-sm text-dim leading-relaxed">{profile_.tableStyle}</p>
              </div>
            </div>
          </div>

          {/* Inspiration mosaic */}
          <div>
            <p className="label mb-3">Style inspiration</p>
            <div className="grid grid-cols-2 gap-px bg-border">
              {inspirationImages.map((url, i) => (
                <div key={i}
                  className={`relative overflow-hidden bg-white ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <Image src={url} alt="Style inspiration" fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Event-by-event guide ──────────────────────────────────────────── */}
        <div>
          <div className="border-b border-border pb-4 mb-8">
            <p className="label mb-1">Event guide</p>
            <h2 className="font-serif text-3xl text-ink">Your wedding week, styled</h2>
          </div>

          {/* Event tab selector */}
          <div className="flex gap-2 flex-wrap mb-8">
            {EVENT_CONFIG.map(ev => (
              <button key={ev.key} onClick={() => setActiveEvent(ev.key)}
                className={`flex items-center gap-2 px-5 py-2.5 text-2xs tracking-widest uppercase font-medium transition-colors
                  ${activeEvent === ev.key
                    ? 'bg-ink text-white'
                    : 'border border-border text-dim hover:border-ink hover:text-ink'}`}>
                {ev.icon} {ev.label}
              </button>
            ))}
          </div>

          {/* Active event content */}
          {EVENT_CONFIG.map(ev => (
            activeEvent === ev.key && (
              <div key={ev.key} className="grid grid-cols-1 md:grid-cols-5 gap-8 fade-up">
                {/* Description */}
                <div className="md:col-span-3 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ev.icon}</span>
                    <h3 className="font-serif text-3xl italic text-ink">{ev.label}</h3>
                  </div>
                  <p className="text-sm text-dim leading-relaxed text-lg">
                    {profile_.events[ev.key]}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {profile_.flowers.slice(0, 3).map(f => (
                      <span key={f} className="tag">{f}</span>
                    ))}
                    {profile_.palette.slice(0, 2).map(c => (
                      <span key={c} className="tag">{c}</span>
                    ))}
                  </div>
                </div>

                {/* Colour accent */}
                <div className="md:col-span-2 flex flex-col gap-3">
                  <p className="label">Palette for this event</p>
                  {profile_.palette.map((name, i) => (
                    <div key={name} className="flex items-center gap-3">
                      <div className="w-8 h-8 border border-border flex-shrink-0"
                        style={{ backgroundColor: profile_.paletteHex[i] }} />
                      <span className="text-xs text-dim">{name}</span>
                    </div>
                  ))}
                  <Link href="/vendors"
                    className="mt-4 inline-flex items-center gap-2 text-xs text-dim hover:text-ink transition-colors underline underline-offset-4">
                    Find {ev.label} vendors <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            )
          ))}
        </div>

        {/* ── Images you loved ─────────────────────────────────────────────── */}
        {likedImages.length > 0 && (
          <div>
            <div className="border-b border-border pb-4 mb-8">
              <p className="label mb-1">Your inspiration</p>
              <h2 className="font-serif text-3xl text-ink">
                Images you loved ({likedImages.length})
              </h2>
              <p className="text-sm text-dim mt-1">From your style quiz — the images that shaped this guide.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-border">
              {likedImages.map(img => (
                <div key={img.id} className="relative aspect-[3/4] overflow-hidden bg-white group">
                  <Image src={img.url} alt={img.caption} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 200px" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-2xs leading-tight">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Other styles ─────────────────────────────────────────────────── */}
        <div>
          <div className="border-b border-border pb-4 mb-8">
            <p className="label mb-1">Explore other aesthetics</p>
            <h2 className="font-serif text-3xl text-ink">More styles</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border">
            {(Object.keys(STYLE_PROFILES) as WeddingStyle[]).map(s => {
              const sp = STYLE_PROFILES[s]
              const isActive = s === style
              return (
                <div key={s} className={`bg-white p-5 space-y-2 ${isActive ? 'ring-1 ring-inset ring-ink' : ''}`}>
                  <div className="flex gap-1.5">
                    {sp.paletteHex.map(hex => (
                      <div key={hex} className="w-4 h-4 border border-border" style={{ backgroundColor: hex }} />
                    ))}
                  </div>
                  <p className={`font-serif text-lg leading-tight ${isActive ? 'text-ink' : 'text-dim'}`}>
                    {sp.label}
                  </p>
                  {isActive && <span className="text-2xs tracking-widest uppercase text-gold">Your style</span>}
                </div>
              )
            })}
          </div>
          {style !== style && (
            <div className="mt-4 text-center">
              <Link href="/style-quiz" className="text-xs text-dim hover:text-ink underline underline-offset-4 transition-colors">
                Retake the quiz to change your style
              </Link>
            </div>
          )}
          <div className="mt-4 text-center">
            <Link href="/style-quiz" className="text-xs text-dim hover:text-ink underline underline-offset-4 transition-colors">
              Retake the quiz to explore a different style
            </Link>
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="border border-border p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-2xl text-ink">Ready to find your vendors?</p>
            <p className="text-sm text-dim mt-1">Browse vendors matched to your {profile_.label} aesthetic.</p>
          </div>
          <Link href="/vendors" className="btn-primary py-3 px-8 flex items-center gap-2 flex-shrink-0">
            Browse vendors <ArrowRight size={14} />
          </Link>
        </div>

      </main>
    </div>
  )
}
