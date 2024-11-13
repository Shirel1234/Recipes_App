"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRecipe } from '@/app/services/recipeServices';
import { Recipe } from '@/app/types/recipeSchema';

type Errors = {
  name?: string[];
  category?: string[];
  image?: string[];
  ingredients?: string[];
  instructions?: string[];
};

const AddRecipeForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('');;
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();

  const categories = [
    'Italian',
    'Mexican',
    'Chinese',
    'Indian',
    'French',
    'Dessert',
    'Salad',
    'Soup',
    'Vegan',
    'Beverage',
  ];

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!name || !category || !image || !ingredients.length || !instructions) {
      alert("Please fill all the required fields.");
      return;
    }

    const recipeData = {
      name,
      category,
      image,
      ingredients,
      instructions,
      isFavorite,
    };

    const validation = Recipe.safeParse(recipeData);
    console.log(validation); 
    if (!validation.success) {
      const formattedErrors = validation.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      return;
    }

    try {
      await createRecipe(recipeData);
      alert("recipe added succesfully");
    } catch (error) {
      console.error('Failed to add recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <button
        type="button"
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 text-blue-600 font-semibold hover:underline"
      >
        &larr; Back
      </button>
      
      <h1 className="text-2xl font-semibold mb-6">Add Recipe</h1>

      <label className="block mb-4">
        <span className="text-gray-700">Dish Name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dish Name"
          className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category[0]}</p>}
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Image URL</span>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image[0]}</p>}
      </label>

      <div className="mb-4">
        <span className="text-gray-700">Ingredients</span>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center mt-1">
            <input
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder="Ingredient"
              className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
        {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients[0]}</p>}
        <button
          type="button"
          onClick={handleAddIngredient}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          + Add another ingredient
        </button>
      </div>

      <label className="block mb-6">
        <span className="text-gray-700">Instructions</span>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Instructions"
          className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
        {errors.instructions && <p className="text-red-500 text-sm">{errors.instructions[0]}</p>}
      </label>

      <label className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={isFavorite}
          onChange={() => setIsFavorite(!isFavorite)}
          className="mr-2"
        />
        <span className="text-gray-700">Mark as Favorite</span>
      </label>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
