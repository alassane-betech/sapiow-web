import AccordionItem from "./AccordionItem";

interface AccordionData {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionData[];
  className?: string;
}

export default function Accordion({ items, className = "" }: AccordionProps) {
  return (
    <div className={`space-y-4 cursor-pointer ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          defaultOpen={item.defaultOpen}
        />
      ))}
    </div>
  );
}
