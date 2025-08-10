export interface Transaction {
  id: number;
  type: string;
  amount: string;
  date: string;
}

export interface PaymentHistoryItem {
  id: number;
  title: string;
  date: string;
  amount: string;
  status: "Payé" | "En attente";
  avatar: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface BankAccountData {
  hasBankAccount: boolean;
  accountInfo?: {
    name: string;
    accountNumber: string;
    icon: string;
  };
}
