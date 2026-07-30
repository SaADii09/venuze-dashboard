export default function PublicLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="h-[500px] bg-gray-200 animate-pulse" />
      
      {/* Content skeleton */}
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="h-8 w-96 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-card p-4 shadow-sm">
              <div className="h-48 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
