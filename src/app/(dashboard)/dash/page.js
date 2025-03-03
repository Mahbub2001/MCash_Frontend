"use client";
import { AuthContext } from "@/hooks/AuthProvider";
import React, { useContext } from "react";

function Dash() {
  const { user } = useContext(AuthContext);
  return (
    <div className="mt-10">
      {user?.role === "agent" && !user?.isApproved && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <p>You havent approved yet</p>
        </div>
      )}
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl">Welcome to Dashboard</h1>
      </div>
    </div>
  );
}

export default Dash;
