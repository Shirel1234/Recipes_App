import mongoose, { Model, Schema } from "mongoose";
import { RecipeType } from "@/app/types/recipeSchema";


const RecipeSchema: Schema<RecipeType>=new Schema({
    name:{type: String, required: true},
    category:{type: String, required: true, unique: true},
    image: {type: String, required: true},
    ingredients: {type: [String], required: true},
    instructions: {type: String, required: true},
    isFavorite: {type: Boolean, required: true},
})

const Book: Model<RecipeType> = mongoose.models.Book || mongoose.model<RecipeType>('Recipe', RecipeSchema);
export default Book;