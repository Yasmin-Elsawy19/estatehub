
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Home, ArrowRight } from "lucide-react";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [purpose, setPurpose] = useState("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const isArabic = i18n.language.startsWith("ar");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      purpose,
      location,
      type: propertyType,
    });

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative isolate overflow-hidden bg-slate-950">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=85"
          alt="Modern luxury house"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/25" />

      <div className="mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-5 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            <MapPin size={16} />
            {t("hero.badge")}
          </span>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {t("hero.title")}
            <span className="mt-2 block text-blue-400">
              {t("hero.highlight")}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            {t("hero.description")}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 max-w-4xl rounded-2xl bg-white p-4 shadow-2xl dark:bg-slate-900 sm:p-6"
        >
          <div className="mb-5 flex gap-3">
            {["buy", "rent"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPurpose(item)}
                className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition ${
                  purpose === item
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {t(`hero.${item}`)}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_auto]">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {t("hero.location")}
              </span>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
                <MapPin size={19} className="shrink-0 text-blue-600" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t("hero.locationPlaceholder")}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                />
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {t("hero.propertyType")}
              </span>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
                <Home size={19} className="shrink-0 text-blue-600" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-700 outline-none dark:text-white"
                >
                  <option value="">{t("hero.allTypes")}</option>
                  <option value="apartment">{t("hero.apartment")}</option>
                  <option value="villa">{t("hero.villa")}</option>
                  <option value="studio">{t("hero.studio")}</option>
                  <option value="chalet">{t("hero.chalet")}</option>
                </select>
              </div>
            </label>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 self-end rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              <Search size={19} />
              {t("hero.search")}
              <ArrowRight
                size={17}
                className={isArabic ? "rotate-180" : ""}
              />
            </button>
          </div>
        </motion.form>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80">
          <span>{t("hero.trust1")}</span>
          <span>{t("hero.trust2")}</span>
          <span>{t("hero.trust3")}</span>
        </div>
      </div>
    </section>
  );
}
