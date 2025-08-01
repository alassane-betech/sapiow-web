"use client";

import AddBankAccountModal from "@/components/common/AddBankAccountModal";
import { Button } from "@/components/common/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import AccountLayout from "../AccountLayout";

// Données pour les transactions à venir
const upcomingTransactions = [
  {
    id: 1,
    type: "Dernier virement",
    amount: "1 200 €",
    date: "15 avril 2025",
  },
  {
    id: 2,
    type: "Prochain virement",
    amount: "1 300 €",
    date: "15 mai 2025",
  },
];

// Données pour l'historique des paiements
const paymentHistory = [
  {
    id: 1,
    title: "60-minute Deep Dive",
    date: "12 fév. 2025, 10:39",
    amount: "120€",
    status: "Payé",
    avatar: "/assets/prof.jpg",
  },
  {
    id: 2,
    title: "Session rapide de 30 minutes",
    date: "14 mars 2025, 10:39",
    amount: "89€",
    status: "Payé",
    avatar: "/assets/prof1.jpg",
  },
  {
    id: 3,
    title: "Appel stratégique de 45 minutes",
    date: "20 avr. 2025, 14:00",
    amount: "75€",
    status: "En attente",
    avatar: "/assets/prof2.jpg",
  },
  {
    id: 4,
    title: "Atelier complet de 2 heures",
    date: "05 mai 2025, 09:00",
    amount: "250€",
    status: "Payé",
    avatar: "/assets/prof.jpg",
  },
  {
    id: 5,
    title: "Consultation spécialisée de 1 heure",
    date: "10 mai 2025, 15:30",
    amount: "150€",
    status: "Payé",
    avatar: "/assets/prof1.jpg",
  },
];

export default function Revenus() {
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
  const [hasBankAccount, setHasBankAccount] = useState(false); // Changé à true pour montrer l'état Stripe

  const handleAddBankAccount = () => {
    setIsAddBankModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddBankModalOpen(false);
  };

  const handleBankAccountAdded = () => {
    setHasBankAccount(true);
    setIsAddBankModalOpen(false);
  };

  const handleModifyBankAccount = () => {
    setIsAddBankModalOpen(true);
  };

  return (
    <AccountLayout>
      <div className="space-y-8 ml-4 mt-2.5">
        {/* Section principale des revenus */}
        <div className="p-6 bg-soft-ice-gray rounded-[16px] relative before:content-[''] before:absolute before:top-6 before:bottom-6 before:left-1/2 before:w-px before:bg-frost-gray before:transform before:-translate-x-1/2 before:hidden lg:before:block">
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-2">
            {/* Total des gains section */}
            <div className="space-y-6">
              <h2 className="text-sm font-medium text-charcoal-blue">
                Total des gains
              </h2>

              {/* Filter buttons */}
              <div className="flex gap-3">
                <Button
                  label="Ce mois-ci"
                  variant="default"
                  className="bg-blue-100 text-blue-900 hover:bg-blue-200 rounded-full px-6"
                />
                <Button
                  label="Ce trimestre"
                  variant="ghost"
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full px-6"
                />
                <Button
                  label="Personnalisé"
                  variant="ghost"
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full px-6 flex items-center gap-2"
                />
              </div>

              {/* Amount display */}
              <div className="text-6xl font-bold text-cobalt-blue">4 280 €</div>
            </div>

            {/* Votre Compte bancaire section */}
            <div className="space-y-6 ml-5">
              <h2 className="text-sm font-medium text-charcoal-blue">
                Votre Compte bancaire
              </h2>

              <Card className="bg-white border-gray-200 h-[60px]">
                <CardContent className="p-4 h-full flex items-center">
                  <div className="flex items-center justify-between w-full">
                    {!hasBankAccount ? (
                      // État initial : pas de compte bancaire
                      <>
                        <div className="flex items-center gap-4 pb-6">
                          <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                            <Image
                              src="/assets/icons/bank.svg"
                              alt="Bank"
                              width={24}
                              height={24}
                            />
                          </div>
                          <div className="text-base font-medium text-gray-600">
                            XXX XXXX XXXXXXXXX XXX
                          </div>
                        </div>
                        <Button
                          label="Ajouter"
                          onClick={handleAddBankAccount}
                          className="border border-light-blue-gray rounded-full text-exford-blue font-bold font-outfit px-4 py-2 mb-6 bg-transparent text-sm shadow-none"
                        />
                      </>
                    ) : (
                      // État après ajout : compte Stripe Connect
                      <>
                        <div className="flex items-center gap-4 pb-6">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">
                              S
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-sm font-medium text-gray-900">
                              Stripe Connect
                            </div>
                            <div className="text-xs text-gray-500">
                              FR75•••••4567
                            </div>
                          </div>
                        </div>
                        <Button
                          label="Modifier"
                          onClick={handleModifyBankAccount}
                          className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 bg-transparent text-sm pb-6"
                        />
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Section Transactions à venir */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-charcoal-blue">
            Transactions à venir
          </h2>

          <div className="space-y-3 border border-frost-gray rounded-[12px] p-4">
            {upcomingTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-4 px-0"
              >
                <div>
                  <div className="text-base font-medium text-gray-900">
                    {transaction.type}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {transaction.amount}
                  </div>
                </div>
                <div className="text-sm text-gray-500">{transaction.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Historique des paiements */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-charcoal-blue">
            Historique des paiements
          </h2>

          <div className="space-y-2">
            {paymentHistory.map((payment, index) => (
              <div
                key={payment.id}
                className={`flex items-center justify-between py-3 px-0 ${
                  index === paymentHistory.length - 1
                    ? "border-b-0"
                    : "border-b border-soft-ice-gray"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={payment.avatar} alt="Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-base font-medium text-exford-blue">
                      {payment.title}
                    </div>
                    <div className="text-sm text-slate-gray">
                      {payment.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-semibold text-gray-900">
                    {payment.amount}
                  </div>
                  <div
                    className={`text-xs font-inter bg-snow-blue font-bold rounded-[100px] px-2 py-1 h-[24px] ${
                      payment.status === "Payé"
                        ? "text-[#475569]"
                        : "text-[#CC5802]"
                    }`}
                  >
                    {payment.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal pour ajouter un compte bancaire */}
      <AddBankAccountModal
        isOpen={isAddBankModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleBankAccountAdded}
      />
    </AccountLayout>
  );
}
