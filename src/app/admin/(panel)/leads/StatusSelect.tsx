"use client";

import { useState, useTransition } from "react";
import { setLeadStatus } from "./actions";

const OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  const [value, setValue] = useState(status);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <select
        className="admin-input"
        style={{ minWidth: "140px", padding: "9px 12px" }}
        aria-label="Lead status"
        value={value}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value;
          const prev = value;
          setValue(next);
          setError("");
          startTransition(async () => {
            const r = await setLeadStatus(id, next);
            if (!r.ok) {
              setValue(prev);
              setError(r.error ?? "Failed");
            }
          });
        }}
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <div className="admin-error">{error}</div>}
    </div>
  );
}
