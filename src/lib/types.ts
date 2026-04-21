// ─── User / Onboarding ───────────────────────────────────────────────────────

export type StyleVibe =
  | 'Regal & Traditional'
  | 'Romantic & Floral'
  | 'Modern Minimalist'
  | 'Boho Garden'
  | 'Maximalist Glam'

export type BudgetRange =
  | '₹50L–₹1Cr'
  | '₹1Cr–₹1.5Cr'
  | '₹1.5Cr–₹2.5Cr'
  | '₹2.5Cr–₹3.5Cr'
  | '₹3.5Cr+'

export interface WeddingProfile {
  name: string
  partnerName: string
  weddingDate: string        // ISO date string
  location: string
  guestCount: number
  budget: BudgetRange
  vibes: StyleVibe[]
  completedAt: string        // ISO timestamp
}

// ─── Polls ───────────────────────────────────────────────────────────────────

export interface PollOption {
  label: string
  imageUrl?: string
}

export interface Poll {
  id: string
  authorName: string
  question: string
  options: PollOption[]
  votes: Record<number, number>  // optionIndex → voteCount
  userVote?: number               // which option current user voted for
  comments: Comment[]
  imageUrl?: string
  tags?: string[]
  createdAt: string
}

// ─── Comments ────────────────────────────────────────────────────────────────

export interface Comment {
  id: string
  authorName: string
  text: string
  createdAt: string
}

// ─── Vendors ─────────────────────────────────────────────────────────────────

export type VendorCategory =
  | 'Photographer'
  | 'Decorator'
  | 'Caterer'
  | 'Mehendi Artist'
  | 'Makeup Artist'
  | 'Venue'

export interface Vendor {
  id: string
  name: string
  category: VendorCategory
  location: string
  priceRange: string
  rating: number
  reviewCount: number
  description: string
  imageUrl: string
  tags: string[]
  available: boolean
}
