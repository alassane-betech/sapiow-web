import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface HowItWorksCardProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export default function HowItWorksCard({
  iconSrc,
  iconAlt,
  title,
  description,
}: HowItWorksCardProps) {
  return (
    <Card className="border-soft-ice-gray bg-snow-blue shadow-none max-w-[233px] p-0">
      <CardContent className="p-6 text-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-soft-ice-gray mb-4">
          <Image src={iconSrc} alt={iconAlt} width={20} height={20} />
        </div>
        <h3 className="text-sm text-left font-semibold mb-2 font-inter">
          {title}
        </h3>
        <p className="text-sm text-left text-gray-700 font-figtree">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
