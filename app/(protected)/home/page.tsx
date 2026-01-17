"use client";

import { useRouter } from "next/navigation";
import AuthPage from "@/components/auth-page";
import { removeToken } from "@/lib/auth/token";

export default function HomePage() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <AuthPage>
      <div className="space-y-8">
        <p className="text-center">Something soon...</p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </AuthPage>
  );
}
