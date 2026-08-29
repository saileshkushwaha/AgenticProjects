import { useState } from "react";
import {
  emptyApplicant,
  emptyFinancial,
  type Applicant,
  type FinancialProfile,
} from "../data/mock";
import type {
  KycVerificationResult,
  KycVendorName,
} from "../services/kyc/types";
import { api } from "../services/api";
import { Button, Card, Field, Stepper } from "../components/ui";
import { Layout } from "../components/Layout";

const STEPS = ["Personal", "Contact", "Financial", "Identity", "Review"];
const VENDOR_NAMES: KycVendorName[] = ["onfido", "persona", "jumio"];

const initialResult: KycVerificationResult = {
  document: { status: "Uploaded", docType: "", score: 0 },
  liveness: { status: "Pending" },
  watchlist: { status: "Pending" },
  overallScore: null,
};

export function NewApplication({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [applicant, setApplicant] = useState<Applicant>(emptyApplicant);
  const [financial, setFinancial] = useState<FinancialProfile>(emptyFinancial);
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentData, setConsentData] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [vendorName, setVendorName] = useState<KycVendorName>(
    (import.meta.env.VITE_KYC_VENDOR as KycVendorName) ?? "persona"
  );
  const [docName, setDocName] = useState("");
  const [result, setResult] = useState<KycVerificationResult>(initialResult);
  const [docLoading, setDocLoading] = useState(false);
  const [livenessLoading, setLivenessLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fullName = `${applicant.firstName} ${applicant.lastName}`.trim();

  const setA = (k: keyof Applicant, v: string) =>
    setApplicant((p) => ({ ...p, [k]: v }));
  const setF = (k: keyof FinancialProfile, v: string) =>
    setFinancial((p) => ({ ...p, [k]: v }));

  const validatePersonal = () => {
    const e: Record<string, string> = {};
    if (!applicant.firstName) e.firstName = "Required";
    if (!applicant.lastName) e.lastName = "Required";
    if (!applicant.dob) e.dob = "Required";
    if (!applicant.nationalId) e.nationalId = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !validatePersonal()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const onFile = async (name: string) => {
    setDocName(name);
    setDocLoading(true);
    setResult((r) => ({
      ...r,
      document: { ...r.document, status: "Uploaded" },
      overallScore: null,
    }));
    try {
      const [doc, watch] = await Promise.all([
        api.kycDocument(vendorName, name, fullName),
        api.kycWatchlist(vendorName, fullName, applicant.nationalId),
      ]);
      setResult((r) => ({
        ...r,
        document: doc,
        watchlist: watch,
        overallScore: watch.status === "Hit" ? null : doc.score,
      }));
    } finally {
      setDocLoading(false);
    }
  };

  const onLiveness = async () => {
    setLivenessLoading(true);
    try {
      const l = await api.kycLiveness(vendorName, fullName);
      setResult((r) => ({ ...r, liveness: l }));
    } finally {
      setLivenessLoading(false);
    }
  };

  const onSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await api.createApplication({
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        email: applicant.email,
        nationalId: applicant.nationalId,
        product: "Savings Account",
        consent: consentTerms && consentData,
      });
      onBack();
    } catch (e) {
      setSubmitError((e as Error).message);
      setSubmitting(false);
    }
  };

  const canSubmit = consentTerms && consentData;

  return (
    <Layout
      crumb="Onboarding / New Application"
      title="New Customer Application"
      action={
        <Button variant="ghost" onClick={onBack}>
          Save &amp; exit
        </Button>
      }
    >
      <Card>
        <Stepper steps={STEPS} current={step} />

        {step === 0 && (
          <>
            <h3 className="section-title">Personal Details</h3>
            <div className="row2">
              <Field label="First name" required error={errors.firstName}>
                <input
                  value={applicant.firstName}
                  onChange={(e) => setA("firstName", e.target.value)}
                  placeholder="Jane"
                />
              </Field>
              <Field label="Last name" required error={errors.lastName}>
                <input
                  value={applicant.lastName}
                  onChange={(e) => setA("lastName", e.target.value)}
                  placeholder="Doe"
                />
              </Field>
            </div>
            <div className="row2">
              <Field label="Date of birth" required error={errors.dob}>
                <input
                  type="date"
                  value={applicant.dob}
                  onChange={(e) => setA("dob", e.target.value)}
                />
              </Field>
              <Field label="National ID / SSN" required error={errors.nationalId}>
                <input
                  value={applicant.nationalId}
                  onChange={(e) => setA("nationalId", e.target.value)}
                  placeholder="•••-••-••••"
                />
              </Field>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h3 className="section-title">Contact &amp; Address</h3>
            <div className="row2">
              <Field label="Email" required>
                <input
                  type="email"
                  value={applicant.email}
                  onChange={(e) => setA("email", e.target.value)}
                  placeholder="jane@example.com"
                />
              </Field>
              <Field label="Phone" required>
                <input
                  value={applicant.phone}
                  onChange={(e) => setA("phone", e.target.value)}
                  placeholder="+1 555 000 0000"
                />
              </Field>
            </div>
            <Field label="Residential address" required>
              <input
                value={applicant.addressLine}
                onChange={(e) => setA("addressLine", e.target.value)}
                placeholder="120 Market St, Apt 4B"
              />
            </Field>
            <div className="row2">
              <Field label="City">
                <input
                  value={applicant.city}
                  onChange={(e) => setA("city", e.target.value)}
                />
              </Field>
              <Field label="Postal code">
                <input
                  value={applicant.postalCode}
                  onChange={(e) => setA("postalCode", e.target.value)}
                />
              </Field>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="section-title">Employment &amp; Financial Profile</h3>
            <div className="row2">
              <Field label="Employment status">
                <select
                  value={financial.employmentStatus}
                  onChange={(e) => setF("employmentStatus", e.target.value)}
                >
                  <option value="">Select…</option>
                  <option>Employed</option>
                  <option>Self-employed</option>
                  <option>Student</option>
                  <option>Retired</option>
                  <option>Unemployed</option>
                </select>
              </Field>
              <Field label="Employer">
                <input
                  value={financial.employer}
                  onChange={(e) => setF("employer", e.target.value)}
                />
              </Field>
            </div>
            <div className="row2">
              <Field label="Annual income (USD)">
                <input
                  value={financial.annualIncome}
                  onChange={(e) => setF("annualIncome", e.target.value)}
                  placeholder="85000"
                />
              </Field>
              <Field label="Primary source of funds">
                <input
                  value={financial.sourceOfFunds}
                  onChange={(e) => setF("sourceOfFunds", e.target.value)}
                />
              </Field>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 className="section-title" style={{ margin: 0 }}>
                Identity Verification (KYC)
              </h3>
              <label
                className="hint"
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                Vendor:
                <select
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value as KycVendorName)}
                  style={{
                    padding: "6px 8px",
                    borderRadius: 8,
                    border: "1px solid var(--c-line-2)",
                  }}
                >
                  {VENDOR_NAMES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="split">
              <div>
                <div
                  className="dropzone"
                  onClick={() => onFile(docName || "passport_jane_doe.pdf")}
                >
                  ⤓ Drag &amp; drop or <u>browse</u>
                  <div className="hint" style={{ marginTop: 6 }}>
                    Accepted: PDF, JPG, PNG · max 10 MB
                  </div>
                </div>
                {docName && (
                  <div className="doc-row">
                    <span>📄 {docName}</span>
                    {docLoading ? (
                      <span className="hint">Checking…</span>
                    ) : (
                      <VStatus
                        txt={result.document.status}
                        cls={
                          result.document.status === "Verified"
                            ? "approved"
                            : result.document.status === "Failed"
                            ? "rejected"
                            : "submitted"
                        }
                      />
                    )}
                  </div>
                )}
                <div className="doc-row">
                  <span>🤳 Selfie / Liveness check</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={onLiveness}
                    disabled={livenessLoading}
                  >
                    {livenessLoading
                      ? "…"
                      : result.liveness.status === "Passed"
                      ? "✓ Passed"
                      : result.liveness.status === "Failed"
                      ? "✕ Failed"
                      : "Start"}
                  </Button>
                </div>
              </div>
              <Card>
                <h3 className="section-title">Verification status</h3>
                <div className="dl">
                  <dt>Provider</dt>
                  <dd style={{ textTransform: "capitalize" }}>{vendorName}</dd>
                  <dt>Document</dt>
                  <dd>
                    {result.document.docType || "—"}
                    {result.document.status === "Verified" &&
                      ` · ${result.document.score}`}
                  </dd>
                  <dt>Liveness</dt>
                  <dd>{result.liveness.status}</dd>
                  <dt>Watchlist / PEP</dt>
                  <dd>
                    {result.watchlist.status === "Pending"
                      ? "Pending"
                      : result.watchlist.status === "Clear"
                      ? "✓ Clear"
                      : "⚠ Hit"}
                    {result.watchlist.details ? ` — ${result.watchlist.details}` : ""}
                  </dd>
                  <dt>Risk score</dt>
                  <dd>{result.overallScore ?? "—"}</dd>
                </div>
                <p className="hint" style={{ marginTop: 12 }}>
                  Verification performed by the KYC vendor via the backend{" "}
                  <code>/api/kyc/*</code> proxy. Switch providers with the
                  Vendor selector or <code>VITE_KYC_VENDOR</code>.
                </p>
              </Card>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h3 className="section-title">Review &amp; Consent</h3>
            <div className="stack">
              <div className="summary-group">
                <h4>Personal</h4>
                <dl className="dl">
                  <dt>Name</dt>
                  <dd>
                    {applicant.firstName} {applicant.lastName}
                  </dd>
                  <dt>Date of birth</dt>
                  <dd>{applicant.dob || "—"}</dd>
                  <dt>National ID</dt>
                  <dd>{applicant.nationalId || "—"}</dd>
                </dl>
              </div>
              <div className="summary-group">
                <h4>Contact</h4>
                <dl className="dl">
                  <dt>Email</dt>
                  <dd>{applicant.email || "—"}</dd>
                  <dt>Phone</dt>
                  <dd>{applicant.phone || "—"}</dd>
                  <dt>Address</dt>
                  <dd>
                    {applicant.addressLine}, {applicant.city} {applicant.postalCode}
                  </dd>
                </dl>
              </div>
              <div className="summary-group">
                <h4>Identity (KYC · {vendorName})</h4>
                <dl className="dl">
                  <dt>Document</dt>
                  <dd>{docName || "Not uploaded"}</dd>
                  <dt>Liveness</dt>
                  <dd>{result.liveness.status}</dd>
                  <dt>Watchlist</dt>
                  <dd>{result.watchlist.status}</dd>
                  <dt>Risk score</dt>
                  <dd>{result.overallScore ?? "—"}</dd>
                </dl>
              </div>
              <div>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={consentTerms}
                    onChange={(e) => setConsentTerms(e.target.checked)}
                  />
                  <span>
                    I confirm I have read and accept the product Terms &amp;
                    Conditions.
                  </span>
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={consentData}
                    onChange={(e) => setConsentData(e.target.checked)}
                  />
                  <span>
                    I consent to electronic processing of my data for KYC/AML
                    verification (GDPR/CCPA).
                  </span>
                </label>
              </div>
            </div>
          </>
        )}

        {submitError && <p className="err" style={{ marginTop: 14 }}>{submitError}</p>}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 22,
          }}
        >
          <Button variant="ghost" onClick={prev} disabled={step === 0}>
            ← Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next}>Next →</Button>
          ) : (
            <Button onClick={onSubmit} disabled={!canSubmit || submitting}>
              {submitting ? "Submitting…" : "✓ Submit application"}
            </Button>
          )}
        </div>
      </Card>
    </Layout>
  );
}

function VStatus({ txt, cls }: { txt: string; cls: string }) {
  return <span className={`badge ${cls}`}>{txt}</span>;
}
