"use client";
import { SessionCard } from "@/components/common/SessionCard";
import { StatsCard } from "@/components/common/StatsCard";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Expert() {
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const handleStartVideoCall = () => {
    setIsVideoCallOpen(true);
  };
  return (
    <div>
      {" "}
      <div className="w-full flex gap-x-6 mt-5">
        <StatsCard title="Visios completées" value="78" className="w-full" />
        <StatsCard
          title="Résumer de gain"
          value="4 280"
          currency="€"
          className="w-full"
        />
      </div>
      <div className="lg:hidden w-[90%] mx-auto mt-5 bg-white rounded-[20px] border border-soft-ice-gray px-6">
        <div className="px-6 py-4 flex justify-center items-center gap-x-2">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Image
              src="/assets/icons/videorecord.svg"
              alt="search"
              width={26}
              height={26}
            />
            <span className="absolute top-1.5 right-0.5 pt-[1px] bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
              3
            </span>
          </button>
          <p className="text-sm font-bold font-figtree text-cobalt-blue-500">
            Demandes en attente
          </p>
          <Link
            href="/home/requests"
            className="flex items-center gap-2 text-black font-figtree"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <div className="hidden lg:flex w-full justify-between gap-2 mb-[10px] mt-[24px]">
        <h1 className="text-lg font-bold font-figtree text-cobalt-blue-500">
          Demandes en attente
        </h1>
        <Link
          href="/home/requests"
          className="flex items-center gap-2 text-cobalt-blue font-figtree"
        >
          Tout voir <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5">
        <SessionCard
          date="Aujourd'hui"
          time="10h30"
          profileImage="/assets/prof.jpg"
          name="Sarah Fills"
          sessionDescription="Session rapide de 30 minutes"
          onAccept={() => {}}
          onViewRequest={() => {}}
          isFlex1={true}
        />
        <SessionCard
          date="Aujourd'hui"
          time="10h30"
          profileImage="/assets/prof1.jpg"
          name="Sarah Fills"
          sessionDescription="Session rapide de 30 minutes"
          onAccept={() => {}}
          onViewRequest={() => {}}
          isFlex1={true}
        />
        <SessionCard
          date="Aujourd'hui"
          time="10h30"
          profileImage="/assets/prof2.jpg"
          name="Sarah Fills"
          sessionDescription="Session rapide de 30 minutes"
          onAccept={() => {}}
          onViewRequest={() => {}}
          isFlex1={true}
        />
      </div>
      <div className="w-full gap-2 mt-5">
        <h1 className="text-lg font-bold font-figtree text-cobalt-blue-500 mb-[11px] mt-[19px]">
          Prochaine visio
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <SessionCard
            date="Aujourd'hui"
            time="10h30"
            profileImage="/assets/prof.jpg"
            name="Sarah Fills"
            sessionDescription="Session rapide de 30 minutes"
            onAccept={handleStartVideoCall}
            onViewRequest={() => {}}
            isComming={true}
            duration="45mn"
            classFooter="!flex-col"
            textButton="Commencer la visio"
            icon="/assets/icons/videocamera.svg"
          />
          <SessionCard
            date="Aujourd'hui"
            time="10h30"
            profileImage="/assets/prof.jpg"
            name="Sarah Fills"
            sessionDescription="Session rapide de 30 minutes"
            onAccept={handleStartVideoCall}
            onViewRequest={() => {}}
            isComming={true}
            duration="45mn"
            classFooter="!flex-col"
            textButton="Commencer la visio"
            icon="/assets/icons/videocamera.svg"
          />
        </div>
      </div>
    </div>
  );
}
