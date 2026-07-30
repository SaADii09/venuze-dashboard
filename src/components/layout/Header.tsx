"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Venues", href: "/venues" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e9e9e9]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-dark-brown hidden sm:inline">venuze</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center bg-white border border-gray-200 rounded-button overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 px-4 py-2.5 border-r border-gray-200">
                <span className="text-dark-brown text-sm font-medium">London, UK</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 border-r border-gray-200">
                <span className="text-dark-brown text-sm font-medium">Anytime</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5">
                <span className="text-dark-brown text-sm font-medium">10-20 Guests</span>
              </div>
              <button className="flex items-center justify-center w-10 h-10 bg-primary-500 hover:bg-primary-600 transition-colors rounded-button m-0.5" aria-label="Search venues">
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/add-listing"
              className="flex items-center gap-2 border border-primary-500 rounded-button px-4 py-2 hover:bg-primary-50 transition-colors"
            >
              <span className="text-primary-500 text-sm font-semibold">Add your listing</span>
              <ChevronDownIcon className="w-4 h-4 text-primary-500" />
            </Link>
            <button className="flex items-center gap-1 border border-primary-500 rounded-button px-3 py-2 hover:bg-primary-50 transition-colors">
              <span className="text-primary-500 text-sm font-semibold">EN</span>
              <ChevronDownIcon className="w-4 h-4 text-primary-500" />
            </button>
            <Link
              href="/login"
              className="flex items-center justify-center w-10 h-10 border border-primary-500 rounded-button hover:bg-primary-50 transition-colors"
              aria-label="User account"
            >
              <UserCircleIcon className="w-6 h-6 text-primary-500" />
            </Link>
          </div>

          {/* Mobile - Compact Header with User */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href="/add-listing"
              className="flex items-center gap-1 border border-primary-500 rounded-button px-3 py-1.5 hover:bg-primary-50 transition-colors"
            >
              <span className="text-primary-500 text-xs font-semibold">Add your listing</span>
              <ChevronDownIcon className="w-3 h-3 text-primary-500" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="text-dark-brown hover:text-primary-500"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-4 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.href
                    ? "bg-primary-50 text-primary-500"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4 space-y-2">
              <Link
                href="/login"
                className="block text-center bg-primary-500 text-white py-2.5 rounded-button font-semibold hover:bg-primary-600 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
