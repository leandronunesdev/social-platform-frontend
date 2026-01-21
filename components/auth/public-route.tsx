"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasToken } from "@/lib/auth/token";

type PublicRouteProps = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const router = useRouter();

  useEffect(() => {
    if (hasToken()) {
      router.push("/home");
    }
  }, [router]);

  if (hasToken()) {
    return null;
  }

  return <>{children}</>;
}
