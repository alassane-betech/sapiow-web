"use client";
import { FormField } from "@/components/common/FormField";
import TransactionDetails from "@/components/common/TransactionDetails";
import { ChevronRightIcon, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AccountLayout from "../AccountLayout";

export default function Disponibilites() {
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false); // 1024px-1140px
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Détection des breakpoints
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      setIsTablet(width >= 1024 && width <= 1140);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleTransactionClick = (transactionId: number) => {
    setSelectedTransaction(transactionId);
    if (isMobile) {
      setShowMobileDetail(true);
    } else if (isTablet) {
      setShowDetails(true);
    }
    // Pour desktop (>1140px), pas de changement d'état supplémentaire
  };

  const handleBackToList = () => {
    setShowMobileDetail(false);
    setShowDetails(false);
    setSelectedTransaction(null);
  };

  const history = [
    {
      id: 1,
      title: "Paiement consultation avec Dr. Mohamed El Fadil",
      date: "20/08/2025",
      amount: "43$",
      session: "60-minute Deep Dive",
      expert: "Dr Amandine Bergère",
      dateHeure: "18 Fév. 2025 à 15:19",
      statut: "Effectué" as const,
      transactionId: "YSH03987266283B",
    },
    {
      id: 2,
      title: "Paiement consultation avec Dr. Sarah Martin",
      date: "15/08/2025",
      amount: "65$",
      session: "90-minute Consultation",
      expert: "Dr Sarah Martin",
      dateHeure: "15 Fév. 2025 à 10:30",
      statut: "Effectué" as const,
      transactionId: "YSH03987266284C",
    },
    {
      id: 3,
      title: "Paiement consultation avec Dr. Jean Dupont",
      date: "10/08/2025",
      amount: "55$",
      session: "45-minute Session",
      expert: "Dr Jean Dupont",
      dateHeure: "10 Fév. 2025 à 14:00",
      statut: "En attente" as const,
      transactionId: "YSH03987266285D",
    },
    {
      id: 4,
      title: "Paiement consultation avec Dr. Jean Dupont",
      date: "10/08/2025",
      amount: "55$",
      session: "45-minute Session",
      expert: "Dr Jean Dupont",
      dateHeure: "10 Fév. 2025 à 14:00",
      statut: "En attente" as const,
      transactionId: "YSH03987266285D",
    },
    {
      id: 5,
      title: "Paiement consultation avec Dr. Jean Dupont",
      date: "10/08/2025",
      amount: "55$",
      session: "45-minute Session",
      expert: "Dr Jean Dupont",
      dateHeure: "10 Fév. 2025 à 14:00",
      statut: "En attente" as const,
      transactionId: "YSH03987266285D",
    },
    {
      id: 6,
      title: "Paiement consultation avec Dr. Jean Dupont",
      date: "10/08/2025",
      amount: "55$",
      session: "45-minute Session",
      expert: "Dr Jean Dupont",
      dateHeure: "10 Fév. 2025 à 14:00",
      statut: "En attente" as const,
      transactionId: "YSH03987266285D",
    },
    {
      id: 7,
      title: "Paiement consultation avec Dr. Jean Dupont",
      date: "10/08/2025",
      amount: "55$",
      session: "45-minute Session",
      expert: "Dr Jean Dupont",
      dateHeure: "10 Fév. 2025 à 14:00",
      statut: "En attente" as const,
      transactionId: "YSH03987266285D",
    },
    {
      id: 8,
      title: "Paiement consultation avec Dr. Jean Dupont",
      date: "10/08/2025",
      amount: "55$",
      session: "45-minute Session",
      expert: "Dr Jean Dupont",
      dateHeure: "10 Fév. 2025 à 14:00",
      statut: "En attente" as const,
      transactionId: "YSH03987266285D",
    },
    {
      id: 9,
      title: "Paiement consultation avec Dr. Jean Dupont",
      date: "10/08/2025",
      amount: "55$",
      session: "45-minute Session",
      expert: "Dr Jean Dupont",
      dateHeure: "10 Fév. 2025 à 14:00",
      statut: "En attente" as const,
      transactionId: "YSH03987266285D",
    },
    {
      id: 10,
      title: "Paiement consultation avec Dr. Jean Dupont",
      date: "10/08/2025",
      amount: "55$",
      session: "45-minute Session",
      expert: "Dr Jean Dupont",
      dateHeure: "10 Fév. 2025 à 14:00",
      statut: "En attente" as const,
      transactionId: "YSH03987266285D",
    },
    {
      id: 11,
      title: "Paiement consultation avec Dr. Jean Dupont",
      date: "10/08/2025",
      amount: "55$",
      session: "45-minute Session",
      expert: "Dr Jean Dupont",
      dateHeure: "10 Fév. 2025 à 14:00",
      statut: "En attente" as const,
      transactionId: "YSH03987266285D",
    },
  ];
  return (
    <AccountLayout className="h-screen overflow-hidden">
      <div
        className={`container h-screen overflow-hidden lg:px-5 ${
          isTablet ? "" : "flex justify-between space-y-4"
        }`}
      >
        {!isTablet ? (
          /* Layout 3 colonnes - Mobile et Desktop (>1140px) */
          <>
            <div className="flex-1 min-w-0 w-full lg:max-w-[375px]">
              <div className="w-full flex gap-2 pt-4 px-4 lg:px-4">
                <FormField
                  label="Rechercher"
                  name="search"
                  type="text"
                  placeholder="Montant, transaction ..."
                  leftIcon={
                    <Search className="w-6 h-6 text-slate-gray cursor-pointer" />
                  }
                  className="h-[48px] flex-1 lg:w-[282px] bg-snow-blue border-none shadow-none placeholder:text-slate-gray text-base"
                />
                <div className="flex-shrink-0">
                  <Image
                    src="/assets/icons/card_icon.svg"
                    alt="card"
                    width={48}
                    height={48}
                    className="w-[48px] h-[48px] text-slate-gray cursor-pointer"
                  />
                </div>
              </div>
              <div className="space-y-3 mt-4 px-4 lg:px-0 lg:max-w-[343px] lg:mx-auto overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-none">
                {history.map((transaction) => (
                  <div
                    key={transaction.id}
                    onClick={() => handleTransactionClick(transaction.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-[12px] cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedTransaction === transaction.id && !isMobile
                        ? "bg-snow-blue "
                        : ""
                    }`}
                  >
                    <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center border border-light-blue-gray flex-shrink-0">
                      <Image
                        src="/assets/icons/master-card.svg"
                        alt="card"
                        width={24}
                        height={24}
                        className="w-[24px] h-[24px]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-base font-medium font-figtree text-exford-blue">
                        {transaction.title}
                      </p>
                      <p className="truncate text-sm font-figtree text-slate-gray">
                        {transaction.date}
                      </p>
                    </div>
                    <span className="text-base font-bold font-figtree text-slate-600">
                      {transaction.amount}
                    </span>
                    {selectedTransaction !== transaction.id ? (
                      <ChevronRightIcon className="w-5 h-5 text-slate-gray" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* Barre verticale de séparation - cachée sur mobile */}
            <div className="w-px bg-light-blue-gray mx-6 hidden lg:block"></div>

            {/* Panneau détails - caché sur mobile */}
            <div
              className={`flex justify-center gap-2 w-full max-w-[412px] min-h-[728px] font-figtree mt-4 ${
                isMobile ? "hidden" : "block"
              }`}
            >
              {selectedTransaction ? (
                <TransactionDetails
                  montant={
                    history.find((t) => t.id === selectedTransaction)?.amount ||
                    ""
                  }
                  session={
                    history.find((t) => t.id === selectedTransaction)
                      ?.session || ""
                  }
                  expert={
                    history.find((t) => t.id === selectedTransaction)?.expert ||
                    ""
                  }
                  dateHeure={
                    history.find((t) => t.id === selectedTransaction)
                      ?.dateHeure || ""
                  }
                  statut={
                    history.find((t) => t.id === selectedTransaction)?.statut ||
                    "Effectué"
                  }
                  id={
                    history.find((t) => t.id === selectedTransaction)
                      ?.transactionId || ""
                  }
                  isMobile={false}
                />
              ) : (
                <div className="w-full max-w-[412px] border border-light-blue-gray rounded-[16px] p-6 flex items-center justify-center h-[calc(100vh-100px)]">
                  <p className="w-full max-w-[178px] text-base text-center font-medium text-pale-blue-gray">
                    Sélectionnez une transaction pour voir les détails
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Layout 2 colonnes fusionnées - Tablette uniquement (1024px-1140px) */
          <div className="flex-1 w-full max-w-none">
            {/* Barre de recherche - Toujours visible */}
            <div className="w-full flex gap-2 pt-4 px-4 lg:px-6 max-w-[800px] mx-auto">
              <FormField
                label="Rechercher"
                name="search"
                type="text"
                placeholder="Montant, transaction ..."
                leftIcon={
                  <Search className="w-6 h-6 text-slate-gray cursor-pointer" />
                }
                className="h-[48px] flex-1 bg-snow-blue border-none shadow-none placeholder:text-slate-gray text-base"
              />
              <div className="flex-shrink-0">
                <Image
                  src="/assets/icons/card_icon.svg"
                  alt="card"
                  width={48}
                  height={48}
                  className="w-[48px] h-[48px] text-slate-gray cursor-pointer"
                />
              </div>
            </div>
            {/* Contenu fusionné - Liste ou Détails */}
            <div className="mt-6 px-4 lg:px-6 max-w-[800px] mx-auto">
              {!showDetails ? (
                /* Liste des transactions */
                <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-none">
                  {history.map((transaction) => (
                    <div
                      key={transaction.id}
                      onClick={() => handleTransactionClick(transaction.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-[12px] cursor-pointer transition-colors hover:bg-gray-50"
                    >
                      <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center border border-light-blue-gray flex-shrink-0">
                        <Image
                          src="/assets/icons/master-card.svg"
                          alt="card"
                          width={24}
                          height={24}
                          className="w-[24px] h-[24px]"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-base font-medium font-figtree text-exford-blue">
                          {transaction.title}
                        </p>
                        <p className="truncate text-sm font-figtree text-slate-gray">
                          {transaction.date}
                        </p>
                      </div>
                      <span className="text-base font-bold font-figtree text-slate-600">
                        {transaction.amount}
                      </span>
                      <ChevronRightIcon className="w-5 h-5 text-slate-gray" />
                    </div>
                  ))}
                </div>
              ) : (
                /* Panneau de détails - Tablette */
                <div className="max-w-[500px] mx-auto">
                  <button
                    onClick={handleBackToList}
                    className="mb-4 flex items-center gap-2 text-cobalt-blue hover:text-cobalt-blue-600 transition-colors"
                  >
                    <ChevronRightIcon className="w-5 h-5 rotate-180" />
                    Retour à la liste
                  </button>
                  {selectedTransaction && (
                    <TransactionDetails
                      montant={
                        history.find((t) => t.id === selectedTransaction)
                          ?.amount || ""
                      }
                      session={
                        history.find((t) => t.id === selectedTransaction)
                          ?.session || ""
                      }
                      expert={
                        history.find((t) => t.id === selectedTransaction)
                          ?.expert || ""
                      }
                      dateHeure={
                        history.find((t) => t.id === selectedTransaction)
                          ?.dateHeure || ""
                      }
                      statut={
                        history.find((t) => t.id === selectedTransaction)
                          ?.statut || "Effectué"
                      }
                      id={
                        history.find((t) => t.id === selectedTransaction)
                          ?.transactionId || ""
                      }
                      isMobile={false}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {isMobile && showMobileDetail && selectedTransaction && (
          <TransactionDetails
            montant={
              history.find((t) => t.id === selectedTransaction)?.amount || ""
            }
            session={
              history.find((t) => t.id === selectedTransaction)?.session || ""
            }
            expert={
              history.find((t) => t.id === selectedTransaction)?.expert || ""
            }
            dateHeure={
              history.find((t) => t.id === selectedTransaction)?.dateHeure || ""
            }
            statut={
              history.find((t) => t.id === selectedTransaction)?.statut ||
              "Effectué"
            }
            id={
              history.find((t) => t.id === selectedTransaction)
                ?.transactionId || ""
            }
            isMobile={true}
            onBack={handleBackToList}
          />
        )}
      </div>
    </AccountLayout>
  );
}
