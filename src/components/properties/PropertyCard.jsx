
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  ArrowUpRight,
} from "lucide-react";

export default function PropertyCard({ property }) {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith("ar");

  const formattedPrice = new Intl.NumberFormat(
    isArabic ? "ar-EG" : "en-EG"
  ).format(property.price);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute start-4 top-4 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
          {t(`property.${property.purpose}`)}
        </span>

        <span className="absolute end-4 top-4 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 backdrop-blur">
          {t("property.demo")}
        </span>
      </div>

      <div className="p-5">
        <p className="mb-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <MapPin size={16} className="shrink-0 text-blue-600" />
          {t(`property.locations.${property.id}`)}
        </p>

        <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          {t(`property.titles.${property.id}`)}
        </h3>

        <div className="mb-5 flex flex-wrap items-center gap-4 border-b border-slate-100 pb-5 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <BedDouble size={17} />
            {property.bedrooms} {t("property.beds")}
          </span>

          <span className="flex items-center gap-1.5">
            <Bath size={17} />
            {property.bathrooms} {t("property.baths")}
          </span>

          <span className="flex items-center gap-1.5">
            <Ruler size={17} />
            {property.area} {t("property.areaUnit")}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-blue-700 dark:text-blue-400">
              {formattedPrice}
            </p>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {t("property.currency")}
              {property.purpose === "rent"
                ? ` / ${t("property.month")}`
                : ""}
            </span>
          </div>

          <Link
            to={`/properties/${property.id}`}
            aria-label={t("property.viewDetails")}
            className="flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-white"
          >
            <ArrowUpRight
              size={20}
              className={isArabic ? "rotate-[-90deg]" : ""}
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
