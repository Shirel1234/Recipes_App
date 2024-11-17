'use client'
import Image from 'next/image';
import Modal from './PopUpRecipe';
import { useState } from 'react';
import { useIsFavoriteStore } from '../store/recipeStore';

interface RecipeProps {
  recipe_id: string;
  imageUrl: string;
  name: string;
  category: string;
  instructions: string;
  isFavorite: boolean;
  onToggleFavorite: (recipe_id: string, currentFavoriteState: boolean) => void;
}

const Card_Recipe: React.FC<RecipeProps> = ({
  recipe_id,
  imageUrl,
  name,
  category,
  instructions,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFavoriteStore = useIsFavoriteStore((state) => state.isFavoriteStore);

  const shortInstructions =
    instructions.length > 50 ? instructions.slice(0, 50) + '...' : instructions;

  const handleToggleFavorite = () => {
    onToggleFavorite(recipe_id, isFavorite);
    if (isModalOpen && isFavoriteStore) setIsModalOpen(false);
  };

  return (
    <div className="h-200 max-w-[12rem] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Recipe Card */}
      <Image
        src={imageUrl}
        alt={name}
        width={400}
        height={200}
        className="w-full h-30 object-cover rounded-t-lg"
      />
      <div className="px-2 flex flex-col flex-grow">
        <div className="flex justify-between items-center mt-2">
          <h3 className="text-l font-semibold">{name}</h3>
          <button onClick={handleToggleFavorite} className="text-yellow-500">
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-xs text-gray-700 mt-2 flex-grow">{shortInstructions}</p>
      </div>
      <div className="p-1">
        <button
          className="text-xs px-1 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
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
