"use client";

import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus, Save, Trash2 } from "lucide-react";
import { deleteGlobalFaq, moveGlobalFaq, saveGlobalFaqs, setGlobalFaqVisibility, type GlobalFaqActionResult, type GlobalFaqInput } from "./actions";

export interface GlobalFaqRow extends GlobalFaqInput {
  id: string;
}

function move<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= items.length) return items;
  const copy = [...items];
  [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
  return copy;
}

export default function GlobalFaqManager({ initialFaqs }: { initialFaqs: GlobalFaqRow[] }) {
  const [faqs, setFaqs] = useState<GlobalFaqInput[]>(initialFaqs);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

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
    const result = await saveGlobalFaqs(faqs);
    setMessage(result.ok ? { ok: true, text: "FAQs saved and published." } : { ok: false, text: result.error });
  });

  return (
    <div className="form-stack">
      {faqs.length === 0 && <div className="admin-card admin-hint">No global FAQs yet. Add your first question below.</div>}

      {faqs.map((faq, index) => (
        <div key={faq.id ?? `new-${index}`} className="admin-card form-stack">
          <div className="repeat-head">
            <h2 className="admin-h2">Question {index + 1}</h2>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button type="button" className="admin-btn icon" aria-label={`Move question ${index + 1} up`} disabled={pending || index === 0} onClick={() => {
                const nextFaqs = move(faqs, index, -1);
                if (!faq.id || !nextFaqs[index].id) return setFaqs(nextFaqs);
                runAction(() => moveGlobalFaq(faq.id!, "up"), nextFaqs, "FAQ order updated.");
              }}><ArrowUp size={18} /></button>
              <button type="button" className="admin-btn icon" aria-label={`Move question ${index + 1} down`} disabled={pending || index === faqs.length - 1} onClick={() => {
                const nextFaqs = move(faqs, index, 1);
                if (!faq.id || !nextFaqs[index].id) return setFaqs(nextFaqs);
                runAction(() => moveGlobalFaq(faq.id!, "down"), nextFaqs, "FAQ order updated.");
              }}><ArrowDown size={18} /></button>
              <button type="button" className="admin-btn" disabled={pending} onClick={() => {
                const nextFaqs = faqs.map((item, itemIndex) => itemIndex === index ? { ...item, is_active: !item.is_active } : item);
                if (!faq.id) return setFaqs(nextFaqs);
                runAction(() => setGlobalFaqVisibility(faq.id!, !faq.is_active), nextFaqs, faq.is_active ? "FAQ hidden from the public page." : "FAQ is now visible on the public page.");
              }}>
                {faq.is_active ? <EyeOff size={18} /> : <Eye size={18} />} {faq.is_active ? "Hide" : "Show"}
              </button>
              <button type="button" className="admin-btn danger" disabled={pending} onClick={() => {
                if (!confirm("Delete this FAQ permanently?")) return;
                const nextFaqs = faqs.filter((_, itemIndex) => itemIndex !== index);
                if (!faq.id) return setFaqs(nextFaqs);
                runAction(() => deleteGlobalFaq(faq.id!), nextFaqs, "FAQ deleted.");
              }}><Trash2 size={18} /> Delete</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label className="admin-label" htmlFor={`faq-question-${index}`}>Question</label>
            <input id={`faq-question-${index}`} className="admin-input" maxLength={300} value={faq.question} onChange={(event) => setFaqs(faqs.map((item, itemIndex) => itemIndex === index ? { ...item, question: event.target.value } : item))} />
            <label className="admin-label" htmlFor={`faq-answer-${index}`}>Answer</label>
            <textarea id={`faq-answer-${index}`} className="admin-input" rows={5} maxLength={2000} value={faq.answer} onChange={(event) => setFaqs(faqs.map((item, itemIndex) => itemIndex === index ? { ...item, answer: event.target.value } : item))} />
          </div>
        </div>
      ))}

      {message && <p role="status" className={message.ok ? "admin-ok" : "admin-error"}>{message.text}</p>}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button type="button" className="admin-btn" disabled={pending || faqs.length === 30} onClick={() => setFaqs([...faqs, { question: "", answer: "", is_active: true }])}><Plus size={18} /> Add question</button>
        <button type="button" className="admin-btn primary" disabled={pending} onClick={save}><Save size={18} /> {pending ? "Saving..." : "Save changes"}</button>
      </div>
    </div>
  );
}
