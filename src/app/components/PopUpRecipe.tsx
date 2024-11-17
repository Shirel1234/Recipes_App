import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getRecipe } from '@/app/services/recipeServices';

interface Recipe {
  imageUrl: string;
  name: string;
  category: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeId: string;
  onToggleFavorite: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  recipeId,
  onToggleFavorite,
}) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      getRecipe(recipeId)
        .then((data) => {
          setRecipe(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching recipe:', error);
          setLoading(false);
        });
    } else {
      setRecipe(null); // Clear data when modal is closed
    }
  }, [isOpen, recipeId]);

  if (!isOpen) return null;

  const handleToggleFavorite = () => {
    if (recipe) {
      // Update the local recipe state
      setRecipe((prevRecipe) =>
        prevRecipe
          ? { ...prevRecipe, isFavorite: !prevRecipe.isFavorite }
          : prevRecipe
      );
    }

    onToggleFavorite();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : recipe ? (
          <div className="flex">
            {/* Image */}
            <div className="w-1/3">
              <Image
                src={recipe.imageUrl}
                alt={recipe.name}
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>

            {/* Recipe Details */}
            <div className="w-2/3 pl-6">
              <h2 className="text-2xl font-semibold">{recipe.name}</h2>
              <div className="flex items-center mt-2">
                <p className="text-lg text-gray-500">{recipe.category}</p>
                <button onClick={handleToggleFavorite} className="ml-4 text-yellow-500">
                  {recipe.isFavorite ? '★' : '☆'}
                </button>
              </div>
              <h3 className="mt-4 font-semibold">Ingredients:</h3>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
              </ul>
              <h3 className="mt-4 font-semibold">Instructions:</h3>
              <p className="text-gray-700">{recipe.instructions}</p>
            </div>
          </div>
        ) : (
          <p>Recipe not found</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
