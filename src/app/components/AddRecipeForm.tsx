"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRecipe } from '@/app/services/recipeServices';
import { Recipe } from '@/app/types/recipeSchema';
import toast, { Toaster } from 'react-hot-toast';

type Errors = {
  name?: string[];
  category?: string[];
  imageUrl?: string[];
  ingredients?: string[];
  instructions?: string[];
};

const AddRecipeForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('');;
  const [imageUrl, setimageUrl] = useState<string>('');
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

  const handleInputChange = (field: keyof Errors, value: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
    switch (field) {
      case "name":
        setName(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "imageUrl":
        setimageUrl(value);
        break;
      case "instructions":
        setInstructions(value);
        break;
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index: number, value: string) => {
    setIngredients((prevIngredients) => {
      const newIngredients = [...prevIngredients];
      newIngredients[index] = value;
      return newIngredients;
    });
    setErrors((prevErrors) => ({ ...prevErrors, ingredients: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, category, imageUrl, ingredients, instructions });

    if (!name || !category || !imageUrl || !ingredients.length || !instructions) {
      toast.error("Please fill all the required fields.");
      return;
    }

    const recipeData = {
      name,
      category,
      imageUrl,
      ingredients,
      instructions,
      isFavorite,
    };

    const validation = Recipe.safeParse(recipeData);

    if (!validation.success) {
      const formattedErrors = validation.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      return;
    }

    try {
      await createRecipe(recipeData);
      toast.success("Recipe added successfully");

      setName('');
      setCategory('');
      setimageUrl('');
      setIngredients(['']);
      setInstructions('');
      setIsFavorite(false);
      setErrors({});
    } catch (error) {
      console.error('Failed to add recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <Toaster />
      <button
        type="button"
        onClick={() => router.push('/pages/protected')}
        className="absolute top-4 left-4 text-blue-600 font-semibold hover:underline"
      >
        &larr; Back
      </button>

      <h1 className="text-2xl font-semibold mb-6">Add Recipe</h1>

      <div className="flex gap-6">
        <div className="flex-1">
          <label className="block mb-4">
            <input
              value={name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Dish Name"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
          </label>

          <label className="block mb-4">
            <select
              value={category}
              onChange={(e) => handleInputChange("category", e.target.value)}
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
            <input
              value={imageUrl}
              onChange={(e) => handleInputChange("imageUrl", e.target.value)}
              placeholder="Image URL"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl[0]}</p>}
          </label>

          <div className="mb-4">
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

          <label className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={isFavorite}
              onChange={() => setIsFavorite(!isFavorite)}
              className="mr-2"
            />
            <span className="text-gray-700">Favorite</span>
          </label>
        </div>

        <div className="flex-1">
          <label className="block mb-6">
            <textarea
              value={instructions}
              onChange={(e) => handleInputChange("instructions", e.target.value)}
              placeholder="Instructions"
              className="mt-1 block w-full h-64 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.instructions && <p className="text-red-500 text-sm">{errors.instructions[0]}</p>}
          </label>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Add Recipe
        </button>
      </div>
    </form>
  );
};

export default AddRecipeForm;
