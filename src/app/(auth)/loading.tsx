export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-dark-brown/60">Loading...</p>
      </div>
    </div>
  );
}
