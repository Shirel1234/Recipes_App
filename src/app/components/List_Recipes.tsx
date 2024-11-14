'use client'
import React, { useEffect, useState } from "react";
import Card_Recipe from "./Card_Recipe";
import { IRecipe } from "../types/recipeSchema";
import { getAllRecipes } from "../services/recipeServices";
import { useCategoryStore, useIsFavoriteStore, useSearchStore } from "../store/recipeStore";
import ReactPaginate from 'react-paginate';

const RecipeList = () => {
  const recipesPerPage = 3;
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // `react-paginate` is zero-based

  const categoryStore = useCategoryStore((state) => state.category);
  const searchStore = useSearchStore((state) => state.searchText);
  const isFavoriteStore = useIsFavoriteStore((state) => state.isFavorite);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data || []);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        setRecipes([]);
      }
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes
    .filter((recipe) => categoryStore ? recipe.category === categoryStore : true)
    .filter((recipe) => searchStore ? recipe.name.toLowerCase().includes(searchStore.toLowerCase()) : true)
    .filter((recipe) => isFavoriteStore ? recipe.isFavorite : true);

  // Calculate indexes for the current page recipes
  const startIndex = currentPage * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, endIndex);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentRecipes.map((recipe, index) => (
          <Card_Recipe
            key={index}
            recipe_id={recipe._id}
            imageUrl={recipe.imageUrl}
            name={recipe.name}
            category={recipe.category}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            isFavorite={recipe.isFavorite}
          />
        ))}
      </div>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(filteredRecipes.length / recipesPerPage)}
        onPageChange={handlePageClick}
        containerClassName={'pagination flex justify-center mt-8'}
        pageClassName={'mx-2'}
        activeClassName={'text-blue-500 font-bold'}
        previousClassName={'mx-2'}
        nextClassName={'mx-2'}
        disabledClassName={'text-gray-400'}
      />
    </div>
  );
};

export default RecipeList;
