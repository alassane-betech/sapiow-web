"use client";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import VideoConsultationUI from "./video-consultation-ui";

interface VideoConsultationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoConsultation({
  isOpen,
  onClose,
}: VideoConsultationProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full p-0 !bg-white border-none">
        <div className="relative w-full h-full">
          <VideoConsultationUI onClose={onClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
