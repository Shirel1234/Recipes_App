import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/db/mongodb';
import Recipe from '@/app/lib/models/RecipeSchema';

// GET all recipes
export async function GET() {
    try {
        await connect();
        const recipes = await Recipe.find();
        return NextResponse.json(recipes, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching recipes', error }, { status: 500 });
    }
}

// POST a new recipe
export async function POST(req: NextRequest) {
    try {
        await connect();
        const { make, car_model, year, color, price } = await req.json();
        const newCar = new Car({ make, car_model, year, color, price });
        await newCar.save();
        return NextResponse.json(newCar, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating car', error }, { status: 500 });
    }
}
