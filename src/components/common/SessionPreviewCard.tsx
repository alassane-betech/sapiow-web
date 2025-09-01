"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";

interface SessionPreviewCardProps {
  date: string;
  time: string;
  visioDuration: string;
  participantName: string;
  participantAvatar: string;
  sessionDescription: string;
  className?: string;
}

export const SessionPreviewCard: React.FC<SessionPreviewCardProps> = ({
  date,
  time,
  visioDuration,
  participantName,
  participantAvatar,
  sessionDescription,
  className = "",
}) => {
  return (
    <div
      className={`w-full bg-soft-ice-gray rounded-lg border border-gray-200 p-4 ${className}`}
    >
      {/* En-tête avec date/heure et durée visio */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={20}
              height={20}
              className="text-gray-600"
            />
          </div>
          <span className="text-sm font-medium text-charcoal-blue font-figtree">
            {date.charAt(0).toUpperCase() + date.slice(1)}, {time}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <Image
              src="/assets/icons/clock.svg"
              alt="clock"
              width={20}
              height={20}
              className="text-gray-600"
            />
          </div>
          <span className="text-xs font-medium text-gunmetal-gray font-figtree">
            Visio de {visioDuration}
          </span>
        </div>
      </div>

      {/* Informations du participant */}
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12 border-2 border-gray-200">
          <AvatarImage 
            src={participantAvatar} 
            alt={participantName}
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-sm">
            {participantName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-bold text-gunmetal-gray mb-1 font-figtree">
            {participantName}
          </h3>
          <p className="text-xs text-bluish-gray font-medium font-figtree">
            {sessionDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
