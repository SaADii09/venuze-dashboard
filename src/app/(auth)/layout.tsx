import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Venuze",
  description: "Sign in to your Venuze account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-accent-beige flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-primary-500">
          Venuze
        </h1>
        <h2 className="mt-2 text-center text-xl text-dark-brown">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-card sm:rounded-card sm:px-10" role="main" id="main-content">
          {children}
        </div>
      </div>
    </div>
  );
}
