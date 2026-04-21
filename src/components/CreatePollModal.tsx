'use client'

import { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import { addPoll, generateId } from '@/lib/storage'
import type { Poll, PollOption } from '@/lib/types'

const SUGGESTED_TAGS = ['Outfit', 'Decor', 'Photography', 'Venue', 'Mehndi', 'Catering', 'Invite', 'Jewellery']

interface Props {
  authorName: string
  onClose: () => void
  onCreated: () => void
}

export default function CreatePollModal({ authorName, onClose, onCreated }: Props) {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<PollOption[]>([
    { label: '', imageUrl: '' },
    { label: '', imageUrl: '' },
  ])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const setOption = (i: number, field: keyof PollOption, value: string) => {
    setOptions(prev => prev.map((o, idx) => idx === i ? { ...o, [field]: value } : o))
  }

  const addOption = () => {
    if (options.length < 4) setOptions(prev => [...prev, { label: '', imageUrl: '' }])
  }

  const removeOption = (i: number) => {
    if (options.length <= 2) return
    setOptions(prev => prev.filter((_, idx) => idx !== i))
  }

  const toggleTag = (t: string) =>
    setSelectedTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const canSubmit = question.trim() && options.every(o => o.label.trim())

  const handleSubmit = () => {
    if (!canSubmit) return
    const poll: Poll = {
      id: generateId(),
      authorName,
      question: question.trim(),
      options: options.map(o => ({ label: o.label.trim(), imageUrl: o.imageUrl?.trim() || undefined })),
      votes: {},
      comments: [],
      tags: selectedTags,
      createdAt: new Date().toISOString(),
    }
    addPoll(poll)
    onCreated()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bark/30 backdrop-blur-sm">
      <div className="card w-full max-w-lg p-6 space-y-5 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-bark">Ask the community</h2>
          <button onClick={onClose} className="text-mauve hover:text-bark p-1 rounded-full hover:bg-blush transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Question */}
        <div>
          <label className="block text-xs font-medium text-bark mb-1.5">Your question *</label>
          <textarea
            className="input resize-none"
            rows={2}
            placeholder="e.g. Which mandap style matches my venue better?"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
        </div>

        {/* Options */}
        <div>
          <label className="block text-xs font-medium text-bark mb-2">Options *</label>
          <div className="space-y-3">
            {options.map((opt, i) => (
              <div key={i} className="space-y-1.5 bg-blush/40 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-mauve w-5">#{i + 1}</span>
                  <input
                    className="input flex-1"
                    placeholder={`Option ${i + 1} label`}
                    value={opt.label}
                    onChange={e => setOption(i, 'label', e.target.value)}
                  />
                  {options.length > 2 && (
                    <button onClick={() => removeOption(i)} className="text-mauve hover:text-bark p-1 flex-shrink-0">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <input
                  className="input text-xs"
                  placeholder="Image URL (optional) — paste an Unsplash link"
                  value={opt.imageUrl}
                  onChange={e => setOption(i, 'imageUrl', e.target.value)}
                />
              </div>
            ))}
          </div>

          {options.length < 4 && (
            <button onClick={addOption} className="mt-2 flex items-center gap-1.5 text-xs text-mauve hover:text-bark transition-colors">
              <Plus size={13} /> Add option
            </button>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-medium text-bark mb-2">Tags</label>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_TAGS.map(t => (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`text-xs px-3 py-1 rounded-full border transition-all
                  ${selectedTags.includes(t) ? 'bg-bark text-ivory border-bark' : 'border-mauve text-bark hover:bg-blush'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button
            className={`btn-primary ${!canSubmit ? 'opacity-40 pointer-events-none' : ''}`}
            onClick={handleSubmit}
          >
            Post poll
          </button>
        </div>
      </div>
    </div>
  )
}
