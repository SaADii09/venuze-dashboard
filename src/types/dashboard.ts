export interface DashboardStats {
  totalVenues: number;
  totalBookings: number;
  totalUsers: number;
  totalRevenue: number;
  monthlyBookings: number;
  monthlyRevenue: number;
  averageRating: number;
  occupancyRate: number;
}

export interface DashboardChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export interface RecentActivity {
  id: number;
  type: ActivityType;
  description: string;
  timestamp: string;
  user?: string;
  venue?: string;
  amount?: number;
}

export type ActivityType =
  | "booking_created"
  | "booking_confirmed"
  | "booking_cancelled"
  | "user_registered"
  | "venue_added"
  | "payment_received";

export interface DashboardData {
  stats: DashboardStats;
  chartData: DashboardChartData;
  recentActivity: RecentActivity[];
}
