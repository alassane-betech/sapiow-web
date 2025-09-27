"use client";
import { useGetPatientAppointmentsById } from "@/api/appointments/useAppointments";
import { useGetCustomer } from "@/api/customer/useCustomer";
import { UpcomingVideoCall } from "@/components/common/DarkSessionCard";
import { useClientHome } from "@/hooks/useClientHome";
import { useI18n } from "@/locales/client";
import { Professional } from "@/types/professional";
import {
  filterAndSortAppointments,
  transformAppointmentToSessionData,
  type ApiAppointment,
} from "@/utils/appointmentUtils";
import { useMemo } from "react";
import CategoryFilter from "./CategoryFilter";
import CategorySection from "./CategorySection";
import ProfessionalCard from "./ProfessionalCard";
import SubCategoryFilter from "./SubCategoryFilter";

export default function Client() {
  const t = useI18n();
  const {
    selectedCategory,
    selectedSubCategory,
    groupedProfessionals,
    filteredProfessionals,
    likedProfs,
    handleCategoryChange,
    handleSubCategoryChange,
    handleSortChange,
    handleToggleLike,
    handleProfessionalClick,
    isLoading,
    error,
  } = useClientHome();

  // Récupération des appointments du patient
  const { data: customer } = useGetCustomer();
  const { data: appointments } = useGetPatientAppointmentsById(
    customer?.id || ""
  );

  // Filtrage des visios confirmées (on garde les données originales)
  const upcomingAppointments = useMemo(() => {
    if (!appointments) return [];
    const { upcomingConfirmed } = filterAndSortAppointments(
      appointments as ApiAppointment[]
    );
    return upcomingConfirmed;
  }, [appointments]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-exford-blue"></div>
          <p className="mt-4 text-lg text-exford-blue">
            {t("home.loadingExperts")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">
            {t("home.errorLoadingExperts")}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {error.message || t("home.unknownError")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Section visios confirmées à venir */}
      {upcomingAppointments.length > 0 && (
        <div className="mb-6 mt-4">
          <h2 className="mb-3 text-lg font-bold text-exford-blue font-figtree">
            {t("home.yourNextVisio")}
          </h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {upcomingAppointments
              .slice(0, 2)
              .map((appointment: ApiAppointment) => {
                const sessionData =
                  transformAppointmentToSessionData(appointment);
                return (
                  <UpcomingVideoCall
                    key={appointment.id}
                    date={sessionData.date}
                    appointmentAt={appointment.appointment_at}
                    profileImage={sessionData.profileImage}
                    name={sessionData.professionalName}
                    title={sessionData.professionalTitle}
                    variant="dark"
                    showButton={false}
                    sessionTime={sessionData.time}
                    className="w-full min-w-full md:min-w-[calc(50%-0.5rem)] md:w-[calc(50%-0.5rem)] lg:max-w-[324px] lg:min-w-[324px] h-[184px] border-none shadow-none"
                  />
                );
              })}
          </div>
        </div>
      )}

      <h2 className="my-2 text-lg lg:text-2xl font-normal text-exford-blue font-figtree">
        {t("home.accelerateProject")}
      </h2>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {selectedCategory !== "top" && (
        <SubCategoryFilter
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onSubCategoryChange={handleSubCategoryChange}
          onSortChange={handleSortChange}
        />
      )}

      {selectedCategory === "top" ? (
        // Affichage par sections pour "Top"
        <div className="py-6 ">
          {Object.entries(groupedProfessionals).map(
            ([category, categoryProfessionals]) => (
              <CategorySection
                key={category}
                category={category}
                professionals={categoryProfessionals as Professional[]}
                likedProfs={likedProfs}
                onToggleLike={handleToggleLike}
                onProfessionalClick={handleProfessionalClick}
              />
            )
          )}
        </div>
      ) : (
        // Affichage normal pour les autres catégories
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
          {filteredProfessionals.map((professional: Professional) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              isLiked={(() => {
                const profIdString = professional.id.toString();
                const isLiked = likedProfs[profIdString] || false;

                return isLiked;
              })()}
              onToggleLike={handleToggleLike}
              onProfessionalClick={handleProfessionalClick}
              lineClamp={3}
            />
          ))}
        </div>
      )}
    </div>
  );
}
