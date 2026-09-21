"use client";

import React, { createContext, useContext, useState } from "react";
import ConsultationModal from "@/components/modals/ConsultationModal";
import SearchModal from "@/components/modals/SearchModal";

interface ModalContextValue {
  openConsultation: () => void;
  openSearch: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        openConsultation: () => setConsultationOpen(true),
        openSearch: () => setSearchOpen(true),
      }}
    >
      {children}
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </ModalContext.Provider>
  );
}

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals must be used within ModalProvider");
  return ctx;
}
