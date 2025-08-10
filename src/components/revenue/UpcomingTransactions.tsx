import { Transaction } from "@/types/revenue";

interface UpcomingTransactionsProps {
  transactions: Transaction[];
}

export default function UpcomingTransactions({
  transactions,
}: UpcomingTransactionsProps) {
  return (
    <div className="space-y-2 -mt-4">
      <h2 className="text-sm font-medium text-charcoal-blue font-figtree">
        Transactions à venir
      </h2>

      <div className="space-y-3 border border-frost-gray rounded-[12px] p-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-4 px-0"
          >
            <div>
              <div className="text-base font-medium font-figtree text-gray-900">
                {transaction.type}
              </div>
              <div className="text-lg font-bold font-figtree text-gray-900">
                {transaction.amount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
