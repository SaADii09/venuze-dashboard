"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DashboardPageHeader } from "@/components/layout/DashboardPageHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed";

interface Booking {
  id: string;
  venue: string;
  customer: string;
  date: string;
  time: string;
  guests: number;
  amount: string;
  status: BookingStatus;
}

const bookings: Booking[] = [
  {
    id: "BK-001",
    venue: "The Grand Ballroom",
    customer: "Alice Johnson",
    date: "2026-08-15",
    time: "18:00",
    guests: 150,
    amount: "£750",
    status: "confirmed",
  },
  {
    id: "BK-002",
    venue: "Rooftop Terrace",
    customer: "Bob Smith",
    date: "2026-08-18",
    time: "19:00",
    guests: 60,
    amount: "£300",
    status: "pending",
  },
  {
    id: "BK-003",
    venue: "Garden Pavilion",
    customer: "Carol White",
    date: "2026-08-20",
    time: "17:00",
    guests: 100,
    amount: "£400",
    status: "confirmed",
  },
  {
    id: "BK-004",
    venue: "Industrial Warehouse",
    customer: "David Brown",
    date: "2026-08-22",
    time: "20:00",
    guests: 200,
    amount: "£600",
    status: "pending",
  },
  {
    id: "BK-005",
    venue: "Beach Club",
    customer: "Eva Martinez",
    date: "2026-08-25",
    time: "16:00",
    guests: 80,
    amount: "£450",
    status: "confirmed",
  },
  {
    id: "BK-006",
    venue: "Art Gallery Space",
    customer: "Frank Lee",
    date: "2026-08-28",
    time: "19:30",
    guests: 50,
    amount: "£250",
    status: "cancelled",
  },
  {
    id: "BK-007",
    venue: "Cocktail Bar",
    customer: "Grace Kim",
    date: "2026-07-10",
    time: "21:00",
    guests: 35,
    amount: "£200",
    status: "completed",
  },
  {
    id: "BK-008",
    venue: "Seaside Loft",
    customer: "Henry Wang",
    date: "2026-07-05",
    time: "18:30",
    guests: 45,
    amount: "£350",
    status: "completed",
  },
];

const statusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const filters: BookingStatus[] = ["confirmed", "pending", "cancelled", "completed"];

export default function BookingsPage() {
  const [activeFilter, setActiveFilter] = useState<BookingStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter =
      activeFilter === "all" || booking.status === activeFilter;
    const matchesSearch =
      booking.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Bookings"
        description="Manage all venue bookings."
        action={
          <Button>
            <span className="mr-2">+</span>
            New Booking
          </Button>
        }
        stats={[
          { label: "Total", value: bookings.length },
          { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length },
          { label: "Pending", value: bookings.filter((b) => b.status === "pending").length },
          { label: "Cancelled", value: bookings.filter((b) => b.status === "cancelled").length },
        ]}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search bookings..."
            leftIcon={<MagnifyingGlassIcon className="h-5 w-5 text-dark-brown/40" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${
              activeFilter === "all"
                ? "bg-dark-brown text-white"
                : "bg-light-gray text-dark-brown hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-button text-sm font-medium capitalize transition-colors ${
                activeFilter === filter
                  ? "bg-dark-brown text-white"
                  : "bg-light-gray text-dark-brown hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-dark-brown/60 uppercase tracking-wider px-6 py-4">
                  Booking ID
                </th>
                <th className="text-left text-xs font-semibold text-dark-brown/60 uppercase tracking-wider px-6 py-4">
                  Venue
                </th>
                <th className="text-left text-xs font-semibold text-dark-brown/60 uppercase tracking-wider px-6 py-4">
                  Customer
                </th>
                <th className="text-left text-xs font-semibold text-dark-brown/60 uppercase tracking-wider px-6 py-4">
                  Date & Time
                </th>
                <th className="text-left text-xs font-semibold text-dark-brown/60 uppercase tracking-wider px-6 py-4">
                  Guests
                </th>
                <th className="text-left text-xs font-semibold text-dark-brown/60 uppercase tracking-wider px-6 py-4">
                  Amount
                </th>
                <th className="text-left text-xs font-semibold text-dark-brown/60 uppercase tracking-wider px-6 py-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-primary-500">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-dark-brown">
                    {booking.venue}
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-brown/70">
                    {booking.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-brown/70">
                    {booking.date} at {booking.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-brown/70">
                    {booking.guests}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-dark-brown">
                    {booking.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-pill text-xs font-medium capitalize ${statusStyles[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-dark-brown/60">No bookings found.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
