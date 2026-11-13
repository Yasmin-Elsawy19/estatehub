
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, ArrowRight } from "lucide-react";

import properties from "../data/properties";
import PropertyCard from "../components/properties/PropertyCard";
import { useFavorites } from "../hooks/useFavorites";

export default function Favorites() {
  const { t, i18n } = useTranslation();
  const { favorites } = useFavorites();

  const favoriteProperties = properties.filter((property) =>
    favorites.includes(property.id)
  );

  const isArabic = i18n.language.startsWith("ar");

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
            <Heart size={18} />
            {t("favorites.title")}
          </div>

          <h1 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {t("favorites.title")}
          </h1>

          <p className="text-slate-500 dark:text-slate-400">
            {t("favorites.description")}
          </p>
        </div>

        {favoriteProperties.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
              {favoriteProperties.length} {t("propertiesPage.found")}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950">
              <Heart size={36} />
            </div>

            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              {t("favorites.emptyTitle")}
            </h2>

            <p className="mb-7 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
              {t("favorites.emptyDescription")}
            </p>

            <Link
              to="/properties"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {t("favorites.browse")}
              <ArrowRight
                size={18}
                className={isArabic ? "rotate-180" : ""}
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
