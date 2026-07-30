"use client";

import { Card, CardContent } from "@/components/ui/Card";

const metrics = [
  {
    label: "Total Revenue",
    value: "$124,563",
    change: "+12.5%",
    positive: true,
    period: "vs last month",
  },
  {
    label: "Total Bookings",
    value: "1,845",
    change: "+8.2%",
    positive: true,
    period: "vs last month",
  },
  {
    label: "Active Venues",
    value: "342",
    change: "+5.1%",
    positive: true,
    period: "vs last month",
  },
  {
    label: "Avg. Rating",
    value: "4.7",
    change: "+0.3",
    positive: true,
    period: "vs last month",
  },
];

const revenueData = [
  { month: "Jan", revenue: 8200, bookings: 120 },
  { month: "Feb", revenue: 9100, bookings: 135 },
  { month: "Mar", revenue: 11400, bookings: 168 },
  { month: "Apr", revenue: 10800, bookings: 155 },
  { month: "May", revenue: 13200, bookings: 192 },
  { month: "Jun", revenue: 14500, bookings: 210 },
  { month: "Jul", revenue: 15800, bookings: 228 },
  { month: "Aug", revenue: 14200, bookings: 205 },
  { month: "Sep", revenue: 16100, bookings: 235 },
  { month: "Oct", revenue: 17500, bookings: 252 },
  { month: "Nov", revenue: 15900, bookings: 230 },
  { month: "Dec", revenue: 18200, bookings: 265 },
];

const topVenues = [
  { name: "The Grand Ballroom", bookings: 89, revenue: "$44,500" },
  { name: "Rooftop Terrace", bookings: 76, revenue: "$22,800" },
  { name: "Garden Pavilion", bookings: 68, revenue: "$27,200" },
  { name: "Industrial Warehouse", bookings: 54, revenue: "$32,400" },
  { name: "Beach Club", bookings: 47, revenue: "$21,150" },
];

const recentActivity = [
  {
    type: "booking",
    message: "New booking for The Grand Ballroom",
    time: "2 minutes ago",
  },
  {
    type: "review",
    message: "New 5-star review on Rooftop Terrace",
    time: "15 minutes ago",
  },
  {
    type: "venue",
    message: "New venue added: Sunset Lounge",
    time: "1 hour ago",
  },
  {
    type: "booking",
    message: "Booking confirmed for Garden Pavilion",
    time: "2 hours ago",
  },
  {
    type: "user",
    message: "New host registered: Emily Carter",
    time: "3 hours ago",
  },
];

export default function AnalyticsPage() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-brown">Analytics</h1>
        <p className="text-dark-brown/60 mt-1">
          Overview of your platform performance.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent>
              <p className="text-sm text-dark-brown/60">{metric.label}</p>
              <p className="text-2xl font-bold text-dark-brown mt-1">
                {metric.value}
              </p>
              <p
                className={`text-sm mt-2 font-medium ${
                  metric.positive ? "text-green-600" : "text-red-500"
                }`}
              >
                {metric.change} {metric.period}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-dark-brown mb-6">
            Revenue Overview
          </h2>
          <div className="flex items-end gap-2 h-[250px]">
            {revenueData.map((data) => (
              <div
                key={data.month}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className="w-full bg-primary-500 rounded-t-sm transition-all hover:bg-primary-600"
                  style={{
                    height: `${(data.revenue / maxRevenue) * 200}px`,
                  }}
                />
                <span className="text-xs text-dark-brown/60 mt-2">
                  {data.month}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Venues */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-dark-brown mb-4">
              Top Venues
            </h2>
            <div className="space-y-3">
              {topVenues.map((venue, i) => (
                <div
                  key={venue.name}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary-500 w-6">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-dark-brown">
                      {venue.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-dark-brown">
                      {venue.revenue}
                    </p>
                    <p className="text-xs text-dark-brown/50">
                      {venue.bookings} bookings
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-dark-brown mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === "booking"
                        ? "bg-green-500"
                        : activity.type === "review"
                          ? "bg-accent-yellow"
                          : activity.type === "venue"
                            ? "bg-primary-500"
                            : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm text-dark-brown">{activity.message}</p>
                    <p className="text-xs text-dark-brown/50">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
