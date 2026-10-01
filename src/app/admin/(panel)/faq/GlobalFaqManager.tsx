"use client";

import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus, Save, Trash2 } from "lucide-react";
import { deleteGlobalFaq, moveGlobalFaq, saveGlobalFaqs, setGlobalFaqVisibility, type GlobalFaqActionResult, type GlobalFaqInput } from "./actions";

export interface GlobalFaqRow extends GlobalFaqInput {
  id: string;
  category: "general" | "fees";
}

function move<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= items.length) return items;
  const copy = [...items];
  [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
  return copy;
}

export default function GlobalFaqManager({ initialFaqs }: { initialFaqs: GlobalFaqRow[] }) {
  const [faqs, setFaqs] = useState<GlobalFaqInput[]>(
    initialFaqs.map((f) => ({ ...f, category: f.category ?? "general" }))
  );
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const generalFaqs = faqs.filter((f) => f.category !== "fees");
  const feesFaqs = faqs.filter((f) => f.category === "fees");

  const runAction = (action: () => Promise<GlobalFaqActionResult>, nextFaqs: GlobalFaqInput[], successMessage: string) => startTransition(async () => {
    const result = await action();
    if (result.ok) {
      setFaqs(nextFaqs);
      setMessage({ ok: true, text: successMessage });
    } else {
      setMessage({ ok: false, text: result.error });
    }
  });

  const save = () => startTransition(async () => {
    const ordered = [...generalFaqs, ...feesFaqs].map((f) => ({
      ...f,
      category: (f.category === "fees" ? "fees" : "general") as "general" | "fees",
    }));
    const result = await saveGlobalFaqs(ordered);
    setMessage(result.ok ? { ok: true, text: "FAQs saved and published." } : { ok: false, text: result.error });
  });

  const addGeneral = () => {
    setFaqs([...generalFaqs, { question: "", answer: "", is_active: true, category: "general" }, ...feesFaqs]);
  };

  const addFees = () => {
    setFaqs([...generalFaqs, ...feesFaqs, { question: "", answer: "", is_active: true, category: "fees" }]);
  };

  const moveGeneral = (index: number, direction: -1 | 1) => {
    const targetFaq = generalFaqs[index];
    const nextGeneral = move(generalFaqs, index, direction);
    const nextFaqs = [...nextGeneral, ...feesFaqs];
    const targetMoved = nextGeneral[index + direction];
    if (!targetFaq.id || !targetMoved?.id) {
      setFaqs(nextFaqs);
      return;
    }
    runAction(() => moveGlobalFaq(targetFaq.id!, direction === -1 ? "up" : "down"), nextFaqs, "FAQ order updated.");
  };

  const moveFees = (index: number, direction: -1 | 1) => {
    const targetFaq = feesFaqs[index];
    const nextFees = move(feesFaqs, index, direction);
    const nextFaqs = [...generalFaqs, ...nextFees];
    const targetMoved = nextFees[index + direction];
    if (!targetFaq.id || !targetMoved?.id) {
      setFaqs(nextFaqs);
      return;
    }
    runAction(() => moveGlobalFaq(targetFaq.id!, direction === -1 ? "up" : "down"), nextFaqs, "FAQ order updated.");
  };

  const toggleGeneralVisibility = (index: number) => {
    const faq = generalFaqs[index];
    const nextGeneral = generalFaqs.map((item, idx) => idx === index ? { ...item, is_active: !item.is_active } : item);
    const nextFaqs = [...nextGeneral, ...feesFaqs];
    if (!faq.id) {
      setFaqs(nextFaqs);
      return;
    }
    runAction(() => setGlobalFaqVisibility(faq.id!, !faq.is_active), nextFaqs, faq.is_active ? "FAQ hidden from the public page." : "FAQ is now visible on the public page.");
  };

  const toggleFeesVisibility = (index: number) => {
    const faq = feesFaqs[index];
    const nextFees = feesFaqs.map((item, idx) => idx === index ? { ...item, is_active: !item.is_active } : item);
    const nextFaqs = [...generalFaqs, ...nextFees];
    if (!faq.id) {
      setFaqs(nextFaqs);
      return;
    }
    runAction(() => setGlobalFaqVisibility(faq.id!, !faq.is_active), nextFaqs, faq.is_active ? "FAQ hidden from the public page." : "FAQ is now visible on the public page.");
  };

  const deleteGeneral = (index: number) => {
    if (!confirm("Delete this FAQ permanently?")) return;
    const faq = generalFaqs[index];
    const nextGeneral = generalFaqs.filter((_, idx) => idx !== index);
    const nextFaqs = [...nextGeneral, ...feesFaqs];
    if (!faq.id) {
      setFaqs(nextFaqs);
      return;
    }
    runAction(() => deleteGlobalFaq(faq.id!), nextFaqs, "FAQ deleted.");
  };

  const deleteFees = (index: number) => {
    if (!confirm("Delete this FAQ permanently?")) return;
    const faq = feesFaqs[index];
    const nextFees = feesFaqs.filter((_, idx) => idx !== index);
    const nextFaqs = [...generalFaqs, ...nextFees];
    if (!faq.id) {
      setFaqs(nextFaqs);
      return;
    }
    runAction(() => deleteGlobalFaq(faq.id!), nextFaqs, "FAQ deleted.");
  };

  return (
    <div className="form-stack">
      {/* Section 1: General FAQs */}
      <div className="admin-card form-stack">
        <div className="repeat-head" style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px" }}>
          <div>
            <h2 className="admin-h2">General</h2>
            <p className="admin-hint">Questions about Vitt Management, processes, and general inquiries.</p>
          </div>
          <button type="button" className="admin-btn" disabled={pending || faqs.length >= 60} onClick={addGeneral}>
            <Plus size={18} /> Add question
          </button>
        </div>

        {generalFaqs.length === 0 && <div className="admin-hint" style={{ padding: "12px 0" }}>No general FAQs yet. Add a question above.</div>}

        {generalFaqs.map((faq, index) => (
          <div key={faq.id ?? `general-new-${index}`} className="repeat-item">
            <div className="repeat-head">
              <span className="admin-h2" style={{ fontSize: "1.1rem" }}>Question {index + 1}</span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="admin-btn icon"
                  aria-label={`Move general question ${index + 1} up`}
                  disabled={pending || index === 0}
                  onClick={() => moveGeneral(index, -1)}
                >
                  <ArrowUp size={18} />
                </button>
                <button
                  type="button"
                  className="admin-btn icon"
                  aria-label={`Move general question ${index + 1} down`}
                  disabled={pending || index === generalFaqs.length - 1}
                  onClick={() => moveGeneral(index, 1)}
                >
                  <ArrowDown size={18} />
                </button>
                <button
                  type="button"
                  className="admin-btn"
                  disabled={pending}
                  onClick={() => toggleGeneralVisibility(index)}
                >
                  {faq.is_active ? <EyeOff size={18} /> : <Eye size={18} />} {faq.is_active ? "Hide" : "Show"}
                </button>
                <button
                  type="button"
                  className="admin-btn danger"
                  disabled={pending}
                  onClick={() => deleteGeneral(index)}
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label className="admin-label" htmlFor={`general-question-${index}`}>Question</label>
              <input
                id={`general-question-${index}`}
                className="admin-input"
                maxLength={300}
                value={faq.question}
                onChange={(event) => {
                  const updatedGeneral = generalFaqs.map((item, idx) => idx === index ? { ...item, question: event.target.value } : item);
                  setFaqs([...updatedGeneral, ...feesFaqs]);
                }}
              />
              <label className="admin-label" htmlFor={`general-answer-${index}`}>Answer</label>
              <textarea
                id={`general-answer-${index}`}
                className="admin-input"
                rows={5}
                maxLength={2000}
                value={faq.answer}
                onChange={(event) => {
                  const updatedGeneral = generalFaqs.map((item, idx) => idx === index ? { ...item, answer: event.target.value } : item);
                  setFaqs([...updatedGeneral, ...feesFaqs]);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Section 2: Fees, Documents & Privacy */}
      <div className="admin-card form-stack">
        <div className="repeat-head" style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px" }}>
          <div>
            <h2 className="admin-h2">Fees, Documents &amp; Privacy</h2>
            <p className="admin-hint">Questions about service charges, document collection, data safety, and privacy.</p>
          </div>
          <button type="button" className="admin-btn" disabled={pending || faqs.length >= 60} onClick={addFees}>
            <Plus size={18} /> Add question
          </button>
        </div>

        {feesFaqs.length === 0 && <div className="admin-hint" style={{ padding: "12px 0" }}>No fees &amp; privacy FAQs yet. Add a question above.</div>}

        {feesFaqs.map((faq, index) => (
          <div key={faq.id ?? `fees-new-${index}`} className="repeat-item">
            <div className="repeat-head">
              <span className="admin-h2" style={{ fontSize: "1.1rem" }}>Question {index + 1}</span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="admin-btn icon"
                  aria-label={`Move fees question ${index + 1} up`}
                  disabled={pending || index === 0}
                  onClick={() => moveFees(index, -1)}
                >
                  <ArrowUp size={18} />
                </button>
                <button
                  type="button"
                  className="admin-btn icon"
                  aria-label={`Move fees question ${index + 1} down`}
                  disabled={pending || index === feesFaqs.length - 1}
                  onClick={() => moveFees(index, 1)}
                >
                  <ArrowDown size={18} />
                </button>
                <button
                  type="button"
                  className="admin-btn"
                  disabled={pending}
                  onClick={() => toggleFeesVisibility(index)}
                >
                  {faq.is_active ? <EyeOff size={18} /> : <Eye size={18} />} {faq.is_active ? "Hide" : "Show"}
                </button>
                <button
                  type="button"
                  className="admin-btn danger"
                  disabled={pending}
                  onClick={() => deleteFees(index)}
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label className="admin-label" htmlFor={`fees-question-${index}`}>Question</label>
              <input
                id={`fees-question-${index}`}
                className="admin-input"
                maxLength={300}
                value={faq.question}
                onChange={(event) => {
                  const updatedFees = feesFaqs.map((item, idx) => idx === index ? { ...item, question: event.target.value } : item);
                  setFaqs([...generalFaqs, ...updatedFees]);
                }}
              />
              <label className="admin-label" htmlFor={`fees-answer-${index}`}>Answer</label>
              <textarea
                id={`fees-answer-${index}`}
                className="admin-input"
                rows={5}
                maxLength={2000}
                value={faq.answer}
                onChange={(event) => {
                  const updatedFees = feesFaqs.map((item, idx) => idx === index ? { ...item, answer: event.target.value } : item);
                  setFaqs([...generalFaqs, ...updatedFees]);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {message && <p role="status" className={message.ok ? "admin-ok" : "admin-error"}>{message.text}</p>}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button type="button" className="admin-btn primary" disabled={pending} onClick={save}>
          <Save size={18} /> {pending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}
