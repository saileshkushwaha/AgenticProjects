import { useEffect, useState } from "react";
import type { Application } from "../data/mock";
import { Badge, Button, Card, Field } from "../components/ui";
import { Layout } from "../components/Layout";
import { api } from "../services/api";

export function ApplicationDetail({
  id,
  onBack,
}: {
  id: string;
  onBack: () => void;
}) {
  const [app, setApp] = useState<Application | null>(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getApplication(id)
      .then(setApp)
      .catch((e) => setError(e.message));
  }, [id]);

  const decide = async (decision: "Approved" | "Rejected") => {
    setBusy(true);
    setError(null);
    try {
      const updated = await api.decide(id, { decision, reason });
      setApp(updated);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (error && !app) {
    return (
      <Layout
        crumb="Onboarding / Applications"
        title="Not found"
        action={<Button variant="ghost" onClick={onBack}>← Back</Button>}
      >
        <Card>
          <p className="hint">{error}</p>
        </Card>
      </Layout>
    );
  }

  if (!app) {
    return (
      <Layout
        crumb="Onboarding / Applications"
        title="Loading…"
        action={<Button variant="ghost" onClick={onBack}>← Back</Button>}
      >
        <Card>
          <p className="hint">Loading application…</p>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout
      crumb={`Onboarding / Applications / ${app.id}`}
      title={app.id}
      action={<Button variant="ghost" onClick={onBack}>← Back</Button>}
    >
      <div className="split">
        <div className="stack">
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div className="muted" style={{ fontSize: 13 }}>
                  {app.product}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>
                  {app.applicant}
                </div>
              </div>
              <Badge status={app.status} />
            </div>
          </Card>

          <Card>
            <h3 className="section-title">Review decision</h3>
            <Field label="Decision reason (required for rejection)">
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Watchlist match — escalate to compliance."
              />
            </Field>
            {error && <p className="err">{error}</p>}
            <div style={{ display: "flex", gap: 10 }}>
              <Button onClick={() => decide("Approved")} disabled={busy}>
                ✓ Approve
              </Button>
              <Button
                variant="danger"
                onClick={() => decide("Rejected")}
                disabled={busy || !reason.trim()}
              >
                ✕ Reject
              </Button>
              <Button variant="ghost" disabled={busy}>
                Request info
              </Button>
            </div>
          </Card>
        </div>

        <Card>
          <h3 className="section-title">Status timeline</h3>
          <ul className="timeline">
            {app.timeline.map((t, i) => (
              <li key={i} className={t.state}>
                <span className="tl-dot" />
                <span className="tl-line" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                    {t.label}
                  </div>
                  <div className="muted" style={{ fontSize: 12.5 }}>
                    {t.time}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Layout>
  );
}
