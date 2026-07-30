"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DashboardPageHeader } from "@/components/layout/DashboardPageHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface User {
  id: string;
  name: string;
  email: string;
  role: "host" | "guest" | "admin";
  venues: number;
  joinDate: string;
  status: "active" | "inactive";
}

const users: User[] = [
  {
    id: "USR-001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "host",
    venues: 5,
    joinDate: "2024-03-15",
    status: "active",
  },
  {
    id: "USR-002",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "host",
    venues: 3,
    joinDate: "2024-05-22",
    status: "active",
  },
  {
    id: "USR-003",
    name: "Emma Williams",
    email: "emma@example.com",
    role: "guest",
    venues: 0,
    joinDate: "2024-07-10",
    status: "active",
  },
  {
    id: "USR-004",
    name: "James Brown",
    email: "james@example.com",
    role: "host",
    venues: 8,
    joinDate: "2024-01-08",
    status: "active",
  },
  {
    id: "USR-005",
    name: "Olivia Davis",
    email: "olivia@example.com",
    role: "guest",
    venues: 0,
    joinDate: "2024-09-18",
    status: "inactive",
  },
  {
    id: "USR-006",
    name: "William Taylor",
    email: "william@example.com",
    role: "host",
    venues: 2,
    joinDate: "2024-11-05",
    status: "active",
  },
  {
    id: "USR-007",
    name: "Sophie Anderson",
    email: "sophie@example.com",
    role: "admin",
    venues: 0,
    joinDate: "2024-02-20",
    status: "active",
  },
  {
    id: "USR-008",
    name: "Thomas Wilson",
    email: "thomas@example.com",
    role: "guest",
    venues: 0,
    joinDate: "2025-01-12",
    status: "active",
  },
];

const roleStyles: Record<string, string> = {
  host: "bg-primary-100 text-primary-700",
  guest: "bg-blue-100 text-blue-700",
  admin: "bg-purple-100 text-purple-700",
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Users"
        description="Manage platform users and hosts."
        action={
          <Button>
            <span className="mr-2">+</span>
            Add User
          </Button>
        }
        stats={[
          { label: "Total Users", value: users.length },
          { label: "Hosts", value: users.filter((u) => u.role === "host").length },
          { label: "Guests", value: users.filter((u) => u.role === "guest").length },
          { label: "Active", value: users.filter((u) => u.status === "active").length },
        ]}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search users..."
            leftIcon={<MagnifyingGlassIcon className="h-5 w-5 text-dark-brown/40" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["all", "host", "guest", "admin"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-4 py-2 rounded-button text-sm font-medium capitalize transition-colors ${
                roleFilter === role
                  ? "bg-dark-brown text-white"
                  : "bg-light-gray text-dark-brown hover:bg-gray-200"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-600">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-dark-brown text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-dark-brown/50">{user.email}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-pill text-xs font-medium capitalize ${roleStyles[user.role]}`}
                >
                  {user.role}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-brown/60">
                  {user.venues} venue{user.venues !== 1 ? "s" : ""}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    user.status === "active" ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              </div>
              <p className="text-xs text-dark-brown/40 mt-2">
                Joined {user.joinDate}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-dark-brown/60">No users found.</p>
        </div>
      )}
    </div>
  );
}
