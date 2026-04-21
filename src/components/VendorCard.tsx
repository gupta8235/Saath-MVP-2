'use client'

import Image from 'next/image'
import { Star, MapPin, Bookmark } from 'lucide-react'
import type { Vendor } from '@/lib/types'

interface Props { vendor: Vendor }

export default function VendorCard({ vendor }: Props) {
  return (
    <article className="card overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300">

      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-petal">
        <Image src={vendor.imageUrl} alt={vendor.name} fill
          className="object-cover group-hover:scale-103 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, 300px" />
        <div className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm
          ${vendor.available ? 'bg-white text-bark' : 'bg-bark/60 text-white'}`}>
          {vendor.available ? 'Available' : 'Waitlist'}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-bark text-xs font-medium px-2.5 py-1 rounded-full">
          {vendor.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg text-bark leading-tight">{vendor.name}</h3>
          <button className="text-mauve hover:text-bark transition-colors flex-shrink-0 mt-0.5">
            <Bookmark size={15} />
          </button>
        </div>

        <div className="flex items-center gap-1 text-xs text-mauve">
          <MapPin size={11} />{vendor.location}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11}
                className={i < Math.floor(vendor.rating) ? 'text-gold fill-gold' : 'text-petal'} />
            ))}
          </div>
          <span className="text-xs font-medium text-bark">{vendor.rating}</span>
          <span className="text-xs text-mauve">({vendor.reviewCount})</span>
        </div>

        <p className="text-sm font-medium text-bark">{vendor.priceRange}</p>

        <p className="text-xs text-mauve leading-relaxed line-clamp-2 flex-1">
          {vendor.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-1">
          {vendor.tags.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <button disabled={!vendor.available}
          className={`w-full text-xs py-2.5 rounded-full font-medium tracking-wide transition-all
            ${vendor.available ? 'btn-primary text-center' : 'bg-petal text-mauve cursor-not-allowed'}`}>
          {vendor.available ? 'Enquire' : 'Join waitlist'}
        </button>
      </div>
    </article>
  )
}
