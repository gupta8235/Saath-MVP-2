'use client'

import type { WeddingProfile, Poll, Comment, WeddingDecision, StyleQuizResult } from './types'
import { DEFAULT_DECISIONS } from './mockData'

const KEYS = {
  profile:   'saath_profile',
  polls:     'saath_polls',
  decisions: 'saath_decisions',
  quiz:      'saath_quiz_result',
  seeds:     'saath_seeds_loaded',
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export function getProfile(): WeddingProfile | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(KEYS.profile)
  return raw ? JSON.parse(raw) : null
}

export function saveProfile(profile: WeddingProfile): void {
  localStorage.setItem(KEYS.profile, JSON.stringify(profile))
}

export function clearAll(): void {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k))
}

// ─── Decisions ────────────────────────────────────────────────────────────────

export function getDecisions(): WeddingDecision[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(KEYS.decisions)
  return raw ? JSON.parse(raw) : DEFAULT_DECISIONS
}

export function updateDecision(id: string, patch: Partial<WeddingDecision>): void {
  const decisions = getDecisions()
  const updated = decisions.map(d =>
    d.id === id ? { ...d, ...patch, updatedAt: new Date().toISOString() } : d
  )
  localStorage.setItem(KEYS.decisions, JSON.stringify(updated))
}

// ─── Style Quiz ───────────────────────────────────────────────────────────────

export function getQuizResult(): StyleQuizResult | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(KEYS.quiz)
  return raw ? JSON.parse(raw) : null
}

export function saveQuizResult(result: StyleQuizResult): void {
  localStorage.setItem(KEYS.quiz, JSON.stringify(result))
}

// ─── Polls ────────────────────────────────────────────────────────────────────

export function getPolls(): Poll[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(KEYS.polls)
  return raw ? JSON.parse(raw) : []
}

function savePolls(polls: Poll[]): void {
  localStorage.setItem(KEYS.polls, JSON.stringify(polls))
}

export function addPoll(poll: Poll): void {
  savePolls([poll, ...getPolls()])
}

export function votePoll(pollId: string, optionIndex: number): void {
  const updated = getPolls().map(p => {
    if (p.id !== pollId) return p
    const votes = { ...p.votes }
    if (p.userVote !== undefined) votes[p.userVote] = Math.max(0, (votes[p.userVote] ?? 0) - 1)
    votes[optionIndex] = (votes[optionIndex] ?? 0) + 1
    return { ...p, votes, userVote: optionIndex }
  })
  savePolls(updated)
}

export function addComment(pollId: string, comment: Comment): void {
  savePolls(getPolls().map(p =>
    p.id !== pollId ? p : { ...p, comments: [...p.comments, comment] }
  ))
}

export function areSeedsLoaded(): boolean {
  return !!localStorage.getItem(KEYS.seeds)
}

export function markSeedsLoaded(): void {
  localStorage.setItem(KEYS.seeds, '1')
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
