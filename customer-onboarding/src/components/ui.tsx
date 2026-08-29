import type { ReactNode } from "react";
import type { AppStatus } from "../data/mock";
import { statusClass } from "../data/mock";

export function Card({
  children,
  className = "",
  pad = true,
}: {
  children: ReactNode;
  className?: string;
  pad?: boolean;
}) {
  return (
    <div className={`card ${pad ? "card-pad" : ""} ${className}`}>{children}</div>
  );
}

export function Badge({ status }: { status: AppStatus }) {
  return (
    <span className={`badge ${statusClass[status]}`}>
      <span className="dot" />
      {status}
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  size,
  disabled,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "danger";
  size?: "sm";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${size ? "btn-" + size : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <label>
        {label}
        {required && <span className="req"> *</span>}
      </label>
      {children}
      {error && <span className="err">{error}</span>}
    </div>
  );
}

export function Stepper({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <div className="stepper" aria-label="Progress">
      {steps.map((s, i) => (
        <div key={s} style={{ display: "contents" }}>
          <div
            className={`step ${i === current ? "active" : ""} ${
              i < current ? "done" : ""
            }`}
          >
            <div className="num">{i < current ? "✓" : i + 1}</div>
            <div className="name">{s}</div>
          </div>
          {i < steps.length - 1 && (
            <div className={`step-line ${i < current ? "done" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
}
