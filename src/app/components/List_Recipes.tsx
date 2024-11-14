'use client'
import React, { useEffect, useState } from "react";
import Card_Recipe from "./Card_Recipe";
import { IRecipe } from "../types/recipeSchema";
import { getAllRecipes } from "../services/recipeServices";
import { useCategoryStore, useIsFavoriteStore, useSearchStore } from "../store/recipeStore";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const categoryStore= useCategoryStore((state)=> state.category);
  const searchStore= useSearchStore((state)=>state.searchText);
  const isFavoriteStore=useIsFavoriteStore((state)=>state.isFavorite);


  useEffect(() => {
    const fetchRecipes = async () => {
      try{
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
  .filter((recipe) => {
    // Filter by category if category is set, otherwise include all
    return categoryStore ? recipe.category === categoryStore : true;
  })
  .filter((recipe) => {
    // Filter by search text if search text is set, otherwise include all
    return searchStore ? recipe.name.toLowerCase().includes(searchStore.toLowerCase()) : true;
  })
  .filter((recipe) => {
    // Filter by favorite status if isFavorite is true, otherwise include all
    return isFavoriteStore ? recipe.isFavorite : true;
  });
 console.log("the list: ",filteredRecipes );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredRecipes.map((recipe, index) => (
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
  );
};

export default RecipeList;
