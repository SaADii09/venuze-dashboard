export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-card p-6 shadow-sm">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-white rounded-card p-4 shadow-sm">
            <div className="h-48 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
