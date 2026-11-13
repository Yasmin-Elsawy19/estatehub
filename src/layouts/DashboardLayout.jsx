
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout() {
  const [role, setRole] = useState("buyer");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 lg:flex">
      <Sidebar role={role} setRole={setRole} />

      <main className="min-w-0 flex-1 p-5 sm:p-8">
        <Outlet context={{ role }} />
      </main>
    </div>
  );
}
