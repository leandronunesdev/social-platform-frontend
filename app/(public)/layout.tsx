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

  if (isChecking || isTokenValid()) {
    return null;
  }

  return <>{children}</>;
}
