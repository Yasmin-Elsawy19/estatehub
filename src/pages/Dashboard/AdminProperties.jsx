
import { useEffect, useState } from "react";
import { Check, X, Clock, Building2 } from "lucide-react";
import  properties  from "../../data/properties";

const STORAGE_KEY = "estatehub-agent-properties";

export default function AdminProperties() {
  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      return saved
        ? JSON.parse(saved)
        : properties.map((property, index) => ({
            ...property,
            status: index === 0 ? "Approved" : "Pending",
          }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  }, [listings]);

  function updateStatus(id, status) {
    setListings((current) =>
      current.map((property) =>
        property.id === id ? { ...property, status } : property
      )
    );
  }

  const pendingListings = listings.filter(
    (property) => property.status === "Pending"
  );

  const statusStyles = {
    Approved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Admin Dashboard
        </p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Property Approvals
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Review submitted properties and manage their approval status.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Listings", value: listings.length },
          { label: "Pending", value: pendingListings.length },
          {
            label: "Approved",
            value: listings.filter((item) => item.status === "Approved").length,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {item.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {listings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <Building2 className="mx-auto mb-3 text-slate-400" size={35} />
            <p className="text-slate-500 dark:text-slate-400">
              No properties have been submitted yet.
            </p>
          </div>
        ) : (
          listings.map((property) => (
            <div
              key={property.id}
              className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center"
            >
              <img
                src={property.image}
                alt={property.title}
                className="h-40 w-full rounded-xl object-cover sm:w-48"
              />

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h2 className="font-bold text-slate-900 dark:text-white">
                    {property.title}
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[property.status] || statusStyles.Pending}`}
                  >
                    {property.status}
                  </span>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {property.location}
                </p>

                <p className="mt-2 font-semibold text-blue-600">
                  EGP {Number(property.price).toLocaleString("en-EG")}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {property.type} · {property.purpose}
                </p>
              </div>

              {property.status === "Pending" && (
                <div className="flex gap-2 sm:flex-col">
                  <button
                    type="button"
                    onClick={() => updateStatus(property.id, "Approved")}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-700"
                  >
                    <Check size={17} />
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={() => updateStatus(property.id, "Rejected")}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50"
                  >
                    <X size={17} />
                    Reject
                  </button>
                </div>
              )}

              {property.status !== "Pending" && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock size={16} />
                  Reviewed
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
