"use client";
import Accordion from "@/components/common/Accordion";
import BookedSessionCard from "@/components/common/BookedSessionCard";
import { Button } from "@/components/common/Button";
import HowItWorksCard from "@/components/common/HowItWorksCard";
import VisioPlanningCalendar from "@/components/common/VisioPlanningCalendar";
import { withAuth } from "@/components/common/withAuth";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { AppSidebar } from "@/components/layout/Sidebare";
import { Badge } from "@/components/ui/badge";
import { Button as ButtonUI } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePayStore } from "@/store/usePay";
import { usePlaningStore } from "@/store/usePlaning";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import OfferSelection from "../home/OfferSelection";
import ProfessionalCard from "../home/ProfessionalCard";

import { useGetPatientAppointmentsById } from "@/api/appointments/useAppointments";
import { useGetCustomer } from "@/api/customer/useCustomer";
import { Expert, useSearchExperts } from "@/api/listExpert/useListExpert";
import { useGetProExpertById } from "@/api/proExpert/useProExpert";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsMobileOrTablet } from "@/hooks/use-mobile-tablet";
import { useDetailsLogic } from "@/hooks/useDetailsLogic";
import { useUserStore } from "@/store/useUser";
import { addToCalendar } from "@/utils/calendar";
import { useLocale, useTranslations } from "next-intl";

// Type definitions based on actual API response
interface Patient {
  id: string;
  avatar: string | null;
  domains: any;
  user_id: string;
  language: string;
  first_name?: string;
  last_name?: string;
}

interface Pro {
  id: string;
  job: string;
  avatar: string;
  domains: any;
  user_id: string;
  first_name?: string;
  last_name?: string;
}

interface Session {
  created_at: string;
  exclusive_ressources: boolean;
  id: string;
  is_active: boolean;
  mentorship: boolean;
  name: string;
  one_on_one: boolean;
  price: number;
  pro_id: string;
  session_nature: string;
  session_type: string;
  strategic_session: boolean;
  support: boolean;
  updated_at: string;
  video_call: boolean;
  webinar: boolean;
}

interface Appointment {
  appointment_at: string;
  appointment_questions: any[];
  created_at: string;
  id: string;
  patient: Patient;
  patient_id: string;
  pro: Pro;
  pro_id: string;
  session: Session;
  session_id: string;
  status: string;
  updated_at: string;
}

// Données des professionnels (à déplacer dans un contexte ou API plus tard)
const professionalsSimilar = [
  {
    id: "1",
    name: "Jean-Pierre Fauch",
    price: "199.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "business",
    linkedin: "https://www.linkedin.com/in/jean-pierre-fauch/",
  },
  {
    id: "2",
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "business",
  },
  {
    id: "3",
    name: "Jean-Pierre Fauch",
    price: "199.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "business",
  },
  {
    id: "4",
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "business",
  },
  {
    id: "5",
    name: "Jean-Pierre Fauch",
    price: "199.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "business",
  },
  {
    id: "6",
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "business",
  },
];

function ProfessionalDetailContent() {
  const t = useTranslations();
  const locale = useLocale();
  const { data: customer } = useGetCustomer();
  const { data: appointments } = useGetPatientAppointmentsById(
    customer?.id || ""
  ) as { data: Appointment[] };
  const { user: userClient } = useUserStore();
  const isMobile = useIsMobile();
  const isMobileOrTablet = useIsMobileOrTablet();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isPaid } = usePayStore();
  const { isPlaning } = usePlaningStore();

  // Récupérer l'ID depuis les paramètres de recherche
  const expertId = searchParams.get("id");

  // Utiliser le hook API pour récupérer l'expert
  const {
    data: expertData,
    isLoading,
    error,
  } = useGetProExpertById(expertId || "");

  const {
    data: expertsimilar,
    isLoading: isLoadingExpertSimilar,
    error: errorExpertSimilar,
  } = useSearchExperts();

  console.log({ expertsimilar });

  // Utilisation du hook pour isoler la logique
  const {
    professional,
    expertiseNames,
    isOfferSheetOpen,
    isDescriptionExpanded,
    toggleLike,
    isLiked,
    setIsOfferSheetOpen,
    toggleDescriptionExpanded,
  } = useDetailsLogic(expertData);

  useEffect(() => {
    if (!expertId) {
      router.push("/");
    }
  }, [expertId, router]);

  useEffect(() => {
    if (userClient.type === "expert") {
      console.log("expert");
      router.push("/");
    }
  }, [userClient, router]);

  // États de chargement et d'erreur
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-exford-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600">
            {t("expertDetails.errorLoadingExpert")}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {error.message || t("expertDetails.expertNotFound")}
          </p>
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">
            {t("expertDetails.expertNotFound")}
          </p>
        </div>
      </div>
    );
  }

  const isExpertLiked = professional ? isLiked(String(professional.id)) : false;

  // Dimensions responsive pour l'image
  const imageWidth = isMobile ? 358 : 303;
  const imageHeight = 378;
  const maxWidth = isMobile ? "max-w-[358px]" : "max-w-[303px]";
  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full flex-1">
        <HeaderClient isBack classNameIsBack="py-1" />
        {/* <Expert /> */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] xl:grid-cols-[1fr_386px] gap-6 pl-5 container pb-20 lg:pb-0">
          <div className="w-full max-w-[753px]">
            <div className="flex justify-center flex-col md:flex-row gap-6 mt-3">
              <div className="relative">
                <ProfessionalCard
                  professional={{
                    ...professional,
                    description: professional.job || professional.description,
                  }}
                  isLiked={isExpertLiked}
                  onToggleLike={() => toggleLike(String(professional.id))}
                  imageWidth={imageWidth}
                  imageHeight={imageHeight}
                  maxWidth={maxWidth}
                  lineClamp={1}
                  nameSize="text-[20px]"
                  iconSize={24}
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="xl:text-base text-sm font-bold mb-1 font-figtree mt-3">
                    {t("expertDetails.about")}
                  </h2>
                  <p
                    className={`text-gray-700 leading-relaxed font-figtree xl:text-base text-sm ${
                      isDescriptionExpanded ? "" : "line-clamp-[7]"
                    }`}
                  >
                    {expertData?.description}
                  </p>
                  <ButtonUI
                    onClick={toggleDescriptionExpanded}
                    variant="link"
                    className="text-sm font-bold p-0 h-auto text-cobalt-blue underline cursor-pointer"
                  >
                    {isDescriptionExpanded
                      ? t("expertDetails.seeLess")
                      : t("expertDetails.seeMore")}{" "}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </ButtonUI>
                </div>

                <div>
                  <h3 className="text-sm text-[#374151] font-semibold mb-3">
                    {t("expertDetails.expertiseDomains")}
                  </h3>
                  <div className="max-w-[400px] flex gap-2 flex-wrap">
                    {expertiseNames?.map(
                      (expertiseName: string, index: number) => (
                        <Badge
                          key={index}
                          className="p-2 text-xs lg:text-[10px] xl:text-xs text-[#1F2937] font-medium bg-[#F3F4F6] hover:bg-[#F3F4F6] max-w-fit mb-2"
                          variant="secondary"
                        >
                          {expertiseName}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <Card className="bg-ice-blue border-ice-blue shadow-none h-[72px] p-0">
                  <CardContent className="p-4 text-center">
                    <p className="text-[13px] lg:text-[11px] xl:text-base text-gray-700 font-figtree font-normal lg:font-medium xl:font-normal">
                      {t("expertDetails.revenueDestination")} <br />
                      <span className="text-[13px] lg:text-[11px] xl:text-base font-bold font-figtree">
                        {t("expertDetails.foundations")}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Questions and Expectations */}
            <div className="grid md:grid-cols-2 gap-8 mt-7.5 mb-15">
              <div className="bg-soft-ice-gray px-1 py-0.5 rounded-[8px] border border-soft-ice-gray">
                <h2 className="text-base font-bold mb-4 px-4 pt-3 font-figtree">
                  {t("expertDetails.questionsToAsk")}
                </h2>
                <ul className="space-y-3 text-gray-700 pl-6 pb-4 text-base font-figtree pr-1">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-700 mt-1">•</span>
                    <span>{t("expertDetails.question1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-700 mt-1">•</span>
                    <span>{t("expertDetails.question2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-700 mt-1">•</span>
                    <span>{t("expertDetails.question3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-700 mt-1">•</span>
                    <span>{t("expertDetails.question4")}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-soft-ice-gray px-1 py-0.5 rounded-[8px] border border-soft-ice-gray">
                <h2 className="text-base font-bold mb-4 pl-6 pt-3">
                  {t("expertDetails.expectations")}
                </h2>
                <div className="space-y-4 text-base">
                  <div className="pl-6 pr-1">
                    <h3 className="text-base font-normal">
                      {t("expertDetails.visio15min")}
                    </h3>
                    <ul className="mt-2 space-y-2 text-gray-700 pl-2 font-figtree">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-700 mt-1">•</span>
                        <span>{t("expertDetails.expectation1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-700 mt-1">•</span>
                        <span>{t("expertDetails.expectation2")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-700 mt-1">•</span>
                        <span>{t("expertDetails.expectation3")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-700 mt-1">•</span>
                        <span>{t("expertDetails.expectation4")}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* How it works */}
            <div className="mb-15">
              <h2 className="text-lg font-bold mb-2.5 text-charcoal-blue">
                {t("expertDetails.howItWorks")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <HowItWorksCard
                  iconSrc="/assets/icons/magnifer.svg"
                  iconAlt={t("sessionDetail.magnifierAlt")}
                  title={t("expertDetails.findExpert")}
                  description={t("expertDetails.findExpertDesc")}
                />

                <HowItWorksCard
                  iconSrc="/assets/icons/calendar1.svg"
                  iconAlt={t("sessionDetail.calendarAlt")}
                  title={t("expertDetails.bookOrSubscribe")}
                  description={t("expertDetails.bookOrSubscribeDesc")}
                />

                <HowItWorksCard
                  iconSrc="/assets/icons/videocameraRecord.svg"
                  iconAlt={t("sessionDetail.videoCameraAlt")}
                  title={t("expertDetails.virtualConsultation")}
                  description={t("expertDetails.virtualConsultationDesc")}
                />
              </div>
            </div>

            {/* Similar Experts */}
            <div className="mb-15">
              <div>
                <div className="flex items-center justify-between mb-6 mt-3">
                  <h2 className="text-xl font-bold">
                    {t("expertDetails.similarExperts")}
                  </h2>
                  <ButtonUI variant="link" className="text-blue-600">
                    {t("expertDetails.seeAll")}{" "}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </ButtonUI>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4">
                  {expertsimilar
                    ?.filter((expert: Expert) => expert.id !== expertId)
                    ?.map((professional: Expert) => (
                      <ProfessionalCard
                        key={professional.id}
                        professional={{
                          ...professional,
                          description:
                            professional.job || professional.description,
                        }}
                        isLiked={isLiked(String(professional.id))}
                        onToggleLike={() => toggleLike(String(professional.id))}
                        onProfessionalClick={() =>
                          router.push(`/details?id=${professional.id}`)
                        }
                      />
                    ))}
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-bold mb-6">
                {t("expertDetails.frequentQuestions")}
              </h2>
              <Accordion
                items={[
                  {
                    question: t("expertDetails.whatIsSapiow"),
                    answer: t("expertDetails.whatIsSapiowAnswer"),
                    defaultOpen: true,
                  },
                  {
                    question: t("expertDetails.benefitsQuestion"),
                    answer: t("expertDetails.benefitsAnswer"),
                  },
                  {
                    question: t("expertDetails.expertsTypesQuestion"),
                    answer: t("expertDetails.expertsTypesAnswer"),
                  },
                  {
                    question: t("expertDetails.qualityQuestion"),
                    answer: t("expertDetails.qualityAnswer"),
                  },
                  {
                    question: t("expertDetails.feesQuestion"),
                    answer: t("expertDetails.feesAnswer"),
                  },
                ]}
              />
            </div>
          </div>
          {/* Colonne de droite - Cachée en mobile/tablette, visible en desktop */}
          <div className="hidden xl:block xl:border-l xl:border-gray-200">
            {isPaid ? (
              <aside className="w-full">
                <Image
                  src="/assets/icons/congruation.svg"
                  alt={t("sessionDetail.congratulationAlt")}
                  width={421}
                  height={381}
                  className="-mt-29"
                />
                <div className="flex flex-col items-center justify-center gap-4 mt-7">
                  <h2 className="text-[28px] font-bold text-charcoal-blue">
                    {t("expertDetails.congratulations")}
                  </h2>
                  <p className="text-xl text-black text-center font-medium mb-6">
                    {t("expertDetails.sessionBookedSuccess")}
                  </p>
                </div>
                <div className="p-6">
                  <BookedSessionCard
                    date={
                      appointments?.[0]?.appointment_at
                        ? new Date(
                            appointments[0].appointment_at
                          ).toLocaleDateString(locale, {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : t("sessionDetail.dateNotAvailable")
                    }
                    time={
                      appointments?.[0]?.appointment_at
                        ? new Date(
                            appointments[0].appointment_at
                          ).toLocaleTimeString(locale, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : t("sessionDetail.timeNotAvailable")
                    }
                    duration={appointments?.[0]?.session?.name}
                    sessionType={t("sessionDetail.session")}
                    professionalName={
                      appointments?.[0]?.pro?.first_name +
                        " " +
                        appointments?.[0]?.pro?.last_name ||
                      t("sessionDetail.expert")
                    }
                    professionalTitle={t("sessionDetail.expert")}
                    profileImage={
                      appointments?.[0]?.pro?.avatar || "/assets/icons/pro2.png"
                    }
                  />
                </div>
                <Button
                  label={t("expertDetails.addToCalendar")}
                  className="mt-6 h-[56px] w-[90%] mx-auto text-base text-exford-blue font-bold bg-white hover:bg-white/20 border border-light-blue-gray shadow-none"
                  icon="/assets/icons/calendar.svg"
                  onClick={() => {
                    console.log("🗓️ Clic sur Ajouter au calendrier");
                    console.log("📅 Appointments:", appointments);

                    const appointment = appointments?.[0];
                    console.log("📅 Premier appointment:", appointment);

                    if (appointment?.appointment_at) {
                      console.log(
                        "📅 appointment_at:",
                        appointment.appointment_at
                      );

                      // Créer la date de début à partir de appointment_at
                      const startDate = new Date(appointment.appointment_at);
                      console.log("📅 Start date:", startDate);

                      // Créer la date de fin (60 minutes après)
                      const endDate = new Date(startDate);
                      endDate.setMinutes(endDate.getMinutes() + 60);
                      console.log("📅 End date:", endDate);

                      const professionalName =
                        `${appointment.pro?.first_name || ""} ${
                          appointment.pro?.last_name || ""
                        }`.trim() || t("sessionDetail.expert");
                      console.log("📅 Professional name:", professionalName);

                      const consultationWith = t(
                        "sessionDetail.consultationWith"
                      );
                      const videoConsultation = t(
                        "sessionDetail.videoConsultation"
                      );
                      const expert = t("sessionDetail.expert");

                      const eventData = {
                        title: `${consultationWith} ${professionalName}`,
                        description: `${videoConsultation} ${professionalName} - ${
                          appointment.pro?.job || expert
                        }`,
                        location: "Visioconférence Sapiow",
                        startDate,
                        endDate,
                        professionalName,
                      };
                      console.log("📅 Event data:", eventData);

                      addToCalendar(eventData);
                      console.log("✅ Fonction addToCalendar appelée");
                    } else {
                      console.error("❌ Pas de appointment_at trouvé");
                    }
                  }}
                />
              </aside>
            ) : (
              <>
                {!isPlaning && (
                  <OfferSelection
                    price={professional?.price || ""}
                    expertData={expertData}
                  />
                )}
                {isPlaning && (
                  <VisioPlanningCalendar
                    expertData={expertData}
                    professionalName={professional?.name || "Expert"}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Page de succès en pleine page pour mobile et tablette */}
      {isMobileOrTablet && isPaid && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <HeaderClient isBack />
          <div className="flex-1 overflow-y-auto">
            <div className="min-h-full flex flex-col items-center justify-center px-6 py-8">
              <Image
                src="/assets/icons/congruation.svg"
                alt={t("sessionDetail.congratulationAlt")}
                width={300}
                height={250}
                className="mb-8"
              />
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-charcoal-blue mb-4">
                  {t("expertDetails.congratulations")}
                </h2>
                <p className="text-lg text-black font-medium mb-6 font-figtree">
                  {t("expertDetails.sessionBookedSuccess")}
                </p>
              </div>
              <div className="w-full max-w-[358px] mb-6">
                <BookedSessionCard
                  date={
                    appointments?.[0]?.appointment_at
                      ? new Date(
                          appointments[0].appointment_at
                        ).toLocaleDateString(locale, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : t("sessionDetail.dateNotAvailable")
                  }
                  time={
                    appointments?.[0]?.appointment_at
                      ? new Date(
                          appointments[0].appointment_at
                        ).toLocaleTimeString(locale, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : t("sessionDetail.timeNotAvailable")
                  }
                  duration="60 minutes"
                  sessionType={t("sessionDetail.quickVideoSession")}
                  professionalName={
                    appointments?.[0]?.pro?.first_name +
                      " " +
                      appointments?.[0]?.pro?.last_name ||
                    t("sessionDetail.expert")
                  }
                  professionalTitle={t("sessionDetail.expert")}
                  profileImage={professional?.image || "/assets/icons/pro2.png"}
                />
              </div>
              <Button
                label={t("expertDetails.addToCalendar")}
                className="w-full h-[48px] text-base text-exford-blue font-bold bg-white hover:bg-white/20 border border-light-blue-gray shadow-none font-figtree"
                icon="/assets/icons/calendar.svg"
                onClick={() => {
                  console.log("🗓️ Clic sur Ajouter au calendrier");
                  console.log("📅 Appointments:", appointments);

                  const appointment = appointments?.[0];
                  console.log("📅 Premier appointment:", appointment);

                  if (appointment?.appointment_at) {
                    console.log(
                      "📅 appointment_at:",
                      appointment.appointment_at
                    );

                    // Créer la date de début à partir de appointment_at
                    const startDate = new Date(appointment.appointment_at);
                    console.log("📅 Start date:", startDate);

                    // Créer la date de fin (60 minutes après)
                    const endDate = new Date(startDate);
                    endDate.setMinutes(endDate.getMinutes() + 60);
                    console.log("📅 End date:", endDate);

                    const professionalName =
                      `${appointment.pro?.first_name || ""} ${
                        appointment.pro?.last_name || ""
                      }`.trim() || t("sessionDetail.expert");
                    console.log("📅 Professional name:", professionalName);

                    const consultationWith = t(
                      "sessionDetail.consultationWith"
                    );
                    const videoConsultation = t(
                      "sessionDetail.videoConsultation"
                    );
                    const expert = t("sessionDetail.expert");

                    const eventData = {
                      title: `${consultationWith} ${professionalName}`,
                      description: `${videoConsultation} ${professionalName} - ${
                        appointment.pro?.job || expert
                      }`,
                      location: "Visioconférence Sapiow",
                      startDate,
                      endDate,
                      professionalName,
                    };
                    console.log("📅 Event data:", eventData);

                    addToCalendar(eventData);
                    console.log("✅ Fonction addToCalendar appelée");
                  } else {
                    console.error("❌ Pas de appointment_at trouvé");
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bouton fixe mobile/tablette pour ouvrir le modal des offres */}
      {!isPaid && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 xl:hidden">
          <Sheet open={isOfferSheetOpen} onOpenChange={setIsOfferSheetOpen}>
            <SheetTrigger asChild>
              <Button
                label={t("sessionDetail.bookSession")}
                className="w-full h-[48px] bg-exford-blue text-white font-bold font-figtree"
              />
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="h-[90vh] overflow-y-auto bg-white"
            >
              <div className="mt-4">
                {!isPlaning && (
                  <OfferSelection
                    price={professional?.price || ""}
                    expertData={expertData}
                  />
                )}
                {isPlaning && (
                  <VisioPlanningCalendar
                    expertData={expertData}
                    professionalName={professional?.name || "Expert"}
                  />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  );
}

function ProfessionalDetail() {
  const t = useTranslations();
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          {t("loading")}...
        </div>
      }
    >
      <ProfessionalDetailContent />
    </Suspense>
  );
}

export default withAuth(ProfessionalDetail);
