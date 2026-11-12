
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Menu,
  X,
  Globe,
} from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith("ar");

   useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";

    localStorage.setItem("estatehub-language", isArabic ? "ar" : "en");
  }, [isArabic]);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Change language
  const toggleLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("properties"), path: "/properties" },
    { name: t("favorites"), path: "/favorites" },
  ];

  const linkStyles = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-300
    ${
      isActive
        ? "text-blue-700 dark:text-blue-400"
        : "text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
    }`;

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/90"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-[#142B4A] dark:text-white"
        >
          Estate<span className="text-blue-600">Hub.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={linkStyles}
            >
              {({ isActive }) => (
                <span className="relative py-2">
                  {link.name}

                  {isActive && (
                    <motion.span
                      layoutId="active-link"
                      className="absolute -bottom-1 start-0 h-0.5 w-full rounded-full bg-blue-600"
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Change language"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Globe size={18} />
            {isArabic ? "English" : "العربية"}
          </button>

          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            aria-label="Toggle theme"
            className="rounded-full border border-slate-200 p-2.5 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-yellow-400 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 md:hidden">

          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-slate-700 hover:bg-slate-100 dark:text-yellow-400 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
          >
            {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-blue-400"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-start text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Globe size={18} />
                {isArabic ? "English" : "العربية"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
