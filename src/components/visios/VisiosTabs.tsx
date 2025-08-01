"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import CustomCalendar from "../common/CustomCalendar";
import { SessionCard } from "../common/SessionCard";

interface VisiosTabsProps {
  onStartVideoCall?: () => void;
}

export const VisiosTabs: React.FC<VisiosTabsProps> = ({ onStartVideoCall }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mt-3">
      <Tabs defaultValue="a-venir" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-transparent border-b-2 border-light-blue-gray h-auto p-0 rounded-none lg:ml-6 relative">
          <TabsTrigger
            value="a-venir"
            className="relative px-4 py-4 text-lg font-bold text-slate-400 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none data-[state=active]:rounded-none hover:text-slate-900 transition-colors data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-3px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-slate-900"
          >
            A venir
          </TabsTrigger>
          <TabsTrigger
            value="en-attente"
            className="relative px-4 py-4 text-lg font-bold text-slate-400 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none data-[state=active]:rounded-none hover:text-slate-900 transition-colors data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-3px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-slate-900"
          >
            En attente
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </TabsTrigger>
          <TabsTrigger
            value="historique"
            className="relative px-4 py-4 text-lg font-bold text-slate-400 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none data-[state=active]:rounded-none hover:text-slate-900 transition-colors data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-3px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-slate-900"
          >
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="a-venir" className="mt-6 px-6">
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SessionCard
              date="Aujourd'hui"
              time="10h30"
              profileImage="/assets/prof.jpg"
              name="Sarah Ellis"
              sessionDescription="Mentoring mensuel"
              onAccept={onStartVideoCall}
              onViewRequest={() => {}}
              isComming={true}
              duration="45mn"
              classFooter="!flex-col"
              textButton="Commencer la visio"
              icon="/assets/icons/videocamera.svg"
              isUpcoming={true}
            />
            <SessionCard
              date="Aujourd'hui"
              time="10h30"
              profileImage="/assets/prof1.jpg"
              name="Sarah Ellis"
              sessionDescription="Mentoring mensuel"
              onAccept={() => {}}
              onViewRequest={() => {}}
              isComming={true}
              duration="45mn"
              classFooter="!flex-col"
              textButton="Commencer dans 1H10mn"
              icon="/assets/icons/clockCircle.svg"
              buttonStates={{ acceptDisabled: true, viewDisabled: true }}
              isUpcoming={true}
            />
            <SessionCard
              date="Aujourd'hui"
              time="10h30"
              profileImage="/assets/prof1.jpg"
              name="Sarah Ellis"
              sessionDescription="Mentoring mensuel"
              onAccept={() => {}}
              onViewRequest={() => {}}
              isComming={true}
              duration="45mn"
              classFooter="!flex-col"
              textButton="Commencer dans 3H40mn"
              icon="/assets/icons/clockCircle.svg"
              buttonStates={{ acceptDisabled: true, viewDisabled: true }}
              isUpcoming={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="en-attente" className="mt-6 px-6">
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SessionCard
              date="Aujourd'hui"
              time="10h30"
              profileImage="/assets/prof.jpg"
              name="Sarah Ellis"
              sessionDescription="Réunion rapide de 30 minutes"
              onAccept={() => {}}
              onViewRequest={() => {}}
              textButton="Accepter"
            />
            <SessionCard
              date="Demain"
              time="14h00"
              profileImage="/assets/prof1.jpg"
              name="John Smith"
              sessionDescription="Atelier de créativité de 1 heure"
              onAccept={() => {}}
              onViewRequest={() => {}}
              textButton="Accepter"
            />
            <SessionCard
              date="Vendredi"
              time="9h00"
              profileImage="/assets/prof2.jpg"
              name="Emily Tran"
              sessionDescription="Réunion stratégique de 45 minutes"
              onAccept={() => {}}
              onViewRequest={() => {}}
              textButton="Accepter"
            />
          </div>
        </TabsContent>

        <TabsContent value="historique" className="mt-6 px-6">
          <div className="space-y-4">
            <p className="text-gray-600">Historique des visios...</p>
            {/* Ici vous pouvez ajouter les SessionCard pour l'historique */}
          </div>
        </TabsContent>
      </Tabs>
      <CustomCalendar className="hidden lg:block" />
    </div>
  );
};
