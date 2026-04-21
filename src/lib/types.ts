// ─── Wedding Profile ──────────────────────────────────────────────────────────

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
  weddingDate: string
  location: string
  guestCount: number
  budget: BudgetRange
  vibes: StyleVibe[]
  completedAt: string
}

// ─── Decisions ───────────────────────────────────────────────────────────────

export type DecisionStatus = 'pending' | 'exploring' | 'decided'

export interface WeddingDecision {
  id: string
  category: string
  title: string
  status: DecisionStatus
  note?: string
  updatedAt?: string
}

// ─── Style Quiz ───────────────────────────────────────────────────────────────

export type WeddingStyle = 'Festive' | 'Garden' | 'Palatial' | 'Modern'

export interface StyleImage {
  id: string
  url: string
  caption: string
  style: WeddingStyle
}

export interface StyleQuizResult {
  dominantStyle: WeddingStyle
  breakdown: Record<WeddingStyle, number>
  likedIds: string[]
  completedAt: string
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
  votes: Record<number, number>
  userVote?: number
  comments: Comment[]
  tags?: string[]
  createdAt: string
}

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
  styles: WeddingStyle[]
  available: boolean
}
