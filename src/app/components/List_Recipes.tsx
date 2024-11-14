'use client'
import Card_Recipe from "./Card_Recipe";
import { IRecipe } from "../types/recipeSchema";
import { getAllRecipes, updateRecipe } from "../services/recipeServices";
import { useCategoryStore, useIsFavoriteStore, useSearchStore } from "../store/recipeStore";
import { useQuery } from "@tanstack/react-query";
import LoadSpinner from "./LoadSpinner";

const RecipeList = () => {
  // const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const categoryStore= useCategoryStore((state)=> state.category);
  const searchStore= useSearchStore((state)=>state.searchText);
  const isFavoriteStore=useIsFavoriteStore((state)=>state.isFavoriteStore);

 // Request query
  const { data: recipes = [], isLoading, error } = useQuery<IRecipe[]>({
    queryKey: ['recipesData'],
    queryFn: getAllRecipes,
  });


  const onToggleFavorite = async (recipe_id: string, currentFavoriteState: boolean) => {
    try {
      const updatedRecipeList = recipes.map((recipe) =>
        recipe._id === recipe_id ? { ...(recipe as IRecipe), isFavorite: !currentFavoriteState } : recipe
      );
      // setRecipes(updatedRecipeList);

      const updatedRecipe = updatedRecipeList.find(recipe => recipe._id === recipe_id);
      if (updatedRecipe) {
        await updateRecipe(recipe_id, updatedRecipe);
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };
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

    // Request query
  console.log("yfciytcyi", isLoading) 
  if (isLoading) return <LoadSpinner/>;
  if (error instanceof Error) return <div>Error: {error.message}</div>

 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredRecipes.map((recipe, index) => (
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
  );
};

export default RecipeList;
