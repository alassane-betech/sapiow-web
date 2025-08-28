"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  options?: string[]; // Options personnalisées (disponibles)
  disabledOptions?: string[]; // Options désactivées mais visibles
  conflictOptions?: string[]; // Options en conflit (background rouge)
}

const timeOptions = [
  "08h00",
  "08h30",
  "09h00",
  "09h30",
  "10h00",
  "10h30",
  "11h00",
  "11h30",
  "12h00",
  "12h30",
  "13h00",
  "13h30",
  "14h00",
  "14h30",
  "15h00",
  "15h30",
  "16h00",
  "16h30",
  "17h00",
  "17h30",
  "18h00",
  "18h30",
  "19h00",
  "19h30",
];

export default function TimeSelect({
  value,
  onValueChange,
  className = "w-24 bg-white border border-light-blue-gray text-exford-blue font-bold text-sm",
  options,
  disabledOptions = [],
  conflictOptions = [],
}: TimeSelectProps) {
  // Utiliser les options par défaut si aucune option personnalisée n'est fournie
  const baseOptions = options || timeOptions;
  
  // Créer la liste complète sans tri pour éviter les re-renders
  const allOptions = baseOptions.map(time => time);
  
  const handleValueChange = (newValue: string) => {
    // Vérifier si l'option est dans les options de base (disponibles)
    const isInBaseOptions = baseOptions.includes(newValue);
    const isConflict = conflictOptions.includes(newValue);
    const isDisabled = disabledOptions.includes(newValue);
    
    console.log(`TimeSelect: Tentative de sélection de ${newValue}`, {
      isInBaseOptions,
      isConflict,
      isDisabled,
      conflictOptions,
      disabledOptions,
      baseOptions: baseOptions
    });
    
    // Seulement permettre la sélection si l'option est dans baseOptions ET n'est ni en conflit ni désactivée
    if (isInBaseOptions && !isConflict && !isDisabled) {
      console.log(`TimeSelect: APPELANT onValueChange avec ${newValue}`);
      onValueChange(newValue);
      console.log(`TimeSelect: onValueChange appelé avec ${newValue}`);
    } else {
      console.log(`TimeSelect: Sélection bloquée pour ${newValue} - inBase:${isInBaseOptions}, conflit:${isConflict}, disabled:${isDisabled}`);
    }
  };
  
  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="text-sm font-bold bg-white border border-light-blue-gray max-h-[172px] overflow-y-auto">
        {allOptions.map((time) => {
          const isDisabled = disabledOptions.includes(time);
          const isConflict = conflictOptions.includes(time);
          const shouldDisable = isDisabled || isConflict;
          
          return (
            <SelectItem 
              key={time} 
              value={time} 
              disabled={shouldDisable}
              className={`cursor-pointer ${
                isConflict
                  ? 'bg-red-100 text-red-600 cursor-not-allowed opacity-75 hover:bg-red-100'
                  : isDisabled
                    ? 'text-gray-300 cursor-not-allowed opacity-50' 
                    : 'hover:bg-gray-50'
              }`}
            >
              {time}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
