"use client";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { AppSidebar } from "@/components/layout/Sidebare";
import { useState } from "react";
import Client from "./home/Client";

export default function Home() {
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full">
        <HeaderClient />
        <div className="w-full flex-1 container px-5">
          {/* <Expert /> */}
          <Client />
        </div>
      </div>
    </div>
  );
}
