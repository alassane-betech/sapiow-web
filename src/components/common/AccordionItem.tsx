"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function AccordionItem({
  question,
  answer,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="border-0 border-b border-[#E9EAEB] shadow-none p-0 rounded-none">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <h3 className="font-bold text-cool-toned pr-4">{question}</h3>
          <div className="flex-shrink-0">
            {isOpen ? (
              <Image
                src="/assets/icons/minus-circle.svg"
                alt=""
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/assets/icons/plus-circle.svg"
                alt=""
                width={20}
                height={20}
              />
            )}
          </div>
        </button>
        {isOpen && (
          <div className="px-4 pb-4">
            <p className="text-sm font-medium text-[#535862]  leading-relaxed">
              {answer}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
