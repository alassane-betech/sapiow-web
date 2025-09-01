import { useListProPayouts } from "@/api/pro-payouts/useProPayouts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function PaymentHistory() {
  const { data: payouts, isLoading, error } = useListProPayouts();

  // Fonction pour formater la date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Fonction pour formater le montant
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100); // amount est en centimes
  };

  // Fonction pour mapper le statut
  const mapStatus = (status: string): "Payé" | "En attente" => {
    return status === "succeeded" ? "Payé" : "En attente";
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-sm font-medium font-figtree text-charcoal-blue">
          Historique des paiements
        </h2>
        <div className="text-center py-8">
          <div className="animate-pulse text-slate-gray">Chargement...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-sm font-medium font-figtree text-charcoal-blue">
          Historique des paiements
        </h2>
        <div className="text-center py-8">
          <div className="text-red-500">
            Erreur lors du chargement des paiements
          </div>
        </div>
      </div>
    );
  }

  const payments = payouts?.payments || [];
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium font-figtree text-charcoal-blue">
        Historique des paiements
      </h2>

      <div className="space-y-2">
        {payments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-slate-gray">Aucun paiement trouvé</div>
          </div>
        ) : (
          payments.map((payment, index) => (
            <div
              key={payment.payment_intent_id}
              className={`flex items-center justify-between py-3 px-0 ${
                index === payments.length - 1
                  ? "border-b-0"
                  : "border-b border-soft-ice-gray"
              }`}
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    {payment.appointment.patients.first_name.charAt(0)}
                    {payment.appointment.patients.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-base font-medium font-figtree text-exford-blue">
                    {payment.appointment.patients.first_name}{" "}
                    {payment.appointment.patients.last_name}
                  </div>
                  <div className="text-sm font-figtree text-slate-gray">
                    {formatDate(payment.created)} •{" "}
                    {payment.appointment.sessions.name}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold font-figtree text-slate-600">
                  {formatAmount(payment.amount, payment.currency)}
                </div>
                <div
                  className={`text-xs font-inter bg-snow-blue font-bold rounded-[100px] px-2 py-1 h-[24px] ${
                    mapStatus(payment.status) === "Payé"
                      ? "text-exford-blue"
                      : "text-[#CC5802]"
                  }`}
                >
                  {mapStatus(payment.status)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
