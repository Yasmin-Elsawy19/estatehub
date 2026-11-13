
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/Dashboard/Dashboard";
import AgentProperties from "./pages/Dashboard/AgentProperties";
import AdminProperties from "./pages/Dashboard/AdminProperties";

export default function App() {
  return (
    <Routes>
      {/* Main Website */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="properties" element={<AgentProperties />}
         />
        <Route path="approvals" element={<AdminProperties />} />
      </Route>
    </Routes>
  );
}
