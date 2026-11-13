
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Building2 } from "lucide-react";
import properties from "../../data/properties";

const STORAGE_KEY = "estatehub-agent-properties";

const initialProperties = properties.map((property, index) => ({
  ...property,
  status: index === 0 ? "Approved" : "Pending",
}));

const emptyForm = {
  title: "",
  location: "",
  price: "",
  type: "apartment",
  purpose: "buy",
  bedrooms: 2,
  bathrooms: 1,
  area: "",
};

export default function AgentProperties() {
  const [myProperties, setMyProperties] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialProperties;
    } catch {
      return initialProperties;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(myProperties));
  }, [myProperties]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function openAddForm() {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  }

  function openEditForm(property) {
    setEditingId(property.id);
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price,
      type: property.type,
      purpose: property.purpose,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
    });
    setShowForm(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      setMyProperties((prev) =>
        prev.map((property) =>
          property.id === editingId
            ? {
                ...property,
                ...formData,
                price: Number(formData.price),
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                area: Number(formData.area),
                status: "Pending",
              }
            : property
        )
      );
    } else {
      const newProperty = {
        ...formData,
        id: `agent-${Date.now()}`,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
        images: [],
        featured: false,
        status: "Pending",
      };

      setMyProperties((prev) => [newProperty, ...prev]);
    }

    setShowForm(false);
    setFormData(emptyForm);
    setEditingId(null);
  }

  function deleteProperty(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    setMyProperties((prev) =>
      prev.filter((property) => property.id !== id)
    );
  }

  function getStatusStyle(status) {
    const styles = {
      Approved:
        "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
      Pending:
        "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
      Rejected:
        "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    };

    return styles[status] || styles.Pending;
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            My Properties
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your property listings.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Property
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {editingId ? "Edit Property" : "Add New Property"}
            </h2>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-slate-500 hover:text-red-500"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Property title"
              required
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <input
              name="price"
              type="number"
              min="1"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price in EGP"
              required
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
              <option value="chalet">Chalet</option>
            </select>

            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="buy">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

            <input
              name="area"
              type="number"
              min="1"
              value={formData.area}
              onChange={handleChange}
              placeholder="Area (m²)"
              required
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <input
              name="bedrooms"
              type="number"
              min="0"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="Bedrooms"
              required
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <input
              name="bathrooms"
              type="number"
              min="0"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="Bathrooms"
              required
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {editingId ? "Save Changes" : "Create Listing"}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Properties List */}
      {myProperties.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
          <Building2 className="mx-auto mb-4 text-slate-400" size={40} />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            No Properties Yet
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Add your first property listing to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {myProperties.map((property) => (
              <div
                key={property.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-28 w-full rounded-xl object-cover sm:w-36"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {property.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {property.location}
                  </p>

                  <p className="mt-2 font-semibold text-blue-600">
                    {new Intl.NumberFormat("en-EG").format(property.price)} EGP
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(property.status)}`}
                  >
                    {property.status}
                  </span>

                  <button
                    onClick={() => openEditForm(property)}
                    aria-label={`Edit ${property.title}`}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteProperty(property.id)}
                    aria-label={`Delete ${property.title}`}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
