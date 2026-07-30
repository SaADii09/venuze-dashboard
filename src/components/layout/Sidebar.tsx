"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UsersIcon,
  XMarkIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon },
    { name: "Bookings", href: "/dashboard/bookings", icon: CalendarDaysIcon },
    { name: "Users", href: "/dashboard/users", icon: UsersIcon },
    { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Main navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-dark-brown transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <Link href="/dashboard" className="text-xl font-bold text-white">
              Venuze
            </Link>
            <button
              onClick={onClose}
              aria-label="Close sidebar"
              className="md:hidden text-white/70 hover:text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Dashboard navigation">
            {navigation.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard" || pathname === "/dashboard/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-button text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-500 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                  onClick={onClose}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-white/40 text-center">
              &copy; {new Date().getFullYear()} Venuze
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
