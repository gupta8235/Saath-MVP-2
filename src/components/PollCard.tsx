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

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }

  return (
    <article className="card p-5 space-y-4 fade-up">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose to-mauve flex items-center justify-center text-white text-xs font-semibold">
              {poll.authorName[0]}
            </div>
            <span className="text-xs text-mauve font-medium">{poll.authorName}</span>
            <span className="text-xs text-mauve/60">{formatDate(poll.createdAt)}</span>
          </div>
          <h3 className="font-serif text-lg text-bark leading-snug">{poll.question}</h3>
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
          const votes = poll.votes[i] ?? 0
          const pct   = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0
          const voted = poll.userVote === i
          const hasVoted = poll.userVote !== undefined

          return (
            <button
              key={i}
              onClick={() => handleVote(i)}
              className={`relative overflow-hidden rounded-xl border-2 text-left transition-all group
                ${voted
                  ? 'border-rose shadow-soft'
                  : 'border-blush hover:border-mauve'
                }`}
            >
              {/* Image */}
              {opt.imageUrl && (
                <div className="relative w-full aspect-square">
                  <Image
                    src={opt.imageUrl}
                    alt={opt.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 200px"
                  />
                  {/* Voted overlay */}
                  {voted && (
                    <div className="absolute inset-0 bg-rose/20 flex items-center justify-center">
                      <span className="bg-rose text-white text-xs font-bold px-2 py-0.5 rounded-full">✓ Voted</span>
                    </div>
                  )}
                </div>
              )}

              {/* Label + bar */}
              <div className="p-2.5 space-y-1.5">
                <p className={`text-xs font-semibold ${voted ? 'text-rose' : 'text-bark'}`}>{opt.label}</p>

                {hasVoted && (
                  <div className="space-y-0.5">
                    <div className="h-1 bg-blush rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${voted ? 'bg-rose' : 'bg-mauve'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-mauve">{pct}% · {votes} vote{votes !== 1 ? 's' : ''}</p>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Total votes */}
      {totalVotes > 0 && (
        <p className="text-xs text-mauve text-center">{totalVotes} votes cast</p>
      )}

      {/* Comments toggle */}
      <div className="border-t border-blush pt-3 space-y-3">
        <button
          onClick={() => setShowComments(v => !v)}
          className="flex items-center gap-1.5 text-xs text-mauve hover:text-bark transition-colors"
        >
          <MessageCircle size={14} />
          {poll.comments.length} comment{poll.comments.length !== 1 ? 's' : ''}
          {showComments ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>

        {showComments && (
          <div className="space-y-2.5">
            {poll.comments.map(c => (
              <div key={c.id} className="flex gap-2.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold to-rose flex-shrink-0 flex items-center justify-center text-white text-[10px] font-semibold mt-0.5">
                  {c.authorName[0]}
                </div>
                <div className="bg-blush rounded-xl px-3 py-2 flex-1">
                  <p className="text-[10px] font-semibold text-bark mb-0.5">{c.authorName}</p>
                  <p className="text-xs text-bark">{c.text}</p>
                </div>
              </div>
            ))}

            {/* Comment input */}
            <div className="flex gap-2 mt-2">
              <input
                className="input text-xs py-2 flex-1"
                placeholder="Share your thoughts…"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleComment()}
              />
              <button
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="btn-primary py-2 px-3 flex items-center gap-1 disabled:opacity-40"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
