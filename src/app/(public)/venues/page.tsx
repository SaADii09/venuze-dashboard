"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  Squares2X2Icon,
  MapIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FilterPopup, type FilterState } from "@/components/ui/FilterPopup";
import { VenueCard } from "@/components/ui/VenueCard";

const categoryTabs = [
  { name: "All Spaces", icon: Squares2X2Icon },
  { name: "Photo Studio", icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
    </svg>
  )},
  { name: "Film Studio", icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125m1.5 3.75c-.621 0-1.125-.504-1.125-1.125" />
    </svg>
  )},
  { name: "Warehouse", icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  )},
  { name: "Gallery", icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  )},
  { name: "Restaurant", icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 11-6.99 0l-1.5-.75m4.5 1.875l-1.5.75a3.354 3.354 0 01-6.99 0l-1.5-.75M3.375 12h17.25" />
    </svg>
  )},
  { name: "Apartment", icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  )},
  { name: "Office Space", icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  )},
  { name: "Venue", icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0V6a3 3 0 013-3h3.75a3 3 0 013 3v3.349" />
    </svg>
  )},
  { name: "Private Party", icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  )},
  { name: "Meeting", icon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  )},
];

const activeFilters = ["Verified", "2,000+ m²", "10-20 guests", "Parking", "Kitchen"];

const venues = [
  { id: 1, name: "High-Spec Room in Trendy Home Clapham/ Stockwell", location: "London, SW1", capacity: "300+", size: "2,000 sq ft", parking: "Free parking", more: "+25 more", price: "$50/hour", verified: true, images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop"] },
  { id: 2, name: "High-Spec Room in Trendy Home Clapham/ Stockwell", location: "London, SW1", capacity: "300+", size: "2,000 sq ft", parking: "Free parking", more: "+25 more", price: "$50/hour", verified: true, images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop"] },
  { id: 3, name: "Downtown Loft", location: "New York, USA", capacity: "300+", size: "2,000 sq ft", parking: "Free parking", more: "+25 more", price: "$50/hour", verified: true, images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"] },
  { id: 4, name: "High-Spec Room in Trendy Home Clapham/ Stockwell", location: "London, SW1", capacity: "300+", size: "2,000 sq ft", parking: "Free parking", more: "+25 more", price: "$50/hour", verified: true, images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop"] },
  { id: 5, name: "High-Spec Room in Trendy Home Clapham/ Stockwell", location: "London, SW1", capacity: "300+", size: "2,000 sq ft", parking: "Free parking", more: "+25 more", price: "$50/hour", verified: true, images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop"] },
  { id: 6, name: "High-Spec Room in Trendy Home Clapham/ Stockwell", location: "London, SW1", capacity: "300+", size: "2,000 sq ft", parking: "Free parking", more: "+25 more", price: "$50/hour", verified: true, images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"] },
];

export default function VenuesPage() {
  const [activeCategory, setActiveCategory] = useState("Photo Studio");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      {/* Search Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-3 bg-light-gray rounded-button px-4 py-3">
              <MagnifyingGlassIcon className="w-5 h-5 text-dark-brown/40" />
              <input
                type="text"
                placeholder="Add keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-dark-brown placeholder:text-dark-brown/40 focus:outline-none"
              />
            </div>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 text-dark-brown hover:text-primary-500 transition-colors"
            >
              <span className="hidden sm:inline text-sm font-semibold">Filters</span>
              <FunnelIcon className="w-5 h-5" />
              <span className="w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">4</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            <button className="p-2 hover:bg-light-gray rounded-button transition-colors flex-shrink-0" aria-label="Previous">
              <ChevronLeftIcon className="w-5 h-5 text-dark-brown" />
            </button>
            {categoryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveCategory(tab.name)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-button min-w-[80px] flex-shrink-0 transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-500 border border-primary-500"
                      : "text-dark-brown/60 hover:bg-light-gray"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium whitespace-nowrap">{tab.name}</span>
                </button>
              );
            })}
            <button className="p-2 hover:bg-light-gray rounded-button transition-colors flex-shrink-0" aria-label="Next">
              <ChevronRightIcon className="w-5 h-5 text-dark-brown" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-dark-brown">
            3,456 <span className="font-semibold">photo studios</span> near London
          </p>
          <div className="flex items-center gap-4">
            {/* Active Filter Pills - Desktop */}
            <div className="hidden xl:flex items-center gap-2">
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="flex items-center gap-1 px-3 py-1 bg-light-gray rounded-pill text-xs text-dark-brown"
                >
                  {filter}
                  <XMarkIcon className="w-3 h-3 cursor-pointer hover:text-primary-500" />
                </span>
              ))}
              <span className="text-xs text-dark-brown/60">Sort by: Recommended</span>
            </div>
            <button
              onClick={() => setShowMap(!showMap)}
              className="flex items-center gap-2 border border-gray-200 rounded-button px-4 py-2 hover:bg-light-gray transition-colors"
            >
              <MapIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{showMap ? "Show List" : "Show Map"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 pb-12">
        <div className={`flex gap-6 ${showMap ? "lg:flex-row" : ""}`}>
          {/* Venue Cards */}
          <div className={showMap ? "lg:w-1/2" : "w-full"}>
            <div className={`grid gap-6 ${showMap ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
              {venues.map((venue) => (
                <VenueCard key={venue.id} name={venue.name} location={venue.location} capacity={venue.capacity} size={venue.size} parking={venue.parking} more={venue.more} price={venue.price} verified={venue.verified} images={venue.images} />
              ))}
            </div>
          </div>

          {/* Map View */}
          {showMap && (
            <div className="hidden lg:block lg:w-1/2">
              <div className="sticky top-[88px] h-[calc(100vh-120px)] bg-light-gray rounded-card overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-dark-brown/40">
                  <div className="text-center">
                    <MapIcon className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Map View</p>
                    <p className="text-xs">Interactive map would load here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {venues.length === 0 && (
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-16 text-center">
          <div className="w-48 h-48 mx-auto mb-6 relative">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <rect x="40" y="60" width="120" height="90" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" />
              <rect x="50" y="70" width="100" height="10" rx="2" fill="#d1d5db" />
              <rect x="50" y="90" width="60" height="6" rx="2" fill="#d1d5db" />
              <rect x="50" y="105" width="80" height="6" rx="2" fill="#d1d5db" />
              <circle cx="150" cy="80" r="20" fill="#fecaca" stroke="#f87171" strokeWidth="2" />
              <path d="M145 75 L155 85 M155 75 L145 85" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
              <path d="M30 170 L70 130" stroke="#f87171" strokeWidth="3" strokeLinecap="round" />
              <path d="M25 175 L35 165" stroke="#f87171" strokeWidth="3" strokeLinecap="round" />
              <rect x="60" y="140" width="80" height="20" rx="4" fill="#fecaca" />
              <text x="100" y="155" textAnchor="middle" fontSize="10" fill="#f87171" fontWeight="bold">NO DATA</text>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-dark-brown mb-2">No data found for your search.</h3>
          <p className="text-sm text-dark-brown/60 mb-6 max-w-sm mx-auto">
            Explore other options or clear filters to see more results.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All Spaces");
            }}
            className="text-primary-500 font-semibold text-sm hover:text-primary-600 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Filter Popup */}
      <FilterPopup
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(filters: FilterState) => {
          console.log("Applied filters:", filters);
        }}
      />
    </div>
  );
}
