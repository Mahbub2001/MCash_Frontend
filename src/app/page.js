"use client";
import { AuthContext } from "@/hooks/AuthProvider";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  // console.log("user", user);
  useEffect(() => {
    if (!loading) {
      if (user?._id) {
        router.push("/dash");
      } else {
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Redirecting...</div>;
}
