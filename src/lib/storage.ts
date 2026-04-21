'use client'

import type { WeddingProfile, Poll, Comment } from './types'

// ─── Keys ────────────────────────────────────────────────────────────────────
const PROFILE_KEY = 'saath_profile'
const POLLS_KEY   = 'saath_polls'

// ─── Profile ─────────────────────────────────────────────────────────────────
export function getProfile(): WeddingProfile | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(PROFILE_KEY)
  return raw ? JSON.parse(raw) : null
}

export function saveProfile(profile: WeddingProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function clearProfile(): void {
  localStorage.removeItem(PROFILE_KEY)
}

// ─── Polls ────────────────────────────────────────────────────────────────────
export function getPolls(): Poll[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(POLLS_KEY)
  return raw ? JSON.parse(raw) : []
}

function savePolls(polls: Poll[]): void {
  localStorage.setItem(POLLS_KEY, JSON.stringify(polls))
}

export function addPoll(poll: Poll): void {
  const polls = getPolls()
  savePolls([poll, ...polls])
}

export function votePoll(pollId: string, optionIndex: number): void {
  const polls = getPolls()
  const updated = polls.map(p => {
    if (p.id !== pollId) return p
    const votes = { ...p.votes }
    // Remove previous vote if any
    if (p.userVote !== undefined) {
      votes[p.userVote] = Math.max(0, (votes[p.userVote] ?? 0) - 1)
    }
    votes[optionIndex] = (votes[optionIndex] ?? 0) + 1
    return { ...p, votes, userVote: optionIndex }
  })
  savePolls(updated)
}

export function addComment(pollId: string, comment: Comment): void {
  const polls = getPolls()
  const updated = polls.map(p => {
    if (p.id !== pollId) return p
    return { ...p, comments: [...p.comments, comment] }
  })
  savePolls(updated)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
export function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
