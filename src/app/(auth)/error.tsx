"use client";

import { useEffect } from "react";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Auth error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray p-4">
      <div className="max-w-md w-full bg-white rounded-card p-8 text-center shadow-sm">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-3xl text-red-500">!</span>
        </div>
        <h1 className="text-xl font-semibold text-dark-brown mb-2">
          Authentication Error
        </h1>
        <p className="text-dark-brown/60 mb-6">
          There was a problem with authentication. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-primary-500 text-white rounded-button hover:bg-primary-600 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
