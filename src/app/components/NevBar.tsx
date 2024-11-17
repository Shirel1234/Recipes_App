'use client'
import ButtonLink from './Button';
import { useCategoryStore, useIsFavoriteStore, useSearchStore } from '../store/recipeStore';
import { useState } from 'react';

const NevBar = () => {
  const categories = [
    'Italian',
    'Mexican',
    'Chinese',
    'Indian',
    'French',
    'Dessert',
    'Salad',
    'Soup',
    'Vegan',
    'Beverage',
  ];

  const categoryStore = useCategoryStore((state) => state.category);
  const updateCategory = useCategoryStore((state) => state.updateCategory);

  const searchStore = useSearchStore((state) => state.searchText);
  const updateSearchText = useSearchStore((state) => state.updateSearchText);

  const isFavoriteStore = useIsFavoriteStore((state) => state.isFavoriteStore);
  const updateFavorite = useIsFavoriteStore((state) => state.updateIsFavorite);

  const [selectedTab, setSelectedTab] = useState(isFavoriteStore ? "Favorites" : "All Recipes");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    updateFavorite(tab === "Favorites");
  };

  return (
    <div className="sticky top-0 bg-gray-50 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <select
            value={categoryStore}
            onChange={(e) => updateCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Pick a Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search recipes..."
            value={searchStore}
            onChange={(e) => updateSearchText(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        <ButtonLink href={'/pages/addRecipe'} text='Add Recipe' />
      </div>

      <div className="flex mb-4">
        <button
          onClick={() => handleTabClick("All Recipes")}
          className={`px-4 py-2 ${selectedTab === "All Recipes"
            ? "font-semibold text-blue-500 border-b-2 border-blue-500"
            : "text-gray-500 hover:text-blue-500"
            }`}
        >
          All Recipes
        </button>
        <button
          onClick={() => handleTabClick("Favorites")}
          className={`px-4 py-2 ${selectedTab === "Favorites"
            ? "font-semibold text-blue-500 border-b-2 border-blue-500"
            : "text-gray-500 hover:text-blue-500"
            }`}
        >
          Favorites
        </button>
      </div>
    </div>
  );
};

export default NevBar;
