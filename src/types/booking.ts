import type { Venue } from "./venue";
import type { User } from "./user";

export interface Booking {
  id: number;
  venue?: Venue;
  user?: User;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  guests: number;
  total_amount?: number;
  currency?: string;
  status: BookingStatus;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface BookingFilter {
  status?: BookingStatus;
  venueId?: number;
  startDate?: string;
  endDate?: string;
}

export interface CreateBookingRequest {
  venue_id: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  guests: number;
  notes?: string;
}
