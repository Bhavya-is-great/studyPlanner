import { useState } from "react";
import Navbar from "./components/Navbar";
import PlannerDashboard from "./components/PlannerDashboard";

const App = () => {
  const [activeView, setActiveView] = useState("see-plans");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <PlannerDashboard activeView={activeView} setActiveView={setActiveView} />
    </main>
  )
}

export default App;
