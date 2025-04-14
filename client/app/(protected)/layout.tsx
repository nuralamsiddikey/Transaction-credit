"use client";

import Header from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";

export default function ProtectedLayout({ children }: any) {
  return <ProtectedRoute>
      <Header />
    {children}</ProtectedRoute>;
}
