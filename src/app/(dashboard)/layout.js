"use client";

import Sidebar from "@/components/Siderbar/Sidebar";
import { AuthContext } from "@/hooks/AuthProvider";
import { useContext } from "react";

export default function RootLayout({ children }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex gap-5">
      <Sidebar user={user} logout={logout} />
      <main className="container mx-auto">{children}</main>
    </div>
  );
}
