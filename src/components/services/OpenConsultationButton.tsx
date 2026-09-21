"use client";

import { useModals } from "@/context/ModalContext";

export default function OpenConsultationButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { openConsultation } = useModals();
  return (
    <button type="button" onClick={openConsultation} className={className}>
      {children}
    </button>
  );
}
