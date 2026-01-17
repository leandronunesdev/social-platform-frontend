"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasToken } from "@/lib/auth/token";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    if (!hasToken()) {
      router.push("/login");
    }
  }, [router]);

  if (!hasToken()) {
    return null;
  }

  return <>{children}</>;
}
