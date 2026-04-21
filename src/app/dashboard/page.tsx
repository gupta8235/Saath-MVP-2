'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { getProfile, getDecisions, updateDecision, getQuizResult } from '@/lib/storage'
import type { WeddingProfile, WeddingDecision, DecisionStatus, StyleQuizResult } from '@/lib/types'
import { STYLE_PROFILES } from '@/lib/mockData'
import { CheckCircle2, Circle, Clock, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'

const STATUS_CONFIG: Record<DecisionStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending:   { label: 'Not started', color: 'text-faint',    icon: <Circle size={16} className="text-faint" /> },
  exploring: { label: 'Exploring',   color: 'text-exploring', icon: <Clock size={16} className="text-exploring" /> },
  decided:   { label: 'Decided',     color: 'text-decided',   icon: <CheckCircle2 size={16} className="text-decided" /> },
}

const STATUSES: DecisionStatus[] = ['pending', 'exploring', 'decided']

function DecisionRow({ decision, onUpdate }: { decision: WeddingDecision; onUpdate: () => void }) {
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState(decision.note ?? '')
  const cfg = STATUS_CONFIG[decision.status]

  const cycleStatus = () => {
    const next = STATUSES[(STATUSES.indexOf(decision.status) + 1) % STATUSES.length]
    updateDecision(decision.id, { status: next })
    onUpdate()
  }

  const saveNote = () => {
    updateDecision(decision.id, { note })
    onUpdate()
    setOpen(false)
  }

  return (
    <div className="border-b border-border last:border-0">
      <div className="flex items-center gap-4 py-4 px-6">
        <button onClick={cycleStatus} className="flex-shrink-0 hover:opacity-70 transition-opacity">
          {cfg.icon}
        </button>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${decision.status === 'decided' ? 'line-through text-dim' : 'text-ink'}`}>
            {decision.title}
          </p>
          {decision.note && (
            <p className="text-xs text-dim mt-0.5 truncate">{decision.note}</p>
          )}
        </div>
        <span className={`text-2xs tracking-widest uppercase hidden sm:block ${cfg.color}`}>{cfg.label}</span>
        <button onClick={() => setOpen(v => !v)} className="text-faint hover:text-ink transition-colors">
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {open && (
        <div className="px-6 pb-4 space-y-2 bg-surface">
          <p className="label mb-1">Your note</p>
          <textarea
            className="input text-sm resize-none"
            rows={2}
            placeholder="e.g. Shortlisted Gulmohar Studio and Noor Décor…"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setOpen(false)} className="text-xs text-dim hover:text-ink transition-colors">Cancel</button>
            <button onClick={saveNote} className="btn-primary py-1.5 px-4 text-2xs">Save</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile,   setProfile]   = useState<WeddingProfile | null>(null)
  const [decisions, setDecisions] = useState<WeddingDecision[]>([])
  const [quizResult, setQuizResult] = useState<StyleQuizResult | null>(null)

  const load = useCallback(() => {
    const p = getProfile()
    if (!p) { router.replace('/onboarding'); return }
    setProfile(p)
    setDecisions(getDecisions())
    setQuizResult(getQuizResult())
  }, [router])

  useEffect(() => { load() }, [load])

  if (!profile) return null

  const decided   = decisions.filter(d => d.status === 'decided').length
  const exploring = decisions.filter(d => d.status === 'exploring').length
  const pct = Math.round((decided / decisions.length) * 100)

  const daysUntil = Math.ceil(
    (new Date(profile.weddingDate).getTime() - Date.now()) / 86400000
  )

  const grouped = decisions.reduce<Record<string, WeddingDecision[]>>((acc, d) => {
    acc[d.category] = [...(acc[d.category] ?? []), d]
    return acc
  }, {})

  const styleProfile = quizResult ? STYLE_PROFILES[quizResult.dominantStyle] : null

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end border-b border-border pb-10">
          <div>
            <p className="label mb-3">Your wedding</p>
            <h1 className="font-serif text-5xl text-ink leading-tight">
              {profile.name}<br />
              <span className="italic text-dim">& {profile.partnerName}</span>
            </h1>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-dim">
              <span>{profile.location}</span>
              <span>·</span>
              <span>{new Date(profile.weddingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>·</span>
              <span>{profile.guestCount} guests</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Countdown */}
            {daysUntil > 0 && (
              <div className="border border-border p-5">
                <p className="label mb-1">Days remaining</p>
                <p className="font-serif text-5xl text-ink">{daysUntil}</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="label mb-1">Planning progress</p>
              <p className="font-serif text-2xl text-ink">{decided} of {decisions.length} decisions made</p>
            </div>
            <p className="font-serif text-4xl text-ink">{pct}%</p>
          </div>
          <div className="h-0.5 bg-border">
            <div className="h-full bg-ink transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex gap-6 text-xs text-dim">
            <span><span className="text-decided font-medium">{decided}</span> decided</span>
            <span><span className="text-exploring font-medium">{exploring}</span> exploring</span>
            <span><span className="text-faint font-medium">{decisions.length - decided - exploring}</span> not started</span>
          </div>
        </div>

        {/* Style profile banner */}
        {styleProfile ? (
          <div className="bg-surface border border-border p-6 flex items-start gap-5">
            <Sparkles size={20} className="text-gold flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="label mb-1">Your style</p>
              <p className="font-serif text-xl text-ink">{styleProfile.label}</p>
              <p className="text-sm text-dim mt-1 leading-relaxed">{styleProfile.description}</p>
            </div>
            <Link href="/vendors" className="btn-ghost py-2 px-4 text-2xs flex-shrink-0">View vendors</Link>
          </div>
        ) : (
          <div className="bg-surface border border-border p-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-serif text-xl text-ink">Discover your wedding style</p>
              <p className="text-sm text-dim mt-1">Take our visual quiz — 12 images, 2 minutes.</p>
            </div>
            <Link href="/style-quiz" className="btn-primary py-2.5 px-6 flex-shrink-0">Start quiz</Link>
          </div>
        )}

        {/* Decision checklist */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="label mb-1">Decision checklist</p>
              <p className="font-serif text-2xl text-ink">15 key decisions</p>
            </div>
            <p className="text-xs text-dim">Click the icon to cycle status</p>
          </div>

          <div className="border border-border">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <div className="px-6 py-2 bg-surface border-b border-border">
                  <p className="label">{category}</p>
                </div>
                {items.map(d => (
                  <DecisionRow key={d.id} decision={d} onUpdate={load} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
