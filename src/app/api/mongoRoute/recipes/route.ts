import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongodb";
import Recipe from "@/app/lib/models/Recipe";

// GET all recipes
export async function GET() {
  try {
    await connect(); // Connect to MongoDB
    const recipes = await Recipe.find();
    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching recipes", error },
      { status: 500 }
    );
  }
}

// POST a new recipe
export async function POST(req: NextRequest) {
  try {
    const recipeData = await req.json();

    // Connect to MongoDB
    await connect();
    const newRecipe = new Recipe(recipeData);
    await newRecipe.save();
    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating recipe", error },
      { status: 500 }
    );
  }
}
