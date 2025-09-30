import { Input } from "@/components/ui/input";
import { Mic, Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ placeholder, className = "" }: SearchBarProps) {
  const t = useTranslations();

  return (
    <div className={`px-4 mb-5 pt-0 ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder={placeholder || t("search.placeholder")}
          className="pl-10 pr-10 bg-gray-50 border-none"
        />
        <Mic className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>
    </div>
  );
}
