interface RevenueDisplayProps {
  amount: string;
}

export default function RevenueDisplay({ amount }: RevenueDisplayProps) {
  return (
    <div className="space-y-6 mb-2 md:mb-0">
      {/* TODO: Add currency */}
      <div className="text-6xl font-bold text-cobalt-blue">{amount}</div>
    </div>
  );
}
