"use client";

import { useState } from "react";
import {
  MapPinIcon,
  UserGroupIcon,
  ShareIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export interface VenueCardProps {
  name: string;
  location: string;
  capacity: string;
  size: string;
  parking: string;
  more: string;
  price: string;
  verified: boolean;
  images: string[];
}

export function VenueCard({
  name,
  location,
  capacity,
  size,
  parking,
  more,
  price,
  verified,
  images,
}: VenueCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
      {/* Image Carousel */}
      <div className="relative h-[180px] sm:h-[200px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
          style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
        />
        {/* Verified Badge */}
        {verified && (
          <span className="absolute top-3 left-3 bg-white/90 text-dark-brown text-xs font-semibold px-3 py-1 rounded-pill">
            Verified
          </span>
        )}
        {/* Share & Heart */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors" aria-label="Share">
            <ShareIcon className="w-4 h-4 text-dark-brown" />
          </button>
          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors" aria-label="Save">
            <HeartIcon className="w-4 h-4 text-dark-brown" />
          </button>
        </div>
        {/* Carousel Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-4 h-4 text-dark-brown" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-4 h-4 text-dark-brown" />
            </button>
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-dark-brown mb-1 line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <MapPinIcon className="w-3 h-3 text-primary-500" />
          <span className="text-xs text-dark-brown/60">{location}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-dark-brown/50 mb-3">
          <span className="flex items-center gap-1">
            <UserGroupIcon className="w-3 h-3" />
            {capacity}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {size}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {parking}
          </span>
        </div>
        <span className="text-xs text-primary-500 font-medium">{more}</span>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-sm font-semibold text-dark-brown">
            From <span className="text-primary-500">{price}</span>
          </span>
          <span className="text-xs font-semibold text-primary-500 border border-primary-500 rounded-button px-3 py-1.5 hover:bg-primary-500 hover:text-white transition-colors cursor-pointer">
            View details
          </span>
        </div>
      </div>
    </div>
  );
}
