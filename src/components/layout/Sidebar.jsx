
import {
  LayoutDashboard,
  Building2,
  Heart,
  Settings,
  LogOut,
  ClipboardCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";
 
export default function Sidebar({ role, setRole }) {
 
   const links = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Properties",
    path: "/dashboard/properties",
    icon: Building2,
  },
  {
    name: "Favorites",
    path: "/favorites",
    icon: Heart,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
  ...(role === "admin"
    ? [
        {
          name: "Property Approvals",
          path: "/dashboard/approvals",
          icon: ClipboardCheck,
        },
      ]
    : []),
];

  return (
    <aside className="flex w-full flex-col border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:min-h-screen lg:w-64">
      {/* Logo */}
      <NavLink
        to="/"
        className="mb-10 text-2xl font-bold text-blue-600"
      >
        EstateHub.
      </NavLink>

      {/* Role Selector */}
      <div className="mb-8">
        <label className="mb-2 block text-sm font-medium text-slate-500 dark:text-slate-400">
          Dashboard Role
        </label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="buyer">Buyer / Renter</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon size={19} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Back to Website */}
      <NavLink
        to="/"
        className="mt-auto hidden items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:flex"
      >
        <LogOut size={19} />
        Back to Website
      </NavLink>
    </aside>
  );
}
