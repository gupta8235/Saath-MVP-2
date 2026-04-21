'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Sparkles } from 'lucide-react'
import Nav from '@/components/Nav'
import PollCard from '@/components/PollCard'
import CreatePollModal from '@/components/CreatePollModal'
import { getProfile, getPolls, addPoll } from '@/lib/storage'
import { SEED_POLLS } from '@/lib/mockData'
import type { Poll, WeddingProfile } from '@/lib/types'

const SEED_LOADED_KEY = 'saath_seeds_loaded'

export default function FeedPage() {
  const router = useRouter()
  const [profile, setProfile]   = useState<WeddingProfile | null>(null)
  const [polls, setPolls]        = useState<Poll[]>([])
  const [showModal, setShowModal] = useState(false)

  const loadData = useCallback(() => {
    const p = getProfile()
    if (!p) { router.replace('/onboarding'); return }
    setProfile(p)

    // Seed once
    if (!localStorage.getItem(SEED_LOADED_KEY)) {
      SEED_POLLS.forEach(sp => addPoll(sp))
      localStorage.setItem(SEED_LOADED_KEY, '1')
    }

    setPolls(getPolls())
  }, [router])

  useEffect(() => { loadData() }, [loadData])

  if (!profile) return null

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      <main className="max-w-xl mx-auto px-4 py-8 space-y-8">

        {/* Welcome banner */}
        <div className="card bg-gradient-to-r from-blush to-mist p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose to-mauve flex items-center justify-center text-white font-serif text-xl flex-shrink-0">
            {profile.name[0]}
          </div>
          <div>
            <h2 className="font-serif text-xl text-bark">
              Welcome, {profile.name} 🌸
            </h2>
            <p className="text-xs text-mauve mt-0.5">
              {profile.location} · {new Date(profile.weddingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {profile.vibes.map(v => (
                <span key={v} className="tag text-[10px] py-0.5">{v}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-bark">Community Polls</h1>
            <p className="text-xs text-mauve mt-0.5">{polls.length} conversation{polls.length !== 1 ? 's' : ''} · real brides, real decisions</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-1.5 text-sm"
          >
            <Plus size={15} /> Ask
          </button>
        </div>

        {/* Polls */}
        {polls.length === 0 ? (
          <div className="card p-10 text-center space-y-3">
            <Sparkles className="mx-auto text-gold" size={32} />
            <h3 className="font-serif text-lg text-bark">Be the first to ask!</h3>
            <p className="text-sm text-mauve">Post a poll and get opinions from brides who've been there.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {polls.map(poll => (
              <PollCard
                key={poll.id}
                poll={poll}
                currentUser={profile.name}
                onUpdate={loadData}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create poll modal */}
      {showModal && (
        <CreatePollModal
          authorName={profile.name}
          onClose={() => setShowModal(false)}
          onCreated={loadData}
        />
      )}
    </div>
  )
}
