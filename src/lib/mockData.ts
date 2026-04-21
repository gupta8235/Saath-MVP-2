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
// 12 Indian wedding images, 3 per style archetype

export const STYLE_IMAGES: StyleImage[] = [
  // Festive — marigolds, haldi, turmeric, vibrant colour
  {
    id: 'f1', style: 'Festive',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&h=900&fit=crop',
    caption: 'Marigold haldi setup with cascading floral arch',
  },
  {
    id: 'f2', style: 'Festive',
    url: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=700&h=900&fit=crop',
    caption: 'Intricate mehndi with haldi-yellow accents',
  },
  {
    id: 'f3', style: 'Festive',
    url: 'https://images.unsplash.com/photo-1617195920950-1145bf9a9c72?w=700&h=900&fit=crop',
    caption: 'Outdoor haldi with marigold chandelier and diyas',
  },

  // Garden — lush mehndi garden, florals, open skies
  {
    id: 'g1', style: 'Garden',
    url: 'https://images.unsplash.com/photo-1519741347686-c1e331c20a2d?w=700&h=900&fit=crop',
    caption: 'Lush mehndi garden with climbing rose archway',
  },
  {
    id: 'g2', style: 'Garden',
    url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=700&h=900&fit=crop',
    caption: 'Intimate mehndi canopy with fairy lights and florals',
  },
  {
    id: 'g3', style: 'Garden',
    url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&h=900&fit=crop',
    caption: 'Open-air sangeet under golden evening light',
  },

  // Palatial — Rajasthan, heritage, jewel tones, grandeur
  {
    id: 'p1', style: 'Palatial',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&h=900&fit=crop',
    caption: 'Ornate mandap draped in gold with jewel-toned textiles',
  },
  {
    id: 'p2', style: 'Palatial',
    url: 'https://images.unsplash.com/photo-1606216794079-73b6c3a69f68?w=700&h=900&fit=crop',
    caption: 'Rajasthan haveli reception with floral columns',
  },
  {
    id: 'p3', style: 'Palatial',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=900&fit=crop',
    caption: 'Palace venue with lake view and candlelit courtyard',
  },

  // Modern — white mandaps, champagne florals, editorial luxury
  {
    id: 'm1', style: 'Modern',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=900&fit=crop',
    caption: 'All-white mandap with sculptural floral columns',
  },
  {
    id: 'm2', style: 'Modern',
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=700&h=900&fit=crop',
    caption: 'Minimalist reception with champagne and sage palette',
  },
  {
    id: 'm3', style: 'Modern',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&h=900&fit=crop',
    caption: 'Contemporary sangeet with sculptural lighting',
  },
]

// ─── Style Archetypes ─────────────────────────────────────────────────────────

export const STYLE_PROFILES = {
  Festive: {
    label: 'Festive & Vibrant',
    description: 'Bold, joyful, and alive with colour. You are drawn to turmeric yellows, cascading marigolds, and a celebration that fills every sense — the scent of jasmine, the warmth of diyas, the energy of a dance floor full of family.',
    palette: ['Marigold Yellow', 'Saffron', 'Coral Orange', 'Fresh Green'],
    paletteHex: ['#F5A623', '#E8612C', '#D95F3B', '#4A7C59'],
    flowers: ['Marigolds', 'Roses', 'Jasmine strings', 'Tuberose', 'Chrysanthemum'],
    lighting: 'Warm Edison bulbs, clay diyas, amber string lights strung overhead',
    mandapStyle: 'Chhatri-style mandap draped in marigold garlands, banana leaf floor, brass urlis filled with petals',
    tableStyle: 'Terracotta pots with wildflowers, block-printed tablecloths, brass thali centrepieces',
    events: {
      haldi: 'Outdoor marigold arch over a raised platform. Turmeric stations in brass vessels. Wicker baskets of petals for guests to shower the couple.',
      mehndi: 'Colourful tent with pom-pom hangings, block-printed floor cushions, henna cones on banana leaves, and a live dhol player.',
      sangeet: 'Warm fairy-light canopy, vintage brass lanterns, flower walls in marigold and roses, low seating with mirrorwork cushions.',
      ceremony: 'Traditional rangoli entry, marigold phoolon ki chadar, aisle lined with diyas, priest performing with brass accessories.',
    },
  },
  Garden: {
    label: 'Garden Romance',
    description: 'Lush, intimate, and florally abundant. You dream of open skies, climbing roses, and a mehndi ceremony held in a garden so overgrown with flowers it feels like another world entirely.',
    palette: ['Dusty Rose', 'Sage Green', 'Blush', 'Antique Gold'],
    paletteHex: ['#C9778A', '#7A9E7E', '#F2C4CE', '#C9A96E'],
    flowers: ['Garden roses', 'Peonies', 'Sweetpeas', 'Jasmine', 'Baby\'s breath'],
    lighting: 'Draped fairy lights, paper lanterns, soft candlelight, hanging Edison bulbs',
    mandapStyle: 'Organic floral arch with trailing greenery, white and blush roses, linen draping, no hard lines',
    tableStyle: 'Wildflower arrangements in bud vases, linen napkins, moss table runners, mismatched candle heights',
    events: {
      haldi: 'Garden setting on a lawn with a jasmine flower-strewn stage. Guests seated on pastel floor cushions. Brass pots of haldi arranged as décor.',
      mehndi: 'Flower-ceiling installation in dusty rose and green. Arch entry draped in peonies. Low wooden tables with flower garland centrepieces.',
      sangeet: 'Fairy-light canopy over an outdoor dance floor. Floral photo wall. Tables set with bud vases and pillar candles.',
      ceremony: 'Petal aisle leading to a rose-and-greenery archway mandap. Soft draping overhead, breeze in the fabric, golden hour light.',
    },
  },
  Palatial: {
    label: 'Heritage Palatial',
    description: 'Grand, opulent, and steeped in culture. You want Rajasthan architecture, jewel-toned textiles, and a venue that makes every guest feel they have stepped into a page of history.',
    palette: ['Deep Crimson', 'Royal Gold', 'Midnight Blue', 'Ivory'],
    paletteHex: ['#8B1A1A', '#B8965C', '#1A237E', '#FAF7F0'],
    flowers: ['Red roses', 'Marigolds', 'Mogra', 'Orchids', 'Carnations'],
    lighting: 'Crystal chandeliers, cluster of hanging diyas, coloured glass lanterns, warm uplighting on heritage walls',
    mandapStyle: 'Grand chhatri mandap with carved wooden pillars, red and gold draping, fresh rose garlands, floral floor art',
    tableStyle: 'Dark wood tables, tall floral arrangements, gold candlesticks, coloured glassware, embroidered table runners',
    events: {
      haldi: 'Courtyard of a haveli with yellow marigold arches. Guests under ornate jharokha windows. Traditional brass band welcome.',
      mehndi: 'Fort terrace at sunset. Jewel-toned tent draping, mirrorwork walls, lanterns, floor seating on silk cushions.',
      sangeet: 'Palace ballroom with crystal chandeliers. Dance floor surrounded by tall red rose arrangements. Live folk musicians.',
      ceremony: 'Heritage venue mandap with carved marble platform. Priest under a gold-fringed canopy. Conch shells, priest chants echoing off stone walls.',
    },
  },
  Modern: {
    label: 'Contemporary Luxe',
    description: 'Clean, intentional, and quietly luxurious. You want a white mandap, champagne florals, and every detail chosen with precision — a wedding that feels like a fashion editorial brought to life.',
    palette: ['Ivory White', 'Champagne', 'Blush', 'Sage'],
    paletteHex: ['#FAF8F5', '#D4A96A', '#F2C4CE', '#8A9E8A'],
    flowers: ['White orchids', 'Blush roses', 'Eucalyptus', 'Anthurium', 'Baby\'s breath'],
    lighting: 'Warm pin-spot lighting, candles in glass cylinders, minimal neon, warm white uplighting',
    mandapStyle: 'Clean-lined white mandap with sculptural floral columns, champagne drapery, no clutter, architectural silhouette',
    tableStyle: 'White tablecloths, tall glass vases with white florals, gold cutlery, geometric candle holders',
    events: {
      haldi: 'Minimalist haldi setup with a white and yellow palette — yellow florals against a white draped stage. Simple marigold garlands for guests.',
      mehndi: 'All-white draped tent with a pink floral ceiling installation. Low white tables with blush rose arrangements. Clean typography signage.',
      sangeet: 'Contemporary venue with DJ setup, white draping, LED lighting in warm gold, a clear photo booth with floral frame.',
      ceremony: 'White mandap with clean columns of white and blush flowers. Linen aisle runner. Minimal rangoli in pastel colours.',
    },
  },
}

// ─── Vendors ─────────────────────────────────────────────────────────────────

export const VENDORS: Vendor[] = [
  {
    id: 'v1', name: 'Frosted Frames', category: 'Photographer', location: 'Mumbai',
    priceRange: '₹2.5L–₹4L', rating: 4.9, reviewCount: 84,
    description: 'Award-winning candid wedding photographers. Cinematic storytelling for contemporary South Asian weddings.',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600',
    tags: ['Candid', 'Cinematic'], styles: ['Modern', 'Garden'], available: true,
  },
  {
    id: 'v2', name: 'Ishq Stories', category: 'Photographer', location: 'Delhi',
    priceRange: '₹1.8L–₹3L', rating: 4.7, reviewCount: 112,
    description: 'Storytelling through light and emotion. Drone coverage, same-day edits, rich heritage venue specialists.',
    imageUrl: 'https://images.unsplash.com/photo-1519741347686-c1e331c20a2d?w=600',
    tags: ['Drone', 'Heritage'], styles: ['Palatial', 'Garden'], available: true,
  },
  {
    id: 'v3', name: 'Gulmohar Studio', category: 'Decorator', location: 'Jaipur',
    priceRange: '₹5L–₹12L', rating: 4.8, reviewCount: 56,
    description: 'Floral design house known for ceiling installations and lush mandap arrangements. Featured in Vogue Weddings.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600',
    tags: ['Floral', 'Ceiling Installs'], styles: ['Garden', 'Palatial'], available: true,
  },
  {
    id: 'v4', name: 'Noor Décor', category: 'Decorator', location: 'Mumbai',
    priceRange: '₹3L–₹7L', rating: 4.6, reviewCount: 73,
    description: 'Intimate events specialists. Marigold, jasmine, and fairy-light aesthetics with a warm festive touch.',
    imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600',
    tags: ['Intimate', 'Marigold'], styles: ['Festive', 'Garden'], available: false,
  },
  {
    id: 'v5', name: 'Annapurna Catering', category: 'Caterer', location: 'Delhi',
    priceRange: '₹1,200–₹2,200 / plate', rating: 4.7, reviewCount: 145,
    description: 'Pan-India menu specialists with live chaat counters, regional thali stations, and impeccable hygiene ratings.',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600',
    tags: ['Live Counters', 'Regional'], styles: ['Festive', 'Garden', 'Modern'], available: true,
  },
  {
    id: 'v6', name: 'Nawabi Dawat', category: 'Caterer', location: 'Lucknow',
    priceRange: '₹1,800–₹3,500 / plate', rating: 4.9, reviewCount: 61,
    description: 'Authentic Awadhi and Mughlai cuisine. Dum biryani, kebabs, and dessert stations that guests remember for years.',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600',
    tags: ['Mughlai', 'Premium'], styles: ['Palatial'], available: true,
  },
  {
    id: 'v7', name: 'Henna by Zara', category: 'Mehendi Artist', location: 'Mumbai',
    priceRange: '₹25K–₹60K', rating: 4.9, reviewCount: 203,
    description: 'Intricate bridal mehendi with hidden motifs and dulha portraits. Booked 6 months in advance on average.',
    imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=600',
    tags: ['Bridal', 'Intricate'], styles: ['Festive', 'Palatial', 'Garden', 'Modern'], available: true,
  },
  {
    id: 'v8', name: 'Aarohi Bridal', category: 'Makeup Artist', location: 'Delhi',
    priceRange: '₹30K–₹80K', rating: 4.8, reviewCount: 176,
    description: 'HD bridal makeup and airbrush foundation. Team of 3 for quick turnarounds on big wedding days.',
    imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600',
    tags: ['HD Makeup', 'Airbrush'], styles: ['Modern', 'Palatial', 'Garden'], available: true,
  },
  {
    id: 'v9', name: 'The Leela Palace', category: 'Venue', location: 'Udaipur',
    priceRange: '₹25L–₹60L', rating: 4.9, reviewCount: 38,
    description: 'Lakeside palace with 5-star hospitality. Rooftop ceremonies and full wedding weekend packages.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    tags: ['Palace', 'Lakeside'], styles: ['Palatial'], available: true,
  },
  {
    id: 'v10', name: 'Fern & Willow Farmhouse', category: 'Venue', location: 'Gurgaon',
    priceRange: '₹8L–₹18L', rating: 4.7, reviewCount: 55,
    description: '3-acre farmhouse with indoor and outdoor spaces. Loved for its garden ceremonies and fairy-light canopies.',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600',
    tags: ['Garden', 'Farmhouse'], styles: ['Garden', 'Festive'], available: false,
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
    question: 'Marigold haldi or white-and-blush haldi setup?',
    options: [
      { label: 'Marigold & turmeric', imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400' },
      { label: 'White & blush modern', imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400' },
    ],
    votes: { 0: 31, 1: 8 }, comments: [
      { id: 'c3', authorName: 'Divya', text: 'Marigold is just *it* for haldi — so authentic!', createdAt: '2026-04-17T14:00:00Z' },
      { id: 'c4', authorName: 'Riya', text: 'White haldi is so fresh and editorial though.', createdAt: '2026-04-17T15:00:00Z' },
    ],
    tags: ['Décor', 'Haldi'], createdAt: '2026-04-17T12:00:00Z',
  },
  {
    id: 'seed-3', authorName: 'Naina R.',
    question: 'Candid documentary or classic portrait photography?',
    options: [
      { label: 'Candid documentary', imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400' },
      { label: 'Classic portraits',  imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400' },
    ],
    votes: { 0: 31, 1: 8 }, comments: [
      { id: 'c5', authorName: 'Sonali', text: 'Candid wins. Those in-between moments are everything.', createdAt: '2026-04-16T08:00:00Z' },
      { id: 'c6', authorName: 'Mehak', text: 'We did both — totally worth the cost.', createdAt: '2026-04-16T09:00:00Z' },
    ],
    tags: ['Photography'], createdAt: '2026-04-16T07:00:00Z',
  },
]
