"use client";

import AddAccompanimentModal from "@/components/common/AddAccompanimentModal";
import { Button } from "@/components/common/Button";
import VisioSessionsConfig from "@/components/common/VisioSessionsConfig";
import { Check, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import AccountLayout from "../AccountLayout";

// Types pour les offres
interface Offer {
  id: string;
  title: string;
}

interface AccompanimentData {
  title: string;
  pricePerMonth: string;
  features: string[];
}

// Détails de l'offre d'accompagnement mensuel
const accompanimentDetails = {
  title:
    "Construire et développer une entreprise prospère - Conseiller fondateur 1:1",
  features: [
    "Chat 1:1 (illimité)",
    "Check-in (chaque 1100 mai/mois)",
    "Vous avez la possibilité de transformer votre idée de SaaS ICR en 100K € de chiffre d'affaires annuel",
    "Sessions de stratégie hebdomadaires (2 heures/mois)",
    "Accès à des informations et rapports exclusifs de l'industrie",
    "Intégration et support personnalisé",
  ],
  price: "1 300 € / Mois",
};

const offers: Offer[] = [
  {
    id: "sessions-visio",
    title: "Sessions visio",
  },
  {
    id: "accompagnement-mensuel",
    title: "Accompagnement mensuel",
  },
];

export default function OffresPage() {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOfferClick = (offerId: string) => {
    setSelectedOffer(offerId);
    console.log("Offre sélectionnée:", offerId);
  };

  const handleDeleteOffer = () => {
    console.log("Supprimer l'offre");
  };

  const handleModifyOffer = () => {
    console.log("Modifier l'offre");
  };

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

        <div className="flex justify-between space-y-4 h-[calc(100vh-100px)]">
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
          <div className="w-px bg-light-blue-gray mx-6 hidden lg:block"></div>

          {/* Panneau détails - caché sur mobile */}
          <div className="w-full max-w-[412px] h-[calc(100vh-200px)]">
            {!selectedOffer && (
              <div className="w-full border border-light-blue-gray rounded-[16px] p-6 flex items-center justify-center ">
                <p className="w-full max-w-[220px] text-base text-center font-medium text-pale-blue-gray">
                  Sélectionnez une offre pour voir les détails
                </p>
              </div>
            )}
            <div className="justify-center gap-2 w-full max-w-[412px] font-figtree mt-4 hidden lg:flex">
              {selectedOffer === "accompagnement-mensuel" && (
                <div className="w-full space-y-6 overflow-y-auto">
                  <div className="bg-white rounded-[12px] border border-light-blue-gray p-6">
                    {/* Titre de l'offre */}
                    <h2 className="text-base xl:text-lg font-medium text-[#1F2937] mb-6">
                      {accompanimentDetails.title}
                    </h2>

                    <h6 className="text-sm xl:text-base font-normal text-[#6B7280] mb-2.5">
                      Ce qui est inclus
                    </h6>

                    {/* Liste des caractéristiques */}
                    <div className="space-y-3 mb-8">
                      {accompanimentDetails.features.map((feature, index) => (
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
                      {accompanimentDetails.price}
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
