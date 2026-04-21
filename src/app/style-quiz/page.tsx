'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { getProfile, saveQuizResult, getQuizResult } from '@/lib/storage'
import { STYLE_IMAGES, STYLE_PROFILES } from '@/lib/mockData'
import type { WeddingStyle, StyleQuizResult } from '@/lib/types'
import { Heart, X, ArrowRight, RotateCcw } from 'lucide-react'

export default function StyleQuizPage() {
  const router = useRouter()
  const [ready, setReady]         = useState(false)
  const [index, setIndex]         = useState(0)
  const [liked, setLiked]         = useState<string[]>([])
  const [result, setResult]       = useState<StyleQuizResult | null>(null)
  const [animating, setAnimating] = useState<'like' | 'skip' | null>(null)

  useEffect(() => {
    if (!getProfile()) { router.replace('/onboarding'); return }
    setResult(getQuizResult())
    setReady(true)
  }, [router])

  if (!ready) return null

  const done = index >= STYLE_IMAGES.length

  const advance = (likeThis: boolean) => {
    const img = STYLE_IMAGES[index]
    setAnimating(likeThis ? 'like' : 'skip')
    setTimeout(() => {
      setAnimating(null)
      if (likeThis) setLiked(prev => [...prev, img.id])
      const nextIndex = index + 1

      if (nextIndex >= STYLE_IMAGES.length) {
        // Calculate result
        const breakdown: Record<WeddingStyle, number> = { Romantic: 0, Modern: 0, Regal: 0, Boho: 0 }
        const finalLiked = likeThis ? [...liked, img.id] : liked
        finalLiked.forEach(id => {
          const si = STYLE_IMAGES.find(s => s.id === id)
          if (si) breakdown[si.style]++
        })
        const dominant = (Object.keys(breakdown) as WeddingStyle[])
          .reduce((a, b) => breakdown[a] >= breakdown[b] ? a : b)
        const r: StyleQuizResult = {
          dominantStyle: dominant,
          breakdown,
          likedIds: finalLiked,
          completedAt: new Date().toISOString(),
        }
        saveQuizResult(r)
        setResult(r)
      }
      setIndex(nextIndex)
    }, 250)
  }

  const restart = () => {
    setIndex(0)
    setLiked([])
    setResult(null)
  }

  // ── Results screen ────────────────────────────────────────────────────────
  if (done && result) {
    const profile = STYLE_PROFILES[result.dominantStyle]
    const total   = result.likedIds.length

    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <main className="max-w-2xl mx-auto px-4 py-16 space-y-10 fade-up">
          <div className="text-center space-y-3">
            <p className="label">Your wedding aesthetic</p>
            <h1 className="font-serif text-6xl italic text-ink">{profile.label}</h1>
            <p className="text-sm text-dim max-w-md mx-auto leading-relaxed">{profile.description}</p>
          </div>

          {/* Style breakdown */}
          <div className="border border-border p-6 space-y-4">
            <p className="label">Style breakdown</p>
            {(Object.entries(result.breakdown) as [WeddingStyle, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([style, count]) => (
                <div key={style} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-ink">{STYLE_PROFILES[style].label}</span>
                    <span className="text-dim">{count} / {total > 0 ? total : '—'}</span>
                  </div>
                  <div className="h-0.5 bg-border">
                    <div className="h-full bg-ink transition-all duration-700"
                      style={{ width: total > 0 ? `${Math.round((count / total) * 100)}%` : '0%' }} />
                  </div>
                </div>
              ))}
          </div>

          {/* Palette */}
          <div className="space-y-3">
            <p className="label">Your palette</p>
            <div className="flex gap-3">
              {profile.palette.map(p => (
                <span key={p} className="tag">{p}</span>
              ))}
            </div>
          </div>

          {/* Images they liked */}
          {result.likedIds.length > 0 && (
            <div className="space-y-3">
              <p className="label">Images you loved ({result.likedIds.length})</p>
              <div className="grid grid-cols-3 gap-2">
                {result.likedIds.slice(0, 6).map(id => {
                  const img = STYLE_IMAGES.find(s => s.id === id)
                  if (!img) return null
                  return (
                    <div key={id} className="relative aspect-[3/4] overflow-hidden">
                      <Image src={img.url} alt={img.caption} fill className="object-cover" sizes="150px" />
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/vendors" className="btn-primary flex items-center justify-center gap-2">
              See matched vendors <ArrowRight size={14} />
            </Link>
            <button onClick={restart} className="btn-ghost flex items-center justify-center gap-2">
              <RotateCcw size={14} /> Retake quiz
            </button>
          </div>
        </main>
      </div>
    )
  }

  // ── Previous result exists ────────────────────────────────────────────────
  if (result && !done) {
    const profile = STYLE_PROFILES[result.dominantStyle]
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <main className="max-w-2xl mx-auto px-4 py-16 space-y-8 fade-up text-center">
          <p className="label">You've already taken the quiz</p>
          <h1 className="font-serif text-5xl italic text-ink">{profile.label}</h1>
          <p className="text-sm text-dim max-w-md mx-auto">{profile.description}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link href="/vendors" className="btn-primary flex items-center justify-center gap-2">
              See matched vendors <ArrowRight size={14} />
            </Link>
            <button onClick={restart} className="btn-ghost flex items-center justify-center gap-2">
              <RotateCcw size={14} /> Retake
            </button>
          </div>
        </main>
      </div>
    )
  }

  // ── Quiz screen ───────────────────────────────────────────────────────────
  const current = STYLE_IMAGES[index]

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-lg mx-auto px-4 py-10">

        {/* Progress */}
        <div className="space-y-2 mb-8">
          <div className="flex justify-between items-center">
            <p className="label">Style discovery</p>
            <p className="text-xs text-dim">{index + 1} / {STYLE_IMAGES.length}</p>
          </div>
          <div className="h-0.5 bg-border">
            <div className="h-full bg-ink transition-all duration-300"
              style={{ width: `${((index) / STYLE_IMAGES.length) * 100}%` }} />
          </div>
          <p className="text-2xs text-dim">Does this inspire your wedding vision?</p>
        </div>

        {/* Image card */}
        <div className={`relative w-full aspect-[3/4] overflow-hidden mb-6 transition-all duration-200
          ${animating === 'like' ? 'scale-95 opacity-0 translate-x-4' :
            animating === 'skip' ? 'scale-95 opacity-0 -translate-x-4' : 'scale-100 opacity-100'}`}>
          <Image
            src={current.url}
            alt={current.caption}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 500px"
            priority
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-5">
            <p className="text-white text-sm font-light">{current.caption}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => advance(false)}
            className="btn-ghost flex items-center justify-center gap-2 py-4">
            <X size={16} /> Not for me
          </button>
          <button onClick={() => advance(true)}
            className="btn-primary flex items-center justify-center gap-2 py-4">
            <Heart size={16} /> Love it
          </button>
        </div>

        <p className="text-center text-2xs text-faint mt-4">
          {liked.length} loved so far
        </p>
      </main>
    </div>
  )
}
