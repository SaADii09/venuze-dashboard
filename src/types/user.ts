export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  role?: UserRole;
  created_at?: string;
  updated_at?: string;
}

export type UserRole = "user" | "admin" | "vendor";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: User;
}

export interface UserProfile extends User {
  phone?: string;
  address?: string;
  bookings?: number;
  favoriteVenues?: number[];
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
