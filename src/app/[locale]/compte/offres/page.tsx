"use client";

import {
  ProExpertSession,
  useGetProExpert,
} from "@/api/proExpert/useProExpert";
import { SessionCreate, useUpdateProSession } from "@/api/sessions/useSessions";
import AddAccompanimentModal from "@/components/common/AddAccompanimentModal";
import { Button } from "@/components/common/Button";
import VisioSessionsConfig from "@/components/common/VisioSessionsConfig";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronRight, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import AccountLayout from "../AccountLayout";

// Types pour les offres
interface Offer {
  id: string;
  title: string;
  sessionData?: ProExpertSession;
}

interface SessionData extends SessionCreate {
  // SessionData hérite de SessionCreate du hook API
}

// Mapping des fonctionnalités depuis l'API vers les labels affichés
const getFeatureLabel = (featureKey: string, t: any): string => {
  const featureMap: Record<string, string> = {
    one_on_one: t("offers.oneOnOne"),
    video_call: t("offers.videoCall"),
    strategic_session: t("offers.strategicSession"),
    exclusive_ressources: t("offers.exclusiveResources"),
    support: t("offers.support"),
    mentorship: t("offers.mentorship"),
    webinar: t("offers.webinar"),
  };
  return featureMap[featureKey] || featureKey;
};

// Extraire les fonctionnalités actives d'une session
const getSessionFeatures = (session: ProExpertSession, t: any): string[] => {
  const features: string[] = [];
  const featureKeys = [
    "one_on_one",
    "video_call",
    "strategic_session",
    "exclusive_ressources",
    "support",
    "mentorship",
    "webinar",
  ];

  featureKeys.forEach((key) => {
    if (session[key as keyof ProExpertSession]) {
      features.push(getFeatureLabel(key, t));
    }
  });

  return features;
};

export default function OffresPage() {
  const t = useTranslations();
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSession, setEditingSession] = useState<
    ProExpertSession | undefined
  >(undefined);
  const { data: expertData, isLoading, error } = useGetProExpert();
  const queryClient = useQueryClient();
  const updateSessionMutation = useUpdateProSession();

  // Offres toujours disponibles (liens de navigation)
  const offers: Offer[] = useMemo(() => {
    const sessionOffers: Offer[] = [];

    // Toujours afficher les sessions visio
    sessionOffers.push({
      id: "sessions-visio",
      title: t("offers.videoSessions"),
    });

    // Toujours afficher l'accompagnement mensuel
    sessionOffers.push({
      id: "accompagnement-mensuel",
      title: t("offers.monthlyAccompaniment"),
      sessionData: expertData?.sessions?.find(
        (session) =>
          !session.session_type && session.session_nature === "subscription"
      ),
    });

    return sessionOffers;
  }, [expertData?.sessions, t]);

  // Trouver toutes les sessions d'accompagnement mensuel (session_type null et session_nature subscription)
  const subscriptionSessions = useMemo(() => {
    const sessions =
      expertData?.sessions?.filter(
        (session) =>
          session.session_type === null &&
          session.session_nature === "subscription" &&
          session.is_active === true
      ) || [];
    return sessions;
  }, [expertData?.sessions]);

  const handleOfferClick = (offerId: string) => {
    setSelectedOffer(offerId);
  };

  const handleDeleteOffer = async (sessionId: string) => {
    if (!sessionId) {
      console.error("Impossible de supprimer: pas d'ID de session");
      return;
    }

    // Trouver la session complète dans les données locales
    const sessionToDelete = subscriptionSessions.find(
      (s) => s.id === sessionId
    );
    if (!sessionToDelete) {
      console.error("Session non trouvée dans les données locales");
      return;
    }

    try {
      // "Supprimer" en mettant is_active à false avec toutes les données requises
      await updateSessionMutation.mutateAsync({
        id: sessionId,
        data: {
          name: sessionToDelete.name,
          price: sessionToDelete.price,
          session_nature: sessionToDelete.session_nature as any,
          one_on_one: (sessionToDelete as any).one_on_one || false,
          video_call: (sessionToDelete as any).video_call || false,
          strategic_session:
            (sessionToDelete as any).strategic_session || false,
          exclusive_ressources:
            (sessionToDelete as any).exclusive_ressources || false,
          support: (sessionToDelete as any).support || false,
          mentorship: (sessionToDelete as any).mentorship || false,
          webinar: (sessionToDelete as any).webinar || false,
          is_active: false, // Seul champ modifié
        },
      });

      console.log("Session désactivée avec succès");

      // Invalider le cache pour forcer le rechargement des données
      queryClient.invalidateQueries({ queryKey: ["proExpert"] });
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const handleModifyOffer = (session: ProExpertSession) => {
    setEditingSession(session);
    setIsEditMode(true);
    setIsAddModalOpen(true);
  };

  const handleAddOffer = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditMode(false);
    setEditingSession(undefined);
  };

  const handleAddSuccess = (data: SessionData) => {
    console.log("Nouvel accompagnement créé:", data);
    // Invalider le cache pour forcer le rechargement des données
    queryClient.invalidateQueries({ queryKey: ["proExpert"] });
    setIsAddModalOpen(false);
  };

  return (
    <AccountLayout className="h-screen overflow-hidden">
      <div className="container h-screen overflow-hidden lg:px-5">
        {/* Titre */}
        <h1 className="text-base font-bold text-exford-blue px-4 lg:px-0 pt-4 mb-6">
          {t("account.offers")}
        </h1>

        {isLoading && (
          <div className="flex items-center justify-center h-32">
            <p className="text-slate-gray">{t("loading")}</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-32">
            <p className="text-red-500">
              {t("error")}: {error.message}
            </p>
          </div>
        )}

        {!isLoading && !error && offers.length === 0 && (
          <div className="flex items-center justify-center h-32">
            <p className="text-slate-gray">{t("offers.noOffersConfigured")}</p>
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
                    {t("offers.selectOfferToSeeDetails")}
                  </p>
                </div>
              )}
              <div className="justify-center gap-2 w-full max-w-[412px] font-figtree mt-4 hidden lg:flex">
                {selectedOffer === "accompagnement-mensuel" && (
                  <div className="w-full space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {subscriptionSessions.length > 0 ? (
                      // Affichage de toutes les sessions d'accompagnement
                      <div className="space-y-4">
                        {subscriptionSessions.map((session, index) => (
                          <div
                            key={session.id}
                            className="bg-white rounded-[12px] border border-light-blue-gray p-6"
                          >
                            {/* Titre de l'offre */}
                            <h2 className="text-base xl:text-lg font-medium text-[#1F2937] mb-6 font-figtree">
                              {session.name ||
                                `${t("offers.monthlyAccompanimentDefault")} ${
                                  index + 1
                                }`}
                            </h2>

                            <h6 className="text-sm xl:text-base font-normal text-[#6B7280] mb-2.5 font-figtree">
                              {t("offers.whatIsIncluded")}
                            </h6>

                            {/* Liste des caractéristiques */}
                            <div className="space-y-3 mb-8 font-figtree">
                              {getSessionFeatures(session, t).map(
                                (feature: string, featureIndex: number) => (
                                  <div
                                    key={`${session.id}-feature-${featureIndex}`}
                                    className="flex items-start gap-3"
                                  >
                                    <div className="relative w-4 h-4 bg-[#6B7280] rounded-full mt-2 flex-shrink-0">
                                      <Check className="w-3 h-3 text-white font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                    <p className="text-base text-[#1E293B] leading-relaxed font-figtree">
                                      {feature}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>

                            {/* Prix */}
                            <div className="text-xl xl:text-3xl font-bold text-gray-900 mb-6 font-figtree">
                              {session.price} € {t("offers.perMonth")}
                            </div>

                            {/* Boutons d'action */}
                            <div className="flex gap-4 mb-6 font-figtree">
                              <Button
                                label={
                                  updateSessionMutation.isPending
                                    ? t("offers.deleting")
                                    : t("offers.delete")
                                }
                                onClick={() => handleDeleteOffer(session.id)}
                                disabled={updateSessionMutation.isPending}
                                className={`flex-1 bg-white text-base text-charcoal-blue font-bold hover:bg-gray-50 h-[40px] border-none shadow-none ${
                                  updateSessionMutation.isPending
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                              />
                              <Button
                                label={t("bankAccount.modify")}
                                onClick={() => handleModifyOffer(session)}
                                className="flex-1 bg-white border border-light-blue-gray text-exford-blue font-bold  h-[40px]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // État vide - Aucun accompagnement configuré
                      <div className="bg-white rounded-[12px] border border-light-blue-gray p-6">
                        <div className="text-center space-y-4">
                          <h2 className="text-base xl:text-lg font-medium text-[#1F2937]">
                            {t("offers.monthlyAccompaniment")}
                          </h2>
                          <p className="text-sm text-[#6B7280]">
                            {t("offers.noMonthlyAccompaniment")}
                          </p>
                          <p className="text-sm text-[#9CA3AF]">
                            {t("offers.createFirstOffer")}
                          </p>
                          <Button
                            label={t("offers.createAccompaniment")}
                            onClick={handleAddOffer}
                            className="w-full bg-exford-blue text-white font-bold h-[44px] mt-6"
                          />
                        </div>
                      </div>
                    )}

                    {/* Bouton Ajouter une offre (toujours visible) */}
                    <div className="flex justify-center border border-light-blue-gray rounded-[8px]">
                      <button
                        onClick={handleAddOffer}
                        className="flex items-center justify-center h-[56px] gap-2 text-base text-exford-blue font-bold font-figtree cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        {t("offers.addOffer")}
                      </button>
                    </div>
                  </div>
                )}

                {/* Configuration des Sessions visio - Toujours visible */}
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
        editData={editingSession}
        isEditMode={isEditMode}
      />
    </AccountLayout>
  );
}
