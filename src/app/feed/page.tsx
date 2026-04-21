'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import Nav from '@/components/Nav'
import PollCard from '@/components/PollCard'
import CreatePollModal from '@/components/CreatePollModal'
import { getProfile, getPolls, addPoll } from '@/lib/storage'
import { SEED_POLLS } from '@/lib/mockData'
import type { Poll, WeddingProfile } from '@/lib/types'

const SEED_LOADED_KEY = 'saath_seeds_loaded'

export default function FeedPage() {
  const router = useRouter()
  const [profile, setProfile]    = useState<WeddingProfile | null>(null)
  const [polls, setPolls]        = useState<Poll[]>([])
  const [showModal, setShowModal] = useState(false)

  const loadData = useCallback(() => {
    const p = getProfile()
    if (!p) { router.replace('/onboarding'); return }
    setProfile(p)
    if (!localStorage.getItem(SEED_LOADED_KEY)) {
      SEED_POLLS.forEach(sp => addPoll(sp))
      localStorage.setItem(SEED_LOADED_KEY, '1')
    }
    setPolls(getPolls())
  }, [router])

  useEffect(() => { loadData() }, [loadData])

  if (!profile) return null

  const daysUntil = Math.ceil(
    (new Date(profile.weddingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-10">

        {/* Welcome banner */}
        <div className="border-b border-petal pb-8">
          <p className="text-xs text-mauve tracking-widest uppercase mb-2">Your planning journey</p>
          <h1 className="font-serif text-4xl text-bark leading-tight">
            {profile.name} & {profile.partnerName}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-mauve">
            <span>{profile.location}</span>
            <span>·</span>
            <span>{new Date(profile.weddingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            {daysUntil > 0 && (
              <>
                <span>·</span>
                <span className="text-gold font-medium">{daysUntil} days to go</span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {profile.vibes.map(v => <span key={v} className="tag">{v}</span>)}
          </div>
        </div>

        {/* Feed header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl text-bark">Community Polls</h2>
            <p className="text-sm text-mauve mt-0.5">{polls.length} conversations · real couples, real decisions</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2">
            <Plus size={14} /> Ask
          </button>
        </div>

        {/* Polls */}
        {polls.length === 0 ? (
          <div className="card p-12 text-center space-y-3">
            <h3 className="font-serif text-xl text-bark">Be the first to ask</h3>
            <p className="text-sm text-mauve">Post a poll and get real opinions from couples who've been there.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {polls.map(poll => (
              <PollCard key={poll.id} poll={poll} currentUser={profile.name} onUpdate={loadData} />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <CreatePollModal authorName={profile.name} onClose={() => setShowModal(false)} onCreated={loadData} />
      )}
    </div>
  )
}
