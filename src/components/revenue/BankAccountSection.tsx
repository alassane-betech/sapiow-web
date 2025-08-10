import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface BankAccountSectionProps {
  hasBankAccount: boolean;
  onAddBankAccount: () => void;
  onModifyBankAccount: () => void;
}

export default function BankAccountSection({
  hasBankAccount,
  onAddBankAccount,
  onModifyBankAccount,
}: BankAccountSectionProps) {
  return (
    <div className="space-y-6 ml-0 lg:ml-5">
      <h2 className="text-sm font-medium font-figtree text-charcoal-blue hidden lg:block">
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
                  <div className="text-xs font-medium text-gray-600 hidden xl:block">
                    XXX XXXX XXXXXXXXX XXX
                  </div>
                  <div className="text-xs font-medium text-gray-600 xl:hidden">
                    Ajoutez votre RIB
                  </div>
                </div>
                <Button
                  label="Ajouter"
                  onClick={onAddBankAccount}
                  className="border border-light-blue-gray rounded-full text-exford-blue font-bold font-outfit px-4 py-2 mb-6 bg-transparent text-sm shadow-none"
                />
              </>
            ) : (
              // État après ajout : compte Stripe Connect
              <>
                <div className="flex items-center gap-4 pb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">S</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">
                      Stripe Connect
                    </div>
                    <div className="text-xs text-gray-500">FR75•••••4567</div>
                  </div>
                </div>
                <Button
                  label="Modifier"
                  onClick={onModifyBankAccount}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 bg-transparent text-sm pb-6"
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
