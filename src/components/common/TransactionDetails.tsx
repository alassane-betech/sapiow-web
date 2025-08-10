import { Button } from "@/components/common/Button";
import { ChevronLeftIcon, Send } from "lucide-react";
import React from "react";

interface TransactionDetailsProps {
  montant: string;
  session: string;
  expert: string;
  dateHeure: string;
  statut: "Effectué" | "En attente" | "Annulé";
  id: string;
  onBack?: () => void;
  isMobile?: boolean;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  montant,
  session,
  expert,
  dateHeure,
  statut,
  id,
  onBack,
  isMobile = false,
}) => {
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Effectué":
        return "text-green-600";
      case "En attente":
        return "text-orange-500";
      case "Annulé":
        return "text-red-500";
      default:
        return "text-slate-600";
    }
  };

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col font-figtree">
        {/* Header mobile */}
        <div className="flex items-center justify-between p-4 border-b border-light-blue-gray">
          <Button
            onClick={onBack}
            className="bg-white shadow-none flex items-center gap-2 text-exford-blue"
            label=""
            icon={<ChevronLeftIcon />}
          />
          <h1 className="text-lg font-medium text-exford-blue">
            Détail de la transaction
          </h1>
          <div className="w-6"></div> {/* Spacer pour centrer le titre */}
        </div>

        {/* Contenu mobile */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Montant */}
          <div className="flex justify-between items-center py-4 border-b border-light-blue-gray">
            <span className="text-base font-semibold text-exford-blue">
              Montant
            </span>
            <span className="text-base font-bold text-exford-blue">
              {montant}
            </span>
          </div>

          {/* Session */}
          <div className="flex justify-between items-center py-4 border-b border-light-blue-gray">
            <span className="text-base font-semibold text-exford-blue">
              Session
            </span>
            <span className="text-base font-medium text-exford-blue text-right max-w-[200px]">
              {session}
            </span>
          </div>

          {/* Expert */}
          <div className="flex justify-between items-center py-4 border-b border-light-blue-gray">
            <span className="text-base font-semibold text-exford-blue">
              Expert
            </span>
            <span className="text-base font-medium text-exford-blue text-right max-w-[200px]">
              {expert}
            </span>
          </div>

          {/* Date et heure */}
          <div className="flex justify-between items-center py-4 border-b border-light-blue-gray">
            <span className="text-base font-semibold text-exford-blue">
              Date et heure
            </span>
            <span className="text-base font-medium text-exford-blue text-right max-w-[200px]">
              {dateHeure}
            </span>
          </div>

          {/* Statut */}
          <div className="flex justify-between items-center py-4 border-b border-light-blue-gray">
            <span className="text-base font-semibold text-exford-blue">
              Statut
            </span>
            <span className={`text-base font-normal ${getStatutColor(statut)}`}>
              {statut}
            </span>
          </div>

          {/* ID */}
          <div className="flex justify-between items-center py-4">
            <span className="text-base font-semibold text-exford-blue">ID</span>
            <span className="text-base font-normal text-slate-600 font-mono text-right max-w-[200px] break-all">
              {id}
            </span>
          </div>
        </div>

        {/* Bouton Envoyer la facture */}
        <div className="p-6 border-t border-light-blue-gray">
          <Button
            label="Envoyer la facture"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-[12px] font-medium hover:bg-blue-700 transition-colors"
            icon={<Send />}
          />
        </div>
      </div>
    );
  }

  // Vue desktop
  return (
    <div className="w-full max-w-[412px] h-[392px] bg-white border border-light-blue-gray rounded-[16px] p-6">
      <div className="space-y-6">
        {/* Montant */}
        <div className="flex justify-between items-center pb-4 border-b border-light-blue-gray">
          <span className="text-base font-semibold text-exford-blue">
            Montant
          </span>
          <span className="text-base font-bold text-exford-blue">
            {montant}
          </span>
        </div>

        {/* Session */}
        <div className="flex justify-between items-center pb-4 border-b border-light-blue-gray">
          <span className="text-base font-semibold text-exford-blue">
            Session
          </span>
          <span className="text-base font-normal text-exford-blue text-right max-w-[200px]">
            {session}
          </span>
        </div>

        {/* Expert */}
        <div className="flex justify-between items-center pb-4 border-b border-light-blue-gray">
          <span className="text-base font-semibold text-exford-blue">
            Expert
          </span>
          <span className="text-base font-normal text-exford-blue text-right max-w-[200px]">
            {expert}
          </span>
        </div>

        {/* Date et heure */}
        <div className="flex justify-between items-center pb-4 border-b border-light-blue-gray">
          <span className="text-base font-semibold text-exford-blue">
            Date et heure
          </span>
          <span className="text-base font-normal text-exford-blue text-right max-w-[200px]">
            {dateHeure}
          </span>
        </div>

        {/* Statut */}
        <div className="flex justify-between items-center pb-4 border-b border-light-blue-gray">
          <span className="text-base font-semibold text-exford-blue">
            Statut
          </span>
          <span className={`text-base font-normal ${getStatutColor(statut)}`}>
            {statut}
          </span>
        </div>

        {/* ID */}
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-exford-blue">ID</span>
          <span className="text-base font-normal text-slate-600 font-mono text-right max-w-[200px] break-all">
            {id}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
