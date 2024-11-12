import { z } from "zod";

const Recipe = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    category: z.string(),
    imageUrl: z.string().url(),
    ingredients: z.array(z.string()).max(20,  "Array can contain a maximum of 20 items"),
    instructions: z.string().min(2, "Instructions must be at least 2 characters").max(100, "Instructions must be at least 2 characters"),
    isFavorite: z.boolean()

  });

  export type RecipeType = z.infer<typeof Recipe>;
export default Recipe