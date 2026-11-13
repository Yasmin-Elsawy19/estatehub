
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, SlidersHorizontal, X } from "lucide-react";

import properties from "../data/properties";
import PropertyCard from "../components/properties/PropertyCard";

export default function Properties() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [purpose, setPurpose] = useState(
    searchParams.get("purpose") || "all"
  );
  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );
  const [type, setType] = useState(
    searchParams.get("type") || "all"
  );
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("default");

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (purpose !== "all") {
      result = result.filter(
        (property) => property.purpose === purpose
      );
    }

    if (type !== "all") {
      result = result.filter(
        (property) => property.type === type
      );
    }

    if (location.trim()) {
      result = result.filter((property) =>
        property.location
          .toLowerCase()
          .includes(location.trim().toLowerCase())
      );
    }

    if (minPrice !== "") {
      result = result.filter(
        (property) => property.price >= Number(minPrice)
      );
    }

    if (maxPrice !== "") {
      result = result.filter(
        (property) => property.price <= Number(maxPrice)
      );
    }

    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [purpose, type, location, minPrice, maxPrice, sort]);

  function handleSearch(e) {
    e.preventDefault();

    setSearchParams({
      purpose,
      location,
      type,
    });
  }

  function clearFilters() {
    setPurpose("all");
    setLocation("");
    setType("all");
    setMinPrice("");
    setMaxPrice("");
    setSort("default");
    setSearchParams({});
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            {t("propertiesPage.eyebrow")}
          </p>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {t("propertiesPage.title")}
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
            {t("propertiesPage.description")}
          </p>
        </div>

        {/* Filters */}
        <form
          onSubmit={handleSearch}
          className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal size={19} className="text-blue-600" />
            <h2 className="font-semibold text-slate-900 dark:text-white">
              {t("propertiesPage.filters")}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Purpose */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("propertiesPage.purpose")}
              </label>

              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">{t("propertiesPage.all")}</option>
                <option value="buy">{t("hero.buy")}</option>
                <option value="rent">{t("hero.rent")}</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("hero.location")}
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t("hero.locationPlaceholder")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Property Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("hero.propertyType")}
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">{t("hero.allTypes")}</option>
                <option value="apartment">{t("hero.apartment")}</option>
                <option value="villa">{t("hero.villa")}</option>
                <option value="studio">{t("hero.studio")}</option>
                <option value="chalet">{t("hero.chalet")}</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("propertiesPage.sort")}
              </label>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="default">{t("propertiesPage.default")}</option>
                <option value="low-high">{t("propertiesPage.lowHigh")}</option>
                <option value="high-low">{t("propertiesPage.highLow")}</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("propertiesPage.minPrice")}
              </label>

              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("propertiesPage.maxPrice")}
              </label>

              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="∞"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Search size={17} />
              {t("propertiesPage.search")}
            </button>

            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <X size={16} />
              {t("propertiesPage.clear")}
            </button>
          </div>
        </form>

        {/* Results Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {t("propertiesPage.results")}
          </h2>

          <span className="text-sm text-slate-500 dark:text-slate-400">
            {filteredProperties.length} {t("propertiesPage.found")}
          </span>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center dark:border-slate-700">
            <Search
              size={38}
              className="mx-auto mb-4 text-slate-400"
            />

            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
              {t("propertiesPage.emptyTitle")}
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t("propertiesPage.emptyDescription")}
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 font-semibold text-blue-600 hover:underline"
            >
              {t("propertiesPage.clear")}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
