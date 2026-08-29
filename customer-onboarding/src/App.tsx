import { useState } from "react";
import { Dashboard } from "./screens/Dashboard";
import { NewApplication } from "./screens/NewApplication";
import { ApplicationDetail } from "./screens/ApplicationDetail";

type View = { name: "dashboard" } | { name: "new" } | { name: "detail"; id: string };

export default function App() {
  const [view, setView] = useState<View>({ name: "dashboard" });

  if (view.name === "new")
    return <NewApplication onBack={() => setView({ name: "dashboard" })} />;

  if (view.name === "detail")
    return (
      <ApplicationDetail
        id={view.id}
        onBack={() => setView({ name: "dashboard" })}
      />
    );

  return (
    <Dashboard
      onNew={() => setView({ name: "new" })}
      onOpen={(id) => setView({ name: "detail", id })}
    />
  );
}
