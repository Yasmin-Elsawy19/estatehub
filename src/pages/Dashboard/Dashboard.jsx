
import { useOutletContext } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import  properties  from "../../data/properties";
import {
  Building2,
  Heart,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "estatehub-agent-properties";

export default function Dashboard() {
  const { role } = useOutletContext();
  const { favorites } = useFavorites();

  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : properties;
    } catch {
      return properties;
    }
  });

  useEffect(() => {
    function syncListings() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        setListings(saved ? JSON.parse(saved) : properties);
      } catch {
        setListings(properties);
      }
    }

    window.addEventListener("storage", syncListings);
    return () => window.removeEventListener("storage", syncListings);
  }, []);

  const dashboardInfo = {
    buyer: {
      title: "Welcome Back!",
      description: "Manage your property search and saved listings.",
      cards: [
        {
          title: "Favorite Properties",
          value: favorites.length,
          icon: Heart,
        },
        {
          title: "Available Properties",
          value: properties.length,
          icon: Building2,
        },
      ],
    },

    agent: {
      title: "Agent Dashboard",
      description: "Manage your property listings and submissions.",
      cards: [
        {
          title: "My Properties",
          value: listings.length,
          icon: Building2,
        },
        {
          title: "Pending Listings",
          value: listings.filter((item) => item.status === "Pending").length,
          icon: Clock,
        },
      ],
    },

    admin: {
      title: "Admin Dashboard",
      description: "Monitor listings and manage platform activity.",
      cards: [
        {
          title: "Total Properties",
          value: listings.length,
          icon: Building2,
        },
        {
          title: "Pending Approvals",
          value: listings.filter((item) => item.status === "Pending").length,
          icon: Clock,
        },
        {
          title: "Approved Properties",
          value: listings.filter((item) => item.status === "Approved").length,
          icon: CheckCircle,
        },
      ],
    },
  };

  const currentDashboard = dashboardInfo[role] || dashboardInfo.buyer;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium capitalize text-blue-600">
          {role} Dashboard
        </p>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {currentDashboard.title}
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {currentDashboard.description}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {currentDashboard.cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <Icon size={23} />
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {card.title}
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Recent Activity
        </h2>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          No recent activity to display yet.
        </p>
      </div>
    </div>
  );
}
