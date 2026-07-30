"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="min-h-[600px] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-3xl text-red-500">!</span>
        </div>
        <h1 className="text-xl font-semibold text-dark-brown mb-2">
          Dashboard Error
        </h1>
        <p className="text-dark-brown/60 mb-6">
          Something went wrong while loading the dashboard.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-primary-500 text-white rounded-button hover:bg-primary-600 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-2 border border-gray-300 rounded-button hover:bg-gray-50 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
