// 'use client'
import RecipeList from "./components/List_Recipes";
import NevBar from "./components/NevBar";

export default function Home() {
  return (
    <div className="max-w-[100rem] mx-auto px-4"> 
      <NevBar />
      <RecipeList />
    </div>
  );
}
