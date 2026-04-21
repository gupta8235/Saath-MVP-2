import type { Poll, Vendor, WeddingDecision, StyleImage } from './types'

// ─── Default Decisions ────────────────────────────────────────────────────────

export const DEFAULT_DECISIONS: WeddingDecision[] = [
  { id: 'd1',  category: 'Venue',        title: 'Select the wedding venue',           status: 'pending' },
  { id: 'd2',  category: 'Photography',  title: 'Book photographer & videographer',   status: 'pending' },
  { id: 'd3',  category: 'Catering',     title: 'Finalise catering & menus',          status: 'pending' },
  { id: 'd4',  category: 'Décor',        title: 'Choose décor & floral design',       status: 'pending' },
  { id: 'd5',  category: 'Outfits',      title: 'Bridal outfit & fittings',           status: 'pending' },
  { id: 'd6',  category: 'Outfits',      title: 'Groom\'s outfit',                    status: 'pending' },
  { id: 'd7',  category: 'Beauty',       title: 'Book mehendi artist',                status: 'pending' },
  { id: 'd8',  category: 'Beauty',       title: 'Book makeup artist & hair',          status: 'pending' },
  { id: 'd9',  category: 'Music',        title: 'Music, DJ or live band',             status: 'pending' },
  { id: 'd10', category: 'Stationery',   title: 'Wedding invitations & stationery',   status: 'pending' },
  { id: 'd11', category: 'Jewellery',    title: 'Bridal jewellery',                   status: 'pending' },
  { id: 'd12', category: 'Planning',     title: 'Hire wedding coordinator',           status: 'pending' },
  { id: 'd13', category: 'Guests',       title: 'Arrange guest accommodation',        status: 'pending' },
  { id: 'd14', category: 'Honeymoon',    title: 'Plan the honeymoon',                 status: 'pending' },
  { id: 'd15', category: 'Catering',     title: 'Menu tasting session',               status: 'pending' },
]

// ─── Style Quiz Images ────────────────────────────────────────────────────────
// 12 curated wedding images, 3 per style archetype

export const STYLE_IMAGES: StyleImage[] = [
  // Romantic
  {
    id: 'r1', style: 'Romantic',
    url: 'https://images.unsplash.com/photo-1519741347686-c1e331c20a2d?w=700&h=900&fit=crop',
    caption: 'Garden ceremony with lush floral arch',
  },
  {
    id: 'r2', style: 'Romantic',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&h=900&fit=crop',
    caption: 'Candlelit aisle with soft petal lining',
  },
  {
    id: 'r3', style: 'Romantic',
    url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&h=900&fit=crop',
    caption: 'Outdoor ceremony in golden hour light',
  },
  // Modern
  {
    id: 'm1', style: 'Modern',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=900&fit=crop',
    caption: 'Minimalist reception with clean lines',
  },
  {
    id: 'm2', style: 'Modern',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&h=900&fit=crop',
    caption: 'Architectural venue with editorial styling',
  },
  {
    id: 'm3', style: 'Modern',
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=700&h=900&fit=crop',
    caption: 'Sleek tablescape with monochrome palette',
  },
  // Regal
  {
    id: 'g1', style: 'Regal',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&h=900&fit=crop',
    caption: 'Grand ballroom with chandelier centrepiece',
  },
  {
    id: 'g2', style: 'Regal',
    url: 'https://images.unsplash.com/photo-1606216794079-73b6c3a69f68?w=700&h=900&fit=crop',
    caption: 'Palace venue with opulent floral columns',
  },
  {
    id: 'g3', style: 'Regal',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&h=900&fit=crop',
    caption: 'Royal mandap with gold and jewel tones',
  },
  // Boho
  {
    id: 'b1', style: 'Boho',
    url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=700&h=900&fit=crop',
    caption: 'Intimate garden with fairy light canopy',
  },
  {
    id: 'b2', style: 'Boho',
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&h=900&fit=crop',
    caption: 'Farmhouse celebration with wildflower décor',
  },
  {
    id: 'b3', style: 'Boho',
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=700&h=900&fit=crop',
    caption: 'Relaxed outdoor ceremony at sunset',
  },
]

// ─── Style Archetypes ─────────────────────────────────────────────────────────

export const STYLE_PROFILES = {
  Romantic: {
    label: 'The Romantic',
    description: 'Soft, lush, and deeply personal. You are drawn to florals, candlelight, and moments that feel intimate even in a crowd.',
    palette: ['Blush', 'Ivory', 'Sage', 'Antique Gold'],
  },
  Modern: {
    label: 'The Modernist',
    description: 'Clean, considered, and quietly luxurious. You want a wedding that feels like an editorial — every detail intentional, nothing overdone.',
    palette: ['White', 'Charcoal', 'Champagne', 'Stone'],
  },
  Regal: {
    label: 'The Regal',
    description: 'Grand, opulent, and timeless. You want your wedding to feel like an event — a celebration that people talk about for decades.',
    palette: ['Deep Burgundy', 'Gold', 'Ivory', 'Emerald'],
  },
  Boho: {
    label: 'The Free Spirit',
    description: 'Relaxed, warm, and full of soul. You want your wedding to feel like a gathering — unhurried, natural, and full of laughter.',
    palette: ['Terracotta', 'Cream', 'Sage', 'Warm Brown'],
  },
}

// ─── Vendors ─────────────────────────────────────────────────────────────────

export const VENDORS: Vendor[] = [
  {
    id: 'v1', name: 'Frosted Frames', category: 'Photographer', location: 'Mumbai',
    priceRange: '₹2.5L–₹4L', rating: 4.9, reviewCount: 84,
    description: 'Award-winning candid wedding photographers. Cinematic storytelling for South Asian weddings.',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600',
    tags: ['Candid', 'Cinematic'], styles: ['Modern', 'Boho'], available: true,
  },
  {
    id: 'v2', name: 'Ishq Stories', category: 'Photographer', location: 'Delhi',
    priceRange: '₹1.8L–₹3L', rating: 4.7, reviewCount: 112,
    description: 'Storytelling through light and emotion. Drone coverage, same-day edits, 500-photo album.',
    imageUrl: 'https://images.unsplash.com/photo-1519741347686-c1e331c20a2d?w=600',
    tags: ['Drone', 'Editorial'], styles: ['Romantic', 'Regal'], available: true,
  },
  {
    id: 'v3', name: 'Gulmohar Studio', category: 'Decorator', location: 'Jaipur',
    priceRange: '₹5L–₹12L', rating: 4.8, reviewCount: 56,
    description: 'Floral design house known for ceiling installations and lush mandap arrangements. Featured in Vogue Weddings.',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600',
    tags: ['Floral', 'Luxury'], styles: ['Romantic', 'Regal'], available: true,
  },
  {
    id: 'v4', name: 'Noor Décor', category: 'Decorator', location: 'Mumbai',
    priceRange: '₹3L–₹7L', rating: 4.6, reviewCount: 73,
    description: 'Intimate events specialists. Candlelit, pastel, and fairy-light aesthetics.',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600',
    tags: ['Intimate', 'Fairy Lights'], styles: ['Romantic', 'Boho'], available: false,
  },
  {
    id: 'v5', name: 'Annapurna Catering', category: 'Caterer', location: 'Delhi',
    priceRange: '₹1,200–₹2,200 / plate', rating: 4.7, reviewCount: 145,
    description: 'Pan-India menu specialists with live chaat counters and impeccable hygiene ratings.',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
    tags: ['Live Counters', 'Vegetarian'], styles: ['Romantic', 'Boho', 'Modern'], available: true,
  },
  {
    id: 'v6', name: 'Nawabi Dawat', category: 'Caterer', location: 'Lucknow',
    priceRange: '₹1,800–₹3,500 / plate', rating: 4.9, reviewCount: 61,
    description: 'Authentic Awadhi and Mughlai cuisine. Dum biryani, kebabs, and dessert stations that guests remember forever.',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600',
    tags: ['Mughlai', 'Premium'], styles: ['Regal'], available: true,
  },
  {
    id: 'v7', name: 'Henna by Zara', category: 'Mehendi Artist', location: 'Mumbai',
    priceRange: '₹25K–₹60K', rating: 4.9, reviewCount: 203,
    description: 'Intricate bridal mehendi with hidden motifs and dulha portraits. Booked 6 months in advance on average.',
    imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=600',
    tags: ['Bridal', 'Intricate'], styles: ['Romantic', 'Regal', 'Boho', 'Modern'], available: true,
  },
  {
    id: 'v8', name: 'Aarohi Bridal', category: 'Makeup Artist', location: 'Delhi',
    priceRange: '₹30K–₹80K', rating: 4.8, reviewCount: 176,
    description: 'HD bridal makeup and airbrush foundation. Team of 3 for quick turnarounds on big wedding days.',
    imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600',
    tags: ['HD Makeup', 'Airbrush'], styles: ['Modern', 'Regal', 'Romantic'], available: true,
  },
  {
    id: 'v9', name: 'The Leela Palace', category: 'Venue', location: 'Udaipur',
    priceRange: '₹25L–₹60L', rating: 4.9, reviewCount: 38,
    description: 'Lakeside palace with 5-star hospitality. Rooftop ceremonies and full wedding weekend packages.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    tags: ['Palace', 'Lakeside'], styles: ['Regal'], available: true,
  },
  {
    id: 'v10', name: 'Fern & Willow Farmhouse', category: 'Venue', location: 'Gurgaon',
    priceRange: '₹8L–₹18L', rating: 4.7, reviewCount: 55,
    description: '3-acre farmhouse with indoor and outdoor spaces. Loved for its garden ceremony and fairy-light canopies.',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600',
    tags: ['Garden', 'Fairy Lights'], styles: ['Boho', 'Romantic'], available: false,
  },
]

// ─── Seed Polls ───────────────────────────────────────────────────────────────

export const SEED_POLLS: Poll[] = [
  {
    id: 'seed-1', authorName: 'Priya M.',
    question: 'Which lehenga silhouette for the main ceremony?',
    options: [
      { label: 'A-line flared', imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400' },
      { label: 'Straight fitted', imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400' },
    ],
    votes: { 0: 14, 1: 9 }, comments: [
      { id: 'c1', authorName: 'Ananya', text: 'A-line is so timeless.', createdAt: '2026-04-18T10:00:00Z' },
      { id: 'c2', authorName: 'Mehak',  text: 'Straight looks fab for an indoor venue.', createdAt: '2026-04-18T11:30:00Z' },
    ],
    tags: ['Outfits'], createdAt: '2026-04-18T09:00:00Z',
  },
  {
    id: 'seed-2', authorName: 'Shreya K.',
    question: 'Pastel florals or jewel-toned décor for the mandap?',
    options: [
      { label: 'Pastel florals', imageUrl: 'https://images.unsplash.com/photo-1519741347686-c1e331c20a2d?w=400' },
      { label: 'Jewel tones',    imageUrl: 'https://images.unsplash.com/photo-1606216794079-73b6c3a69f68?w=400' },
    ],
    votes: { 0: 22, 1: 11 }, comments: [
      { id: 'c3', authorName: 'Divya', text: 'Pastel all the way — so dreamy for photos.', createdAt: '2026-04-17T14:00:00Z' },
    ],
    tags: ['Décor'], createdAt: '2026-04-17T12:00:00Z',
  },
  {
    id: 'seed-3', authorName: 'Naina R.',
    question: 'Candid documentary or classic portrait photography?',
    options: [
      { label: 'Candid documentary', imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400' },
      { label: 'Classic portraits',  imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400' },
    ],
    votes: { 0: 31, 1: 8 }, comments: [
      { id: 'c4', authorName: 'Riya',   text: 'Candid wins. Those in-between moments are everything.', createdAt: '2026-04-16T08:00:00Z' },
      { id: 'c5', authorName: 'Sonali', text: 'We did both — totally worth the cost.', createdAt: '2026-04-16T09:00:00Z' },
    ],
    tags: ['Photography'], createdAt: '2026-04-16T07:00:00Z',
  },
]
