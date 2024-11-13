'use client'
import React, { useEffect, useState } from "react";
import Card_Recipe from "./Card_Recipe";
import { IRecipe } from "../types/recipeSchema";
import { getAllRecipes } from "../services/recipeServices";

const RecipeList = () => {
  // const recipes = [
  //   {
  //     imageUrl: "https://cdn.dummyjson.com/recipe-images/2.webp",
  //     name: "Spaghetti",
  //     category: "Pasta",
  //     instructions: "Put a cup of flour into the bowl, mix with eggs and salt, knead the dough..."
  //   },
  //   {
  //     imageUrl: "https://cdn.dummyjson.com/recipe-images/5.webp",
  //     name: "Pizza",
  //     category: "Italian",
  //     instructions: "Take the dough and spread it with your hands, add toppings, bake for 20 minutes..."
  //   }
  // ];

  const [recipes, setRecipes] = useState<IRecipe[]>([]);

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe, index) => (
        <Card_Recipe
          key={index}
          imageUrl={recipe.imageUrl}
          name={recipe.name}
          category={recipe.category}
          introduction={recipe.instructions}
        />
      ))}
    </div>
  );
};

export default RecipeList;
