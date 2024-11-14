import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongodb";
import Recipe from "@/app/lib/models/Recipe";

// GET a specific recipe
export async function GET(
  req: NextRequest,
  { params }: { params: { recipeId: string } }
) {
  const { recipeId } = params;

  try {
    await connect(); // Connect to MongoDB
    const recipe = await Recipe.findById(recipeId);
    if (!recipe)
      return NextResponse.json(
        { message: "Recipe not found" },
        { status: 404 }
      );
    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { message: "Error fetching recipe", error },
      { status: 500 }
    );
  }
}

// PUT to update an existing recipe
export async function PUT(
  req: NextRequest,
  { params }: { params: { recipeId: string } }
) {
  const { recipeId } = params;
  const { name, category, image, ingredients, instructions, isFavorite } =
    await req.json();

  console.log("Updating recipe with ID:", recipeId);
  console.log("Updated Recipe Data:", {
    name,
    category,
    image,
    ingredients,
    instructions,
    isFavorite,
  });

  try {
    await connect(); // Connect to MongoDB
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { name, category, image, ingredients, instructions, isFavorite },
      { new: true }
    );
    if (!updatedRecipe)
      return NextResponse.json(
        { message: "Recipe not found" },
        { status: 404 }
      );
    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { message: "Error updating recipe", error },
      { status: 500 }
    );
  }
}

// DELETE a recipe
export async function DELETE(
  req: NextRequest,
  { params }: { params: { recipeId: string } }
) {
  const { recipeId } = params;

  try {
    await connect(); // Connect to MongoDB
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    if (!deletedRecipe)
      return NextResponse.json(
        { message: "Recipe not found" },
        { status: 404 }
      );
    return NextResponse.json(
      { message: "Recipe deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { message: "Error deleting recipe", error },
      { status: 500 }
    );
  }
}
