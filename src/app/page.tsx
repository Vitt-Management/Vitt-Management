"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import ProcessStepper from "@/components/ProcessStepper";
import PeaceOfMind from "@/components/PeaceOfMind";
import OldDocumentsBanner from "@/components/OldDocumentsBanner";
import StatsBar from "@/components/StatsBar";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import SearchModal from "@/components/SearchModal";

export default function HomePage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Navbar
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main style={{ flex: 1 }}>
        <Hero onOpenConsultation={() => setConsultationOpen(true)} />
        <ServicesGrid onOpenConsultation={() => setConsultationOpen(true)} />
        <ProcessStepper onOpenConsultation={() => setConsultationOpen(true)} />
        <PeaceOfMind />
        <OldDocumentsBanner onOpenConsultation={() => setConsultationOpen(true)} />
        <StatsBar />
        <Testimonials />
        <CtaBanner onOpenConsultation={() => setConsultationOpen(true)} />
      </main>

      <Footer />

      {/* Modals */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
