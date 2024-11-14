'use client'
import ButtonLink from './Button';
import {useCategoryStore, useIsFavoriteStore, useSearchStore} from '../store/recipeStore';

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

  const categoryStore= useCategoryStore((state)=> state.category);
  const updateCategory = useCategoryStore((state) => state.updateCategory);

  const searchStore= useSearchStore((state)=>state.searchText);
  const updateSearchText= useSearchStore((state)=>state.updateSearchText);

  const updateFavorite=useIsFavoriteStore((state)=>state.updateIsFavorite);

  return (
    <div className="p-4">
      {/* Top Controls */}
      <h1>Recipes</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          {/* Pick a Category */}
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

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchStore}
            onChange={(e) => updateSearchText(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Add Button */}
        <ButtonLink href={'/pages/addRecipe'} text='Add Recipe' />
      </div>

      {/* Navbar Links */}
      <div className="flex justify-center mb-4 space-x-6">
      <button
        onClick={() => updateFavorite(false)}
        className="text-blue-500 hover:underline"
      >
        All Recipes
      </button>
      <button
        onClick={() => updateFavorite(true)}
        className="text-blue-500 hover:underline"
      >
        Favorites
      </button>
    </div>
    </div>
  )
}

export default NevBar
