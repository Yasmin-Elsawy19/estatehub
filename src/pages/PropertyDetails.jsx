
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Home,
} from "lucide-react";

import properties from "../data/properties";
import PropertyGallery from "../components/properties/PropertyGallery";

export default function PropertyDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const property = properties.find((item) => item.id === id);

  if (!property) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <Home size={48} className="mb-4 text-slate-400" />

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t("propertyDetails.notFound")}
        </h1>

        <Link
          to="/properties"
          className="mt-5 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          {t("propertyDetails.backToProperties")}
        </Link>
      </section>
    );
  }

  const title = t(`property.titles.${property.id}`, {
    defaultValue: property.title,
  });

  const location = t(`property.locations.${property.id}`, {
    defaultValue: property.location,
  });

  const formattedPrice = new Intl.NumberFormat(
    i18n.language === "ar" ? "ar-EG" : "en-EG"
  ).format(property.price);

  const propertyType = t(`hero.${property.type}`);

  const propertyImages =
    property.images?.length > 0 ? property.images : [property.image];

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Back Link */}
        <Link
          to="/properties"
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600 dark:text-slate-400"
        >
          <ArrowLeft size={18} />
          {t("propertyDetails.backToProperties")}
        </Link>

        {/* Property Gallery + Badges */}
        <div className="relative">
          <PropertyGallery
            key={property.id}
            images={propertyImages}
            title={title}
          />

          <div className="absolute left-5 top-5 z-10 flex gap-2">
            <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
              {t(`property.${property.purpose}`)}
            </span>

            <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-800">
              {t("property.demo")}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Property Information */}
          <div>
            <div className="mb-6">
              <p className="mb-3 text-sm font-semibold text-blue-600">
                {propertyType}
              </p>

              <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                {title}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <MapPin size={19} />
                <span>{location}</span>
              </div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-center">
                <BedDouble className="mx-auto mb-2 text-blue-600" size={24} />
                <p className="font-bold text-slate-900 dark:text-white">
                  {property.bedrooms}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t("property.beds")}
                </p>
              </div>

              <div className="border-x border-slate-200 text-center dark:border-slate-700">
                <Bath className="mx-auto mb-2 text-blue-600" size={24} />
                <p className="font-bold text-slate-900 dark:text-white">
                  {property.bathrooms}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t("property.baths")}
                </p>
              </div>

              <div className="text-center">
                <Maximize2 className="mx-auto mb-2 text-blue-600" size={24} />
                <p className="font-bold text-slate-900 dark:text-white">
                  {property.area}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t("property.areaUnit")}
                </p>
              </div>
            </div>

            {/* Overview */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                {t("propertyDetails.overview")}
              </h2>

              <p className="leading-8 text-slate-600 dark:text-slate-400">
                {t("propertyDetails.description", {
                  title,
                  location,
                  type: propertyType,
                })}
              </p>
            </div>

            {/* Basic Details */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                {t("propertyDetails.details")}
              </h2>

              <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-900">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t("propertyDetails.propertyType")}
                  </p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {propertyType}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t("propertyDetails.purpose")}
                  </p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {t(`property.${property.purpose}`)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t("propertyDetails.bedrooms")}
                  </p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {property.bedrooms}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t("propertyDetails.bathrooms")}
                  </p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {property.bathrooms}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t("propertyDetails.area")}
                  </p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {property.area} {t("property.areaUnit")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Card */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("propertyDetails.price")}
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {formattedPrice}
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {t("property.currency")}
                {property.purpose === "rent" &&
                  ` / ${t("property.month")}`}
              </p>

              <div className="my-6 border-t border-slate-200 dark:border-slate-700" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  {t("propertyDetails.location")}
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {location}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  {t("propertyDetails.area")}
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {property.area} {t("property.areaUnit")}
                </span>
              </div>

              <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
                {t("propertyDetails.demoNotice")}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
