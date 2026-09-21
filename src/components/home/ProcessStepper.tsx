"use client";

import { useModals } from "@/context/ModalContext";
import React from "react";
import { 
  FileText, 
  Search, 
  ClipboardCheck, 
  FileCheck2, 
  Users2, 
  Settings2, 
  ShieldCheck 
} from "lucide-react";
import { processSteps, StepItem } from "@/data/siteData";

export default function ProcessStepper() {
  const { openConsultation } = useModals();
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "file-text":
        return <FileText size={22} />;
      case "search":
        return <Search size={22} />;
      case "clipboard-check":
        return <ClipboardCheck size={22} />;
      case "file-check":
        return <FileCheck2 size={22} />;
      case "users":
        return <Users2 size={22} />;
      case "settings":
        return <Settings2 size={22} />;
      case "shield-check":
        return <ShieldCheck size={22} />;
      default:
        return <FileText size={22} />;
    }
  };

  return (
    <section id="how-it-works" style={{ 
      backgroundColor: "#faf7f2", 
      paddingTop: "72px", 
      paddingBottom: "80px", 
      borderBottom: "1px solid #e7dfcf",
      position: "relative" 
    }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 52px" }}>
          <span className="section-tag" style={{ color: "#a47336" }}>
            A SIMPLE 7-STEP PROCESS
          </span>
          <h2 className="section-title" style={{ marginTop: "4px" }}>
            How Vitt Management Works
          </h2>
          <p className="section-subtitle">
            From your old documents to recovered assets — we handle it all.
          </p>
        </div>

        {/* 7 steps: 4 in the first row, 3 centered in the second */}
        <div style={{ marginBottom: "48px" }}>
          <div className="stepper-grid">
            {processSteps.map((step: StepItem) => (
              <div key={step.number} className="stepper-card">
                {/* Number Badge */}
                <div className="step-badge">
                  {step.number}
                </div>

                {/* Icon Wrap */}
                <div className="step-icon-wrap">
                  {getIcon(step.icon)}
                </div>

                {/* Step Title */}
                <h3 className="step-title">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="step-desc">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Action Button */}
        <div style={{ textAlign: "center" }}>
          <button 
            onClick={openConsultation}
            className="btn-primary-gold" 
            style={{ fontSize: "0.96rem", padding: "13px 32px" }}
          >
            Start Your Recovery Journey
          </button>
        </div>

      </div>

    </section>
  );
}
