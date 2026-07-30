"use client";

import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/Card";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { name: "Total Venues", value: "1,234", change: "+12%", positive: true },
    { name: "Bookings", value: "567", change: "+23%", positive: true },
    { name: "Revenue", value: "$45,678", change: "+8%", positive: true },
    { name: "Conversion", value: "3.2%", change: "-2%", positive: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-brown">
          Welcome back, {user?.first_name || "User"}!
        </h1>
        <p className="text-dark-brown/60 mt-1">
          Here&apos;s what&apos;s happening with your venues today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent>
              <p className="text-sm text-dark-brown/60">{stat.name}</p>
              <p className="text-2xl font-bold text-dark-brown mt-1">
                {stat.value}
              </p>
              <p
                className={`text-sm mt-2 font-medium ${
                  stat.positive ? "text-green-600" : "text-red-500"
                }`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-dark-brown mb-4">
            Recent Bookings
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-sm">
                      V{i}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-brown">
                      Venue Booking #{i}
                    </p>
                    <p className="text-xs text-dark-brown/50">
                      Customer {i} &middot; 2 hours ago
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-pill text-xs font-medium ${
                    i % 3 === 0
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {i % 3 === 0 ? "Pending" : "Confirmed"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
