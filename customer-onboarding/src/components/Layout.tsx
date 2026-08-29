import type { ReactNode } from "react";

const NAV = [
  { ico: "▦", label: "Dashboard", key: "dashboard" },
  { ico: "▤", label: "Applications", key: "dashboard" },
  { ico: "⚇", label: "KYC Queue", key: "dashboard" },
  { ico: "▥", label: "Reports", key: "dashboard" },
];

export function Layout({
  title,
  crumb,
  action,
  children,
}: {
  title: string;
  crumb: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="app">
      <header className="topbar">
        <div className="search">⌕ Search applicants, references…</div>
        <div className="spacer" />
        <button className="icon-btn" aria-label="Notifications">
          🔔
        </button>
        <div className="avatar" title="Alex Chen">AC</div>
      </header>

      <aside className="sidebar">
        <div className="brand">
          <div className="logo">N</div>
          <div>
            <div className="name">NorthBridge</div>
            <div className="sub">Onboarding Suite</div>
          </div>
        </div>
        <nav className="nav">
          {NAV.map((n, i) => (
            <a key={i} className={`${i === 0 ? "active" : ""}`} href="#">
              <span className="nav-ico">{n.ico}</span>
              {n.label}
            </a>
          ))}
          <a className="cta" href="#">
            + New Application
          </a>
        </nav>
      </aside>

      <main className="main">
        <div className="breadcrumb">{crumb}</div>
        <div className="page-head">
          <h1 className="page-title">{title}</h1>
          {action}
        </div>
        {children}
      </main>
    </div>
  );
}
