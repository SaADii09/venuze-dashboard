"use client";

import { useState, useCallback } from "react";
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
  "Office Space",
  "Meeting",
  "Private Party",
  "Villa",
  "Bar",
  "Loft",
  "Appartment",
  "Ballroom",
  "Restaurant",
  "Studio",
  "House",
  "Gallery",
  "test",
];

const eventTypes = [
  "Wedding",
  "Reception",
  "Ceremony",
  "Engagement",
  "Birthday",
  "Babyshower",
  "Concert/Performance",
  "Brand Launch",
  "Fashion Show",
  "Corporate Event",
  "Conference",
  "Pop-up",
];

interface DualRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  formatLabel?: (value: number) => string;
  "aria-label"?: string;
}

function DualRangeSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  formatLabel,
  "aria-label": ariaLabel,
}: DualRangeSliderProps) {
  const handleChange = useCallback(
    (index: 0 | 1, newValue: number) => {
      if (index === 0) {
        onChange([Math.min(newValue, value[1] - step), value[1]]);
      } else {
        onChange([value[0], Math.max(newValue, value[0] + step)]);
      }
    },
    [onChange, value, step]
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-dark-brown/60">
        <span>{formatLabel ? formatLabel(value[0]) : value[0]}</span>
        <span>{formatLabel ? formatLabel(value[1]) : value[1]}</span>
      </div>
      <div className="relative h-6 flex items-center" role="group" aria-label={ariaLabel}>
        <div className="absolute w-full h-1 bg-gray-200 rounded-lg" />
        <div
          className="absolute h-1 bg-primary-500 rounded-lg"
          style={{
            left: `${((value[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((value[1] - min) / (max - min)) * 100}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => handleChange(0, parseInt(e.target.value))}
          aria-label={`${ariaLabel} minimum`}
          className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => handleChange(1, parseInt(e.target.value))}
          aria-label={`${ariaLabel} maximum`}
          className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );
}

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
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Filters"
    >
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex min-h-full justify-end">
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-dark-brown dark:text-white">
              Filters
            </h2>
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="text-dark-brown/40 dark:text-gray-400 hover:text-dark-brown dark:hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Venue Type */}
            <div>
              <h3 className="text-lg font-semibold text-dark-brown dark:text-white mb-4">
                Venue Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {venueTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleVenueType(type)}
                    className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors ${
                      selectedVenueTypes.includes(type)
                        ? "bg-primary-500 text-white"
                        : "bg-light-gray dark:bg-gray-700 text-dark-brown dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Capacity */}
            <div>
              <h3 className="text-lg font-semibold text-dark-brown dark:text-white mb-2">
                Capacity
              </h3>
              <DualRangeSlider
                min={10}
                max={1500}
                value={capacity}
                onChange={setCapacity}
                aria-label="Capacity range"
              />
            </div>

            {/* Price per hour */}
            <div>
              <h3 className="text-lg font-semibold text-dark-brown dark:text-white mb-2">
                Price per hour (AED)
              </h3>
              <DualRangeSlider
                min={10}
                max={30000}
                value={priceRange}
                onChange={setPriceRange}
                formatLabel={(v) => `AED ${v.toLocaleString()}`}
                aria-label="Price range"
              />
            </div>

            {/* Event / Occasion */}
            <div>
              <h3 className="text-lg font-semibold text-dark-brown dark:text-white mb-4">
                Event / Occasion
              </h3>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleEventType(type)}
                    className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors ${
                      selectedEventTypes.includes(type)
                        ? "bg-primary-500 text-white"
                        : "bg-light-gray dark:bg-gray-700 text-dark-brown dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
                <h3 className="text-lg font-semibold text-dark-brown dark:text-white">
                  Verified Only
                </h3>
                <p className="text-sm text-dark-brown/60 dark:text-gray-400">
                  Show only verified venues
                </p>
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
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-4">
            <Button
              variant="secondary"
              onClick={handleClearAll}
              className="flex-1"
            >
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
