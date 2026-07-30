"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/useAuth";

interface TopNavProps {
  onMenuClick: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 md:px-6 transition-colors">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="md:hidden text-dark-brown dark:text-white hover:text-primary-500 mr-4"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-dark-brown dark:text-white">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          aria-label="Notifications"
          className="text-dark-brown/60 dark:text-gray-400 hover:text-primary-500 relative transition-colors"
        >
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-primary-500 rounded-full" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="User menu"
            aria-expanded={showDropdown}
            aria-haspopup="true"
            className="flex items-center space-x-2 text-dark-brown/70 dark:text-gray-300 hover:text-dark-brown dark:hover:text-white transition-colors"
          >
            <UserCircleIcon className="h-8 w-8" />
            <span className="hidden md:block text-sm font-medium">
              {user?.first_name || "User"}
            </span>
          </button>

          {showDropdown && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-card shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
              role="menu"
              aria-label="User menu"
            >
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-semibold text-dark-brown dark:text-white">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-dark-brown/50 dark:text-gray-400 mt-0.5">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={logout}
                role="menuitem"
                className="w-full text-left px-4 py-2.5 text-sm text-dark-brown dark:text-gray-300 hover:bg-accent-beige dark:hover:bg-gray-700 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
