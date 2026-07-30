import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-light-gray flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-dark-brown mb-2">
        Page not found
      </h2>
      <p className="text-dark-brown/60 mb-8 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-primary-500 text-white px-6 py-3 rounded-button font-semibold hover:bg-primary-600 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
