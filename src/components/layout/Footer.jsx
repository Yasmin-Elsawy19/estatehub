
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <Link
          to="/"
          className="text-lg font-bold text-[#142B4A] dark:text-white"
        >
          Estate<span className="text-blue-600">Hub.</span>
        </Link>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} EstateHub. Eng.Yasmin Elsawy.
        </p>
      </div>
    </footer>
  );
}
