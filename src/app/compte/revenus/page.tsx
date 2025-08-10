"use client";

import AddBankAccountModal from "@/components/common/AddBankAccountModal";
import BankAccountSection from "@/components/revenue/BankAccountSection";
import PaymentHistory from "@/components/revenue/PaymentHistory";
import RevenueDisplay from "@/components/revenue/RevenueDisplay";
import RevenueFilters from "@/components/revenue/RevenueFilters";
import UpcomingTransactions from "@/components/revenue/UpcomingTransactions";
import { paymentHistory, upcomingTransactions } from "@/data/mockRevenue";
import { useState } from "react";
import AccountLayout from "../AccountLayout";

export default function Revenus() {
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Ce mois-ci");

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

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <AccountLayout>
      <div className="space-y-8 mt-2.5 px-4 lg:px-2 xl:px-4">
        {/* Section principale des revenus */}
        <div className="p-4 bg-soft-ice-gray rounded-[16px] relative before:content-[''] before:absolute before:top-6 before:bottom-6 before:left-1/2 before:w-px before:bg-frost-gray before:transform before:-translate-x-1/2 before:hidden lg:before:block">
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-2">
            {/* Total des gains section */}
            <div className="space-y-6">
              <h2 className="text-sm font-medium text-charcoal-blue font-figtree">
                Total des gains
              </h2>
              <RevenueFilters
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
              />
              <RevenueDisplay amount="4 280 €" />
            </div>

            {/* Compte bancaire section */}
            <BankAccountSection
              hasBankAccount={hasBankAccount}
              onAddBankAccount={handleAddBankAccount}
              onModifyBankAccount={handleModifyBankAccount}
            />
          </div>
        </div>

        {/* Section Transactions à venir */}
        <UpcomingTransactions transactions={upcomingTransactions} />

        {/* Section Historique des paiements */}
        <PaymentHistory payments={paymentHistory} />
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
