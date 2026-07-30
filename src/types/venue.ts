export interface Venue {
  id: number;
  name: string;
  description?: string;
  location: string;
  address?: string;
  city?: string;
  country?: string;
  capacity?: number;
  size?: number;
  price_per_hour?: number;
  currency?: string;
  images: string[];
  amenities?: string[];
  rating?: number;
  review_count?: number;
  verified?: boolean;
  parking?: string;
  category?: VenueCategory;
  created_at?: string;
  updated_at?: string;
}

export type VenueCategory =
  | "rooftop"
  | "gallery"
  | "restaurant"
  | "outdoor"
  | "studio"
  | "terrace"
  | "ballroom"
  | "celebration"
  | "private-party"
  | "corporate"
  | "creative-studio";

export interface VenueFilter {
  category?: VenueCategory;
  city?: string;
  capacity?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
}

export interface VenueSearchParams {
  query?: string;
  category?: VenueCategory;
  city?: string;
  guests?: number;
  date?: string;
  page?: number;
  limit?: number;
}
