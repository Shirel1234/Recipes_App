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

const Card_Recipe: React.FC<RecipeProps> = ({ recipe_id, imageUrl, name, category, instructions, isFavorite, onToggleFavorite }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFavoriteStore = useIsFavoriteStore((state) => state.isFavoriteStore);

  const shortInstructions = instructions.length > 50 ? instructions.slice(0, 50) + '...' : instructions;

  const handleToggleFavorite = () => {
    onToggleFavorite(recipe_id, isFavorite);
    if (isModalOpen && isFavoriteStore)
      setIsModalOpen(false);
  };

  return (
    <div className="max-w-[12rem] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Recipe Card */}
      <div className='justify-between flex flex-col'>
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
        </div>
        <div className="mt-auto bottom-0 px-4 py-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            Read More
          </button>
        </div>
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
