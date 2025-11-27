"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isCancelling: boolean;
}

export const CancelAppointmentModal = ({
  isOpen,
  onClose,
  onConfirm,
  isCancelling,
}: CancelAppointmentModalProps) => {
  const t = useTranslations();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-exford-blue">
            {t("sessionDetail.cancelAppointment")}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-gray hover:text-exford-blue transition-colors"
            disabled={isCancelling}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-slate-gray mb-4">
            {t("sessionDetail.confirmCancel")}
          </p>
          <p className="text-red-500 font-semibold">
            {t("sessionDetail.cancelWarning")}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isCancelling}
            className="flex-1 px-4 py-3 bg-gray-100 text-exford-blue rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {t("sessionDetail.cancel")}
          </button>
          <button
            onClick={onConfirm}
            disabled={isCancelling}
            className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isCancelling
              ? t("sessionDetail.cancelling")
              : t("sessionDetail.confirmCancelButton")}
          </button>
        </div>
      </div>
    </div>
  );
};
