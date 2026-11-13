
import { useState } from "react";

export default function PropertyGallery({ images = [], title }) {
  const [activeImage, setActiveImage] = useState(images[0] || "");

  if (!images.length) return null;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        <img
          src={activeImage}
          alt={title}
          className="h-[280px] w-full object-cover sm:h-[420px]"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            aria-label={`View image ${index + 1}`}
            aria-pressed={activeImage === image}
            className={`overflow-hidden rounded-xl border-2 transition ${
              activeImage === image
                ? "border-blue-600"
                : "border-transparent hover:border-slate-300"
            }`}
          >
            <img
              src={image}
              alt={`${title} - ${index + 1}`}
              className="h-20 w-full object-cover sm:h-24"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
