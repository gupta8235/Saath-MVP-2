'use client'

import Image from 'next/image'
import { Star, MapPin, Bookmark } from 'lucide-react'
import type { Vendor } from '@/lib/types'

interface Props {
  vendor: Vendor
}

export default function VendorCard({ vendor }: Props) {
  return (
    <article className="card overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-200">

      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={vendor.imageUrl}
          alt={vendor.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, 300px"
        />
        {/* Availability badge */}
        <div className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full
          ${vendor.available ? 'bg-white text-bark' : 'bg-bark/70 text-white'}`}>
          {vendor.available ? '✓ Available' : 'Booked out'}
        </div>
        {/* Category chip */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-bark text-[10px] font-semibold px-2.5 py-1 rounded-full">
          {vendor.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 space-y-2.5">

        {/* Name + Location */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-base text-bark leading-tight">{vendor.name}</h3>
          <button className="text-mauve hover:text-rose transition-colors flex-shrink-0 mt-0.5" title="Save vendor">
            <Bookmark size={15} />
          </button>
        </div>

        <div className="flex items-center gap-1 text-xs text-mauve">
          <MapPin size={11} />
          {vendor.location}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(vendor.rating) ? 'text-gold fill-gold' : 'text-mauve/30'}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-bark">{vendor.rating}</span>
          <span className="text-xs text-mauve">({vendor.reviewCount} reviews)</span>
        </div>

        {/* Price range */}
        <p className="text-xs font-semibold text-rose">{vendor.priceRange}</p>

        {/* Description */}
        <p className="text-xs text-bark/70 leading-relaxed line-clamp-2 flex-1">
          {vendor.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {vendor.tags.slice(0, 3).map(t => (
            <span key={t} className="tag text-[10px] py-0.5">{t}</span>
          ))}
        </div>

        {/* CTA */}
        <button
          disabled={!vendor.available}
          className={`mt-auto w-full text-xs py-2 rounded-full font-medium transition-all
            ${vendor.available
              ? 'btn-primary text-center'
              : 'bg-blush text-mauve cursor-not-allowed'
            }`}
        >
          {vendor.available ? 'Enquire now' : 'Join waitlist'}
        </button>
      </div>
    </article>
  )
}
