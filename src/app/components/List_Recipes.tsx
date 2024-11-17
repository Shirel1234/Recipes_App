'use client';
import Card_Recipe from "./Card_Recipe";
import { IRecipe } from "../types/recipeSchema";
import { getAllRecipes, updateRecipe } from "../services/recipeServices";
import { useCategoryStore, useIsFavoriteStore, useSearchStore } from "../store/recipeStore";
import ReactPaginate from 'react-paginate';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadSpinner from "./LoadSpinner";
import { useState } from "react";

const RecipeList = () => {
  const recipesPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const categoryStore = useCategoryStore((state) => state.category);
  const searchStore = useSearchStore((state) => state.searchText);
  const isFavoriteStore = useIsFavoriteStore((state) => state.isFavoriteStore);

  const queryClient = useQueryClient();

  const { data: recipes = [], isLoading, error } = useQuery<IRecipe[]>({
    queryKey: ['recipesData'],
    queryFn: getAllRecipes,
  });

  const onToggleFavorite = async (recipe_id: string, currentFavoriteState: boolean) => {
    try {
      // Find the recipe
      const recipe = recipes.find((recipe) => recipe._id === recipe_id);
      if (!recipe) {
        console.error("Recipe not found");
        return;
      }

      // Create an updated recipe object excluding the `_id` field
      const { _id, ...recipeWithoutId } = recipe;
      const updatedRecipe = { ...recipeWithoutId, isFavorite: !currentFavoriteState };
      await updateRecipe(_id, updatedRecipe);

      // Update the local cache
      queryClient.setQueryData<IRecipe[]>(['recipesData'], (oldData) => {
        return oldData?.map((recipe) =>
          recipe._id === recipe_id
            ? { ...recipe, isFavorite: !currentFavoriteState }
            : recipe
        ) as IRecipe[]; // Explicitly cast to IRecipe[]
      });
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  const filteredRecipes = recipes
    .filter((recipe) => (categoryStore ? recipe.category === categoryStore : true))
    .filter((recipe) =>
      searchStore ? recipe.name.toLowerCase().includes(searchStore.toLowerCase()) : true
    )
    .filter((recipe) => (isFavoriteStore ? recipe.isFavorite : true));

  if (isLoading) return <LoadSpinner />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const startIndex = currentPage * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, endIndex);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {currentRecipes.map((recipe, index) => (
          <Card_Recipe
            key={index}
            recipe_id={recipe._id}
            imageUrl={recipe.imageUrl}
            name={recipe.name}
            category={recipe.category}
            instructions={recipe.instructions}
            isFavorite={recipe.isFavorite}
            onToggleFavorite={onToggleFavorite}
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
