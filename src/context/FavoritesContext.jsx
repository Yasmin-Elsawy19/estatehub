 import { useState } from "react";
 import { FavoritesContext } from "./favorites-context";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("estatehub-favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  function toggleFavorite(propertyId) {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(propertyId)
        ? prevFavorites.filter((id) => id !== propertyId)
        : [...prevFavorites, propertyId];

      localStorage.setItem(
        "estatehub-favorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  }

  function isFavorite(propertyId) {
    return favorites.includes(propertyId);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}