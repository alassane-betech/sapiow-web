"use client";

import AddAccompanimentModal from "@/components/common/AddAccompanimentModal";
import { Button } from "@/components/common/Button";
import VisioSessionsConfig from "@/components/common/VisioSessionsConfig";
import { useGetProExpert, ProExpertSession } from "@/api/proExpert/useProExpert";
import { Check, ChevronRight, Plus } from "lucide-react";
import { useState, useMemo } from "react";
import AccountLayout from "../AccountLayout";

// Types pour les offres
interface Offer {
  id: string;
  title: string;
  sessionData?: ProExpertSession;
}

interface AccompanimentData {
  title: string;
  pricePerMonth: string;
  features: string[];
}

// Features par défaut pour l'accompagnement
const getDefaultFeatures = () => [
  "Chat 1:1",
  "Check-in réguliers",
  "Accompagnement développement business",
  "Sessions de stratégie",
  "Rapports d'industrie",
  "Support personnalisé",
];

export default function OffresPage() {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: expertData, isLoading, error } = useGetProExpert();

  // Créer les offres basées sur les sessions de l'expert
  const offers: Offer[] = useMemo(() => {
    if (!expertData?.sessions) return [];
    
    const sessionOffers: Offer[] = [];
    
    // Ajouter les sessions visio (avec session_type défini)
    const visioSessions = expertData.sessions.filter(session => 
      session.session_type && session.session_nature !== "subscription"
    );
    
    if (visioSessions.length > 0) {
      sessionOffers.push({
        id: "sessions-visio",
        title: "Sessions visio",
      });
    }
    
    // Ajouter l'accompagnement mensuel (subscription)
    const subscriptionSession = expertData.sessions.find(session => 
      !session.session_type && session.session_nature === "subscription"
    );
    
    if (subscriptionSession) {
      sessionOffers.push({
        id: "accompagnement-mensuel",
        title: "Accompagnement mensuel",
        sessionData: subscriptionSession,
      });
    }
    
    return sessionOffers;
  }, [expertData?.sessions]);

  // Trouver la session d'accompagnement
  const subscriptionSession = useMemo(() => {
    return expertData?.sessions?.find(session => 
      !session.session_type && session.session_nature === "subscription"
    );
  }, [expertData?.sessions]);

  const handleOfferClick = (offerId: string) => {
    setSelectedOffer(offerId);
  };

  const handleDeleteOffer = () => {};

  const handleModifyOffer = () => {};

  const handleAddOffer = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddSuccess = (data: AccompanimentData) => {
    console.log("Nouvel accompagnement créé:", data);
    // Ici vous pourriez ajouter la logique pour sauvegarder l'offre
    setIsAddModalOpen(false);
  };

  return (
    <AccountLayout className="h-screen overflow-hidden">
      <div className="container h-screen overflow-hidden lg:px-5">
        {/* Titre */}
        <h1 className="text-base font-bold text-exford-blue px-4 lg:px-0 pt-4 mb-6">
          Mes offres
        </h1>

        {isLoading && (
          <div className="flex items-center justify-center h-32">
            <p className="text-slate-gray">Chargement...</p>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center h-32">
            <p className="text-red-500">Erreur: {error.message}</p>
          </div>
        )}
        
        {!isLoading && !error && offers.length === 0 && (
          <div className="flex items-center justify-center h-32">
            <p className="text-slate-gray">Aucune offre configurée</p>
          </div>
        )}

        {!isLoading && !error && offers.length > 0 && (
          <div className="flex justify-between space-y-4 h-full">
            {/* Colonne de gauche - Liste des offres */}
            <div className="flex-1 min-w-0 w-full lg:max-w-[375px]">
              <div className="space-y-3 px-4 lg:px-0 lg:max-w-[343px] lg:mx-auto overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-none">
                {offers.map((offer, index) => (
                <div
                  key={offer.id}
                  onClick={() => handleOfferClick(offer.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-[12px] cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedOffer === offer.id
                      ? "bg-snow-blue border border-light-blue-gray"
                      : ""
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-base font-medium font-figtree text-exford-blue">
                      {offer.title}
                    </p>
                  </div>
                  {selectedOffer !== offer.id ? (
                    <ChevronRight className="w-5 h-5 text-slate-gray" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Barre verticale de séparation - cachée sur mobile */}
          <div className="hidden md:block bg-soft-ice-gray w-[1px] min-h-screen lg:mr-2"></div>

          {/* Panneau détails - caché sur mobile */}
          <div className="w-full max-w-[412px]">
            {!selectedOffer && (
              <div className="w-full border border-light-blue-gray rounded-[16px] p-6 flex items-center justify-center ">
                <p className="w-full max-w-[220px] text-base text-center font-medium text-pale-blue-gray">
                  Sélectionnez une offre pour voir les détails
                </p>
              </div>
            )}
            <div className="justify-center gap-2 w-full max-w-[412px] font-figtree mt-4 hidden lg:flex">
              {selectedOffer === "accompagnement-mensuel" && subscriptionSession && (
                <div className="w-full space-y-6 overflow-y-auto">
                  <div className="bg-white rounded-[12px] border border-light-blue-gray p-6">
                    {/* Titre de l'offre */}
                    <h2 className="text-base xl:text-lg font-medium text-[#1F2937] mb-6">
                      {subscriptionSession.name || "Accompagnement mensuel"}
                    </h2>

                    <h6 className="text-sm xl:text-base font-normal text-[#6B7280] mb-2.5">
                      Ce qui est inclus
                    </h6>

                    {/* Liste des caractéristiques */}
                    <div className="space-y-3 mb-8">
                      {getDefaultFeatures().map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="relative w-4 h-4 bg-[#6B7280] rounded-full mt-2 flex-shrink-0">
                            <Check className="w-3 h-3 text-white font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          </div>
                          <p className="text-base text-[#1E293B] leading-relaxed">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Prix */}
                    <div className="text-xl xl:text-3xl font-bold text-gray-900 mb-6">
                      {subscriptionSession.price} € / Mois
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex gap-4 mb-6">
                      <Button
                        label="Supprimer"
                        onClick={handleDeleteOffer}
                        className="flex-1 bg-white text-base text-charcoal-blue font-bold hover:bg-gray-50 h-[40px] border-none shadow-none"
                      />
                      <Button
                        label="Modifier"
                        onClick={handleModifyOffer}
                        className="flex-1 bg-white border border-light-blue-gray text-exford-blue font-bold  h-[40px]"
                      />
                    </div>
                  </div>

                  {/* Bouton Ajouter une offre */}
                  <div className="flex justify-center border border-light-blue-gray rounded-[8px]">
                    <button
                      onClick={handleAddOffer}
                      className="flex items-center justify-center h-[56px] gap-2 text-base text-exford-blue font-bold font-outfit cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter une offre
                    </button>
                  </div>
                </div>
              )}

              {/* Configuration des Sessions visio */}
              {selectedOffer === "sessions-visio" && (
                <div className="w-full space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
                  <div className="bg-white p-6">
                    <VisioSessionsConfig />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Modal pour ajouter un accompagnement */}
      <AddAccompanimentModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleAddSuccess}
      />
    </AccountLayout>
  );
}
