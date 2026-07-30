"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

export interface FilterState {
  venueTypes: string[];
  capacity: [number, number];
  priceRange: [number, number];
  eventTypes: string[];
  verifiedOnly: boolean;
}

const venueTypes = [
  "Office Space", "Meeting", "Private Party", "Villa",
  "Bar", "Loft", "Appartment", "Ballroom",
  "Restaurant", "Studio", "House", "Gallery", "test",
];

const eventTypes = [
  "Wedding", "Reception", "Ceremony",
  "Engagement", "Birthday", "Babyshower",
  "Concert/Performance", "Brand Launch",
  "Fashion Show", "Corporate Event", "Conference",
  "Pop-up",
];

export function FilterPopup({ isOpen, onClose, onApply }: FilterPopupProps) {
  const [selectedVenueTypes, setSelectedVenueTypes] = useState<string[]>([]);
  const [capacity, setCapacity] = useState<[number, number]>([10, 1500]);
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 30000]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const toggleVenueType = (type: string) => {
    setSelectedVenueTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleEventType = (type: string) => {
    setSelectedEventTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleClearAll = () => {
    setSelectedVenueTypes([]);
    setCapacity([10, 1500]);
    setPriceRange([10, 30000]);
    setSelectedEventTypes([]);
    setVerifiedOnly(false);
  };

  const handleApply = () => {
    onApply({
      venueTypes: selectedVenueTypes,
      capacity,
      priceRange,
      eventTypes: selectedEventTypes,
      verifiedOnly,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-label="Filters">
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} aria-hidden="true" />
      <div className="flex min-h-full justify-end">
        <div className="relative w-full max-w-md bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-dark-brown">Filters</h2>
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="text-dark-brown/40 hover:text-dark-brown transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Venue Type */}
            <div>
              <h3 className="text-lg font-semibold text-dark-brown mb-4">Venue Type</h3>
              <div className="flex flex-wrap gap-2">
                {venueTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleVenueType(type)}
                    className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors ${
                      selectedVenueTypes.includes(type)
                        ? "bg-primary-500 text-white"
                        : "bg-light-gray text-dark-brown hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Capacity */}
            <div>
              <h3 className="text-lg font-semibold text-dark-brown mb-2">Capacity</h3>
              <p className="text-sm text-dark-brown/60 mb-4">
                Showing venues for {capacity[0]} - {capacity[1]} guests
              </p>
              <div className="relative px-2">
                <input
                  type="range"
                  min={10}
                  max={1500}
                  value={capacity[0]}
                  onChange={(e) => setCapacity([parseInt(e.target.value), capacity[1]])}
                  className="absolute w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <input
                  type="range"
                  min={10}
                  max={1500}
                  value={capacity[1]}
                  onChange={(e) => setCapacity([capacity[0], parseInt(e.target.value)])}
                  className="absolute w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
              </div>
            </div>

            {/* Price per hour */}
            <div>
              <h3 className="text-lg font-semibold text-dark-brown mb-2">Price per hour (AED)</h3>
              <div className="flex justify-between text-sm text-dark-brown/60 mb-4">
                <span>AED {priceRange[0].toFixed(2)}</span>
                <span>AED {priceRange[1].toFixed(2)}</span>
              </div>
              <div className="relative px-2">
                <input
                  type="range"
                  min={10}
                  max={30000}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="absolute w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <input
                  type="range"
                  min={10}
                  max={30000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="absolute w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
              </div>
            </div>

            {/* Event / Occasion */}
            <div>
              <h3 className="text-lg font-semibold text-dark-brown mb-4">Event / Occasion</h3>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleEventType(type)}
                    className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors ${
                      selectedEventTypes.includes(type)
                        ? "bg-primary-500 text-white"
                        : "bg-light-gray text-dark-brown hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Only */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-dark-brown">Verified Only</h3>
                <p className="text-sm text-dark-brown/60">Show only verified venues</p>
              </div>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  verifiedOnly ? "bg-primary-500" : "bg-gray-300"
                }`}
                role="switch"
                aria-checked={verifiedOnly}
                aria-label="Verified only"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    verifiedOnly ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 flex gap-4">
            <Button variant="secondary" onClick={handleClearAll} className="flex-1">
              Clear All
            </Button>
            <Button onClick={handleApply} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
