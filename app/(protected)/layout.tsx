"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "@/lib/auth/token";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isTokenValid()) {
      router.replace("/login");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  // Don't render children while checking or if not authenticated
  if (isChecking || !isTokenValid()) {
    return null;
  }

  return <>{children}</>;
}
