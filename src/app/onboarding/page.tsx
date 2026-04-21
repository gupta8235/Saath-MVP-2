'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveProfile, generateId } from '@/lib/storage'
import type { WeddingProfile, BudgetRange, StyleVibe } from '@/lib/types'
import { Heart, MapPin, Users, Wallet, Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react'

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
  { id: 3, label: 'Budget & vibe' },
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
    set(
      'vibes',
      form.vibes.includes(v)
        ? form.vibes.filter(x => x !== v)
        : [...form.vibes, v]
    )

  const canProceed = () => {
    if (step === 1) return form.name.trim() && form.partnerName.trim()
    if (step === 2) return form.weddingDate && form.location.trim() && form.guestCount
    if (step === 3) return form.budget && form.vibes.length > 0
    return false
  }

  const handleNext = () => {
    if (step < 3) { setStep(s => s + 1); return }
    // Final submit
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
    <div className="min-h-screen bg-gradient-to-br from-blush via-ivory to-mist flex flex-col items-center justify-center px-4 py-12">

      {/* Logo */}
      <div className="mb-8 text-center fade-up">
        <h1 className="font-serif text-5xl text-bark tracking-tight">साथ</h1>
        <p className="text-rose text-sm mt-1 font-medium tracking-wide">Plan together. Decide with confidence.</p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8 fade-up">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all
              ${step > s.id ? 'bg-bark text-ivory' : step === s.id ? 'bg-rose text-ivory ring-4 ring-rose/20' : 'bg-blush text-mauve'}`}>
              {step > s.id ? <Check size={13} /> : s.id}
            </div>
            <span className={`text-xs hidden sm:block ${step === s.id ? 'text-bark font-medium' : 'text-mauve'}`}>{s.label}</span>
            {i < STEPS.length - 1 && <div className={`w-8 h-px ${step > s.id ? 'bg-bark' : 'bg-mauve/40'}`} />}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="card w-full max-w-md p-8 fade-up">

        {/* Step 1: Names */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="text-rose" size={22} />
              <h2 className="font-serif text-2xl text-bark">You & your partner</h2>
            </div>
            <p className="text-sm text-mauve -mt-3">Let's start with the most important names.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-bark mb-1.5">Your name</label>
                <input
                  className="input"
                  placeholder="e.g. Priya"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-bark mb-1.5">Partner's name</label>
                <input
                  className="input"
                  placeholder="e.g. Arjun"
                  value={form.partnerName}
                  onChange={e => set('partnerName', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Date, Location, Guests */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="text-rose" size={22} />
              <h2 className="font-serif text-2xl text-bark">The big day</h2>
            </div>
            <p className="text-sm text-mauve -mt-3">Tell us about your celebration.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-bark mb-1.5">Wedding date</label>
                <input
                  type="date"
                  className="input"
                  value={form.weddingDate}
                  onChange={e => set('weddingDate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-bark mb-1.5">Location / City</label>
                <input
                  className="input"
                  placeholder="e.g. Jaipur, Rajasthan"
                  value={form.location}
                  onChange={e => set('location', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-bark mb-1.5">
                  <Users size={13} className="inline mr-1" />
                  Approx. guest count
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="e.g. 300"
                  value={form.guestCount}
                  onChange={e => set('guestCount', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Budget + Vibe */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="text-gold" size={22} />
              <h2 className="font-serif text-2xl text-bark">Budget & vibe</h2>
            </div>
            <p className="text-sm text-mauve -mt-3">This helps us personalise your recommendations.</p>

            <div>
              <label className="block text-xs font-medium text-bark mb-2">
                <Wallet size={13} className="inline mr-1" />
                Total wedding budget
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BUDGETS.map(b => (
                  <button
                    key={b}
                    onClick={() => set('budget', b)}
                    className={`text-sm px-3 py-2 rounded-xl border font-medium transition-all
                      ${form.budget === b
                        ? 'bg-bark text-ivory border-bark'
                        : 'bg-white text-bark border-mauve hover:border-rose hover:bg-blush'
                      }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-bark mb-2">Wedding vibe <span className="text-mauve">(pick all that fit)</span></label>
              <div className="flex flex-wrap gap-2">
                {VIBES.map(v => (
                  <button
                    key={v}
                    onClick={() => toggleVibe(v)}
                    className={`text-xs px-3.5 py-1.5 rounded-full border font-medium transition-all
                      ${form.vibes.includes(v)
                        ? 'bg-rose text-ivory border-rose'
                        : 'bg-white text-bark border-mauve hover:border-rose hover:bg-blush'
                      }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className={`mt-8 flex ${step > 1 ? 'justify-between' : 'justify-end'}`}>
          {step > 1 && (
            <button className="btn-ghost flex items-center gap-2" onClick={() => setStep(s => s - 1)}>
              <ArrowLeft size={15} /> Back
            </button>
          )}
          <button
            className={`btn-primary flex items-center gap-2 ${!canProceed() ? 'opacity-40 pointer-events-none' : ''}`}
            onClick={handleNext}
          >
            {step === 3 ? 'Let\'s begin' : 'Continue'}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-mauve fade-up">Your data stays on your device · No account needed</p>
    </div>
  )
}
