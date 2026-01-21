"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "@/lib/auth/token";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isTokenValid()) {
      router.replace("/home");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  // Don't render children while checking or if authenticated
  if (isChecking || isTokenValid()) {
    return null;
  }

  return <>{children}</>;
}
