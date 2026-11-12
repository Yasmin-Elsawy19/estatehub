
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import properties from "../../data/properties";
import PropertyCard from "../properties/PropertyCard";

export default function FeaturedProperties() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith("ar");

  const featuredProperties = properties.filter(
    (property) => property.featured
  );

  return (
    <section className="bg-slate-50 px-5 py-20 dark:bg-slate-950 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 block text-sm font-semibold uppercase tracking-wider text-blue-600">
              {t("featured.eyebrow")}
            </span>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {t("featured.title")}
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-slate-600 dark:text-slate-400">
              {t("featured.description")}
            </p>
          </div>

          <Link
            to="/properties"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
          >
            {t("featured.viewAll")}
            <ArrowRight
              size={18}
              className={isArabic ? "rotate-180" : ""}
            />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
