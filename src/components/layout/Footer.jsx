
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const links = [
    { label: t("home"), path: "/" },
    { label: t("properties"), path: "/properties" },
    { label: t("favorites.nav"), path: "/favorites" },
    { label: t("dashboard"), path: "/dashboard" },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo & Description */}
        <div className="text-center sm:text-start">
          <Link
            to="/"
            className="text-xl font-bold text-[#142B4A] dark:text-white"
          >
            Estate<span className="text-blue-600">Hub.</span>
          </Link>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t("footer.description")}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-7 max-w-7xl border-t border-slate-100 pt-5 text-center dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} EstateHub. {t("footer.rights")}
        </p>

        <p className="mt-2 text-sm font-medium text-[#2563EB] dark:text-blue-400">
          {t("footer.credit")}
        </p>
      </div>
    </footer>
  );
}
