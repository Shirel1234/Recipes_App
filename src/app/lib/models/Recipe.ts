import mongoose, { Model, Schema } from "mongoose";
import { IRecipe } from "@/app/types/recipeSchema";

const RecipeSchema: Schema<IRecipe> = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  isFavorite: { type: Boolean, required: true },
});

const Recipe: Model<IRecipe> =
  mongoose.models.Recipe || mongoose.model<IRecipe>("Recipe", RecipeSchema);
export default Recipe;
