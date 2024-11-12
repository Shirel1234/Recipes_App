import React from "react";
import Card_Recipe from "./Card_Recipe";

const RecipeList = () => {
  const recipes = [
    {
      imageUrl: "https://cdn.dummyjson.com/recipe-images/2.webp",
      name: "Spaghetti",
      category: "Pasta",
      introduction: "Put a cup of flour into the bowl, mix with eggs and salt, knead the dough..."
    },
    {
      imageUrl: "https://cdn.dummyjson.com/recipe-images/5.webp",
      name: "Pizza",
      category: "Italian",
      introduction: "Take the dough and spread it with your hands, add toppings, bake for 20 minutes..."
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe, index) => (
        <Card_Recipe
          key={index}
          imageUrl={recipe.imageUrl}
          name={recipe.name}
          category={recipe.category}
          introduction={recipe.introduction}
        />
      ))}
    </div>
  );
};

export default RecipeList;
