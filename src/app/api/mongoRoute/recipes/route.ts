import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/db/mongodb';
import Recipe from '@/app/lib/models/Recipe';

// GET all recipes
export async function GET() {
    try {
        await connect();  // Connect to MongoDB
        const recipes = await Recipe.find();  // Fetch all recipes
        return NextResponse.json(recipes, { status: 200 });  // Return recipes in JSON format
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching recipes', error }, { status: 500 });
    }

}

// POST a new recipe
export async function POST(req: NextRequest) {
    try {
        const recipeData = await req.json();  // Parse the incoming request body

        // Connect to MongoDB
        await connect();
        
        // Create a new Recipe using the data (Mongoose will handle validation)
        const newRecipe = new Recipe(recipeData);  

        // Save the recipe to the database
        await newRecipe.save();  

        return NextResponse.json(newRecipe, { status: 201 });  // Return the saved recipe as a response
    } catch (error) {
        return NextResponse.json({ message: 'Error creating recipe', error }, { status: 500 });
    }
}
