"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import React from "react";



export default function Header() {
  const {logout} = useAuth();
  return (
    <div className="bg-black py-5 text-white px-50 flex justify-between items-center">
      <h3>Coderammer</h3>
      <Button onClick={logout} className="cursor-pointer">Logout</Button>
    </div>
  );
}
