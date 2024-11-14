import { z } from "zod";
import { Document } from "mongoose"

const Recipe = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    category: z.string().min(1, { message: 'Category is required' }),
    imageUrl: z.string().url(),
    ingredients: z.array(z.string()).max(20,  "Array can contain a maximum of 20 items"),
    instructions: z.string().min(2, "Instructions must be at least 2 characters").max(500, "Instructions must be max 100 characters"),
    isFavorite: z.boolean()

  });


export interface IRecipe extends Document{
    _id:string
    name: string
    category:string,
    imageUrl: string,
    ingredients: string[]
    instructions: string
    isFavorite: boolean
}

export { Recipe };

