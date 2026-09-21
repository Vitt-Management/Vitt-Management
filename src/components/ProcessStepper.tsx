"use client";

import React from "react";
import { 
  FileText, 
  Search, 
  ClipboardCheck, 
  FileCheck2, 
  Users2, 
  Settings2, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";
import { processSteps, StepItem } from "@/data/siteData";

interface ProcessStepperProps {
  onOpenConsultation: () => void;
}

export default function ProcessStepper({ onOpenConsultation }: ProcessStepperProps) {
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

        {/* 7-Step Connected Layout */}
        <div style={{ position: "relative", marginBottom: "48px" }}>
          
          {/* Connector Line (Desktop) */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "40px",
            right: "40px",
            height: "2px",
            background: "linear-gradient(90deg, #e7decb 0%, #b88646 50%, #e7decb 100%)",
            zIndex: 1,
            display: "none"
          }} className="stepper-connector-line" />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "14px",
            position: "relative",
            zIndex: 2
          }} className="stepper-grid">
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
            onClick={onOpenConsultation}
            className="btn-primary-gold" 
            style={{ fontSize: "0.96rem", padding: "13px 32px" }}
          >
            Start Your Recovery Journey <ArrowRight size={16} />
          </button>
        </div>

      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .stepper-connector-line {
            display: block !important;
          }
        }
        @media (max-width: 1200px) {
          .stepper-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 768px) {
          .stepper-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .stepper-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
