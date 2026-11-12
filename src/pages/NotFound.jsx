export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>

      <h2 className="text-2xl font-semibold mt-4 text-slate-900 dark:text-white">
        Page Not Found
      </h2>

      <p className="mt-2 text-slate-500">
        Sorry, the page you're looking for doesn't exist.
      </p>

      <a
        href="/"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Back to Home
      </a>
    </section>
  );
}