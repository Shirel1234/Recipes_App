'use client'
import Image from 'next/image';
import Modal from './PopUpRecipe';
import { useState } from 'react';

interface RecipeProps {
  recipe_id: string;
  imageUrl: string;
  name: string;
  category: string;
  instructions: string;
  isFavorite: boolean;
  onToggleFavorite: (recipe_id: string, currentFavoriteState: boolean) => void;
}

const Card_Recipe: React.FC<RecipeProps> = ({ recipe_id, imageUrl, name, category, instructions, isFavorite, onToggleFavorite }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shortInstructions = instructions.length > 50 ? instructions.slice(0, 50) + '...' : instructions;

  const handleToggleFavorite = () => {
    onToggleFavorite(recipe_id, isFavorite);
  };

  return (
    <div className="max-w-[16rem] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Recipe Card */}
      <Image src={imageUrl} alt={name} width={400} height={200} className="w-full h-40 object-cover rounded-t-lg" />
      <div className="p-4">
        <div className="flex items-center justify-between mt-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          <button onClick={handleToggleFavorite} className="ml-4 text-yellow-500">
            {isFavorite ? '★' : '☆'}
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
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default Card_Recipe;
