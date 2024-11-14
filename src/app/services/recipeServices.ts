import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/mongoRoute',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createRecipe = async (recipe: { name: string; category: string; imageUrl: string; ingredients: string[]; instructions: string; }) => {
  try {
    const response = await instance.post('/recipes', recipe);
    console.log('Recipe Created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

export const getAllRecipes = async () => {
  try {
    const response = await instance.get('/recipes');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const getRecipe = async (id: string) => {
  try {
    const response = await instance.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

export const updateRecipe = async (id: string, recipe: { name: string; category: string;  imageUrl: string; ingredients: string[]; instructions: string; isFavorite:boolean}) => {
  try {
    const response = await instance.put(`/recipes/${id}`, recipe);
    return response.data;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};

export const deleteRecipe = async (id: string) => {
  try {
    await instance.delete(`/recipes/${id}`);
    console.log('Recipe Deleted:', id);
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};
