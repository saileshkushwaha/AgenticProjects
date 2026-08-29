import { useEffect, useState } from "react";
import type { Application } from "../data/mock";
import { Badge, Button, Card } from "../components/ui";
import { Layout } from "../components/Layout";
import { api } from "../services/api";

export function Dashboard({
  onNew,
  onOpen,
}: {
  onNew: () => void;
  onOpen: (id: string) => void;
}) {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .listApplications()
      .then(setApps)
      .catch(() => setApps([]))
      .finally(() => setLoading(false));
  }, []);

  const inReview = apps.filter((a) => a.status === "In Review").length;
  const approved = apps.filter((a) => a.status === "Approved").length;
  const draft = apps.filter((a) => a.status === "Draft").length;

  return (
    <Layout
      crumb="Onboarding / Overview"
      title="Customer Onboarding"
      action={<Button onClick={onNew}>+ New Application</Button>}
    >
      <div className="grid kpis">
        <Card className="kpi">
          <div className="label">Total applications</div>
          <div className="value">{apps.length}</div>
          <div className="delta up">Live from API</div>
        </Card>
        <Card className="kpi">
          <div className="label">In Review</div>
          <div className="value">{inReview}</div>
          <div className="delta">Median SLA 3.2h</div>
        </Card>
        <Card className="kpi">
          <div className="label">Approved</div>
          <div className="value">{approved}</div>
          <div className="delta up">▲ 4% this week</div>
        </Card>
      </div>

      <div className="grid" style={{ marginTop: 18 }}>
        <Card>
          <h3 className="section-title">Application Queue</h3>
          {loading ? (
            <p className="hint">Loading applications…</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Applicant</th>
                  <th>Product</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {apps.map((a) => (
                  <tr key={a.id}>
                    <td className="link" onClick={() => onOpen(a.id)}>
                      {a.id}
                    </td>
                    <td>{a.applicant}</td>
                    <td className="muted">{a.product}</td>
                    <td className="muted">{a.submitted}</td>
                    <td>
                      <Badge status={a.status} />
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onOpen(a.id)}
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="hint" style={{ marginTop: 14 }}>
            {draft} draft(s) pending submission · {approved} approved
          </div>
        </Card>
      </div>
    </Layout>
  );
}
