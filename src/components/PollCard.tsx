'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MessageCircle, ChevronDown, ChevronUp, Send } from 'lucide-react'
import { votePoll, addComment, generateId } from '@/lib/storage'
import type { Poll } from '@/lib/types'

interface Props {
  poll: Poll
  currentUser: string
  onUpdate: () => void
}

export default function PollCard({ poll, currentUser, onUpdate }: Props) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')

  const totalVotes = Object.values(poll.votes).reduce((a, b) => a + b, 0)

  const handleVote = (index: number) => {
    if (poll.userVote === index) return
    votePoll(poll.id, index)
    onUpdate()
  }

  const handleComment = () => {
    const text = commentText.trim()
    if (!text) return
    addComment(poll.id, {
      id: generateId(),
      authorName: currentUser,
      text,
      createdAt: new Date().toISOString(),
    })
    setCommentText('')
    onUpdate()
    setShowComments(true)
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })

  return (
    <article className="card p-6 space-y-5 fade-up">

      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-petal flex items-center justify-center text-bark text-sm font-medium flex-shrink-0">
          {poll.authorName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-bark">{poll.authorName}</span>
            <span className="text-xs text-mauve">{formatDate(poll.createdAt)}</span>
          </div>
          <h3 className="font-serif text-xl text-bark leading-snug">{poll.question}</h3>
        </div>
      </div>

      {/* Tags */}
      {poll.tags && poll.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {poll.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      )}

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {poll.options.map((opt, i) => {
          const votes   = poll.votes[i] ?? 0
          const pct     = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0
          const voted   = poll.userVote === i
          const hasVoted = poll.userVote !== undefined

          return (
            <button key={i} onClick={() => handleVote(i)}
              className={`relative overflow-hidden rounded-xl border-2 text-left transition-all
                ${voted ? 'border-bark' : 'border-petal hover:border-bark/30'}`}>
              {opt.imageUrl && (
                <div className="relative w-full aspect-square">
                  <Image src={opt.imageUrl} alt={opt.label} fill
                    className="object-cover" sizes="(max-width: 768px) 45vw, 200px" />
                  {voted && (
                    <div className="absolute inset-0 bg-bark/20 flex items-center justify-center">
                      <span className="bg-bark text-white text-xs font-medium px-2.5 py-1 rounded-full">Selected</span>
                    </div>
                  )}
                </div>
              )}
              <div className="p-3 space-y-2">
                <p className={`text-sm font-medium ${voted ? 'text-bark' : 'text-bark/80'}`}>{opt.label}</p>
                {hasVoted && (
                  <div className="space-y-1">
                    <div className="h-0.5 bg-petal rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${voted ? 'bg-bark' : 'bg-mauve/40'}`}
                        style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-mauve">{pct}% · {votes} vote{votes !== 1 ? 's' : ''}</p>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {totalVotes > 0 && (
        <p className="text-xs text-mauve text-center">{totalVotes} total votes</p>
      )}

      {/* Comments */}
      <div className="border-t border-petal pt-4 space-y-3">
        <button onClick={() => setShowComments(v => !v)}
          className="flex items-center gap-1.5 text-xs text-mauve hover:text-bark transition-colors">
          <MessageCircle size={13} />
          {poll.comments.length} comment{poll.comments.length !== 1 ? 's' : ''}
          {showComments ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        {showComments && (
          <div className="space-y-3">
            {poll.comments.map(c => (
              <div key={c.id} className="flex gap-2.5">
                <div className="w-6 h-6 rounded-full bg-petal flex-shrink-0 flex items-center justify-center text-bark text-[10px] font-medium mt-0.5">
                  {c.authorName[0]}
                </div>
                <div className="bg-mist rounded-xl px-3 py-2.5 flex-1">
                  <p className="text-xs font-medium text-bark mb-0.5">{c.authorName}</p>
                  <p className="text-sm text-bark/80">{c.text}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-2 pt-1">
              <input className="input text-sm flex-1" placeholder="Add a comment…"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleComment()} />
              <button onClick={handleComment} disabled={!commentText.trim()}
                className="btn-primary py-2 px-3 disabled:opacity-30">
                <Send size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
