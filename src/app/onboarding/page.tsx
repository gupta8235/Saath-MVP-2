'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveProfile } from '@/lib/storage'
import type { WeddingProfile, BudgetRange, StyleVibe } from '@/lib/types'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'

const VIBES: StyleVibe[] = [
  'Regal & Traditional',
  'Romantic & Floral',
  'Modern Minimalist',
  'Boho Garden',
  'Maximalist Glam',
]

const BUDGETS: BudgetRange[] = [
  '₹50L–₹1Cr',
  '₹1Cr–₹1.5Cr',
  '₹1.5Cr–₹2.5Cr',
  '₹2.5Cr–₹3.5Cr',
  '₹3.5Cr+',
]

const STEPS = [
  { id: 1, label: 'You & your partner' },
  { id: 2, label: 'The big day' },
  { id: 3, label: 'Style & budget' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const [form, setForm] = useState({
    name: '',
    partnerName: '',
    weddingDate: '',
    location: '',
    guestCount: '',
    budget: '' as BudgetRange | '',
    vibes: [] as StyleVibe[],
  })

  const set = (key: keyof typeof form, value: unknown) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const toggleVibe = (v: StyleVibe) =>
    set('vibes', form.vibes.includes(v)
      ? form.vibes.filter(x => x !== v)
      : [...form.vibes, v])

  const canProceed = () => {
    if (step === 1) return form.name.trim() && form.partnerName.trim()
    if (step === 2) return form.weddingDate && form.location.trim() && form.guestCount
    if (step === 3) return form.budget && form.vibes.length > 0
    return false
  }

  const handleNext = () => {
    if (step < 3) { setStep(s => s + 1); return }
    const profile: WeddingProfile = {
      name: form.name.trim(),
      partnerName: form.partnerName.trim(),
      weddingDate: form.weddingDate,
      location: form.location.trim(),
      guestCount: parseInt(form.guestCount) || 0,
      budget: form.budget as BudgetRange,
      vibes: form.vibes,
      completedAt: new Date().toISOString(),
    }
    saveProfile(profile)
    router.push('/feed')
  }

  return (
    <div className="min-h-screen bg-ivory flex">

      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-petal flex-col justify-between p-16">
        <div>
          <h1 className="font-serif text-3xl text-bark tracking-tight">Saath</h1>
          <p className="text-mauve text-sm mt-1 tracking-widest uppercase">Wedding Planning</p>
        </div>
        <div className="space-y-4">
          <p className="font-serif text-5xl text-bark leading-tight italic">
            "Plan your wedding with clarity, confidence & community."
          </p>
        </div>
        <p className="text-xs text-mauve tracking-wide">
          {new Date().getFullYear()} · Saath
        </p>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 py-16">

        {/* Mobile logo */}
        <div className="mb-10 text-center lg:hidden fade-up">
          <h1 className="font-serif text-4xl text-bark tracking-tight">Saath</h1>
          <p className="text-mauve text-xs mt-1 tracking-widest uppercase">Wedding Planning</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-10 fade-up">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all
                ${step > s.id ? 'bg-bark text-white' : step === s.id ? 'bg-bark text-white' : 'bg-petal text-mauve'}`}>
                {step > s.id ? <Check size={12} /> : s.id}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-10 h-px ${step > s.id ? 'bg-bark' : 'bg-petal'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="w-full max-w-sm fade-up">

          {/* Step labels */}
          <p className="text-xs text-mauve tracking-widest uppercase mb-2">Step {step} of 3</p>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl text-bark mb-1">You & your partner</h2>
                <p className="text-sm text-mauve">Let's start with the two of you.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-bark/70 mb-1.5 tracking-wide uppercase">Your name</label>
                  <input className="input" placeholder="e.g. Priya" value={form.name}
                    onChange={e => set('name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-bark/70 mb-1.5 tracking-wide uppercase">Partner's name</label>
                  <input className="input" placeholder="e.g. Arjun" value={form.partnerName}
                    onChange={e => set('partnerName', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl text-bark mb-1">The big day</h2>
                <p className="text-sm text-mauve">Tell us about your celebration.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-bark/70 mb-1.5 tracking-wide uppercase">Wedding date</label>
                  <input type="date" className="input" value={form.weddingDate}
                    onChange={e => set('weddingDate', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-bark/70 mb-1.5 tracking-wide uppercase">City / Venue location</label>
                  <input className="input" placeholder="e.g. Jaipur, Rajasthan" value={form.location}
                    onChange={e => set('location', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-bark/70 mb-1.5 tracking-wide uppercase">Guest count</label>
                  <input type="number" className="input" placeholder="e.g. 250" value={form.guestCount}
                    onChange={e => set('guestCount', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl text-bark mb-1">Style & budget</h2>
                <p className="text-sm text-mauve">Helps us personalise your experience.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-bark/70 mb-3 tracking-wide uppercase">Total budget</label>
                <div className="grid grid-cols-2 gap-2">
                  {BUDGETS.map(b => (
                    <button key={b} onClick={() => set('budget', b)}
                      className={`text-sm px-3 py-2.5 rounded-xl border font-medium transition-all text-left
                        ${form.budget === b ? 'bg-bark text-white border-bark' : 'bg-white text-bark border-petal hover:border-bark/30'}`}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-bark/70 mb-3 tracking-wide uppercase">
                  Wedding vibe <span className="normal-case text-mauve">(pick all that fit)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {VIBES.map(v => (
                    <button key={v} onClick={() => toggleVibe(v)}
                      className={`text-xs px-4 py-2 rounded-full border font-medium transition-all tracking-wide
                        ${form.vibes.includes(v) ? 'bg-bark text-white border-bark' : 'bg-white text-bark border-petal hover:border-bark/30'}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className={`mt-10 flex ${step > 1 ? 'justify-between' : 'justify-end'}`}>
            {step > 1 && (
              <button className="btn-ghost flex items-center gap-2" onClick={() => setStep(s => s - 1)}>
                <ArrowLeft size={14} /> Back
              </button>
            )}
            <button
              className={`btn-primary flex items-center gap-2 ${!canProceed() ? 'opacity-30 pointer-events-none' : ''}`}
              onClick={handleNext}
            >
              {step === 3 ? 'Get started' : 'Continue'} <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <p className="mt-12 text-xs text-mauve fade-up">Your data stays on your device · No account needed</p>
      </div>
    </div>
  )
}
