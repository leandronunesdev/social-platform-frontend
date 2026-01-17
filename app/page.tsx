"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasToken } from "@/lib/auth/token";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (hasToken()) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
}
