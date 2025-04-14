"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function ProtectedRoute({ children }:any) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      router.push("/login");
    }
  }, [loading, router]);

  // Show nothing while checking authentication
  if (loading || !isAuthenticated()) {
    return <div>Loading...</div>;
  }

  // If authenticated, show the children components
  return children;
}