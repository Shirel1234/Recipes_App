'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from './PopUpRecipe';
import { updateRecipe } from '../services/recipeServices';

interface RecipeProps {
  recipe_id: string
  imageUrl: string;
  name: string;
  category: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

const Card_Recipe: React.FC<RecipeProps> = ({ recipe_id, imageUrl, name, category, ingredients, instructions, isFavorite }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoriteState, setFavoriteState] = useState(isFavorite);
  const [recipe, setRecipe] = useState<RecipeProps>();

  useEffect(() => {
    setRecipe({
      recipe_id: recipe_id,
      name,
      category,
      imageUrl,
      ingredients,
      instructions,
      isFavorite,
    });
  }, [recipe_id, name, category, imageUrl, ingredients, instructions, isFavorite]);

  const shortInstructions = instructions.length > 50 ? instructions.slice(0, 50) + '...' : instructions;

  const onToggleFavorite = async () => {
    try {
      const updatedFavoriteState = !isFavoriteState;
      setFavoriteState(updatedFavoriteState);

      if (recipe) {
        const updatedRecipe = { ...recipe, isFavorite: updatedFavoriteState };
        setRecipe(updatedRecipe);

        await updateRecipe(recipe_id, updatedRecipe);
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  return (
    <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Recipe Card */}
      <Image src={imageUrl} alt={name} width={400} height={224} className="w-full h-56 object-cover rounded-t-lg" />
      <div className="p-4">
        <div className="flex items-center justify-between mt-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          <button onClick={onToggleFavorite} className="ml-4 text-yellow-500">
            {isFavoriteState ? '★' : '☆'}
          </button>
        </div>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-gray-700 mt-2">{shortInstructions}</p>

        <button
          className="mt-4 px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Read More
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipeId={recipe_id}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};

export default Card_Recipe;
