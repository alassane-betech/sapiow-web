import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaymentHistoryItem } from "@/types/revenue";

interface PaymentHistoryProps {
  payments: PaymentHistoryItem[];
}

export default function PaymentHistory({ payments }: PaymentHistoryProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium font-figtree text-charcoal-blue">
        Historique des paiements
      </h2>

      <div className="space-y-2">
        {payments.map((payment, index) => (
          <div
            key={payment.id}
            className={`flex items-center justify-between py-3 px-0 ${
              index === payments.length - 1
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
                <div className="text-base font-medium font-figtree text-exford-blue">
                  {payment.title}
                </div>
                <div className="text-sm font-figtree text-slate-gray">
                  {payment.date}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-base font-bold font-figtree text-slate-600">
                {payment.amount}
              </div>
              <div
                className={`text-xs font-inter bg-snow-blue font-bold rounded-[100px] px-2 py-1 h-[24px] ${
                  payment.status === "Payé"
                    ? "text-exford-blue"
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
  );
}
