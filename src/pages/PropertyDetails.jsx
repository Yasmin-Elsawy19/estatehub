import { useParams } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams();

  return (
    <section className="min-h-screen px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Property Details
      </h1>

      <p className="mt-3 text-slate-500">
        Property ID: {id}
      </p>
    </section>
  );
}