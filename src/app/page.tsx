'use client'
import RecipeList from "./components/List_Recipes";
import NevBar from "./components/NevBar";

export default function Home() {

  return (

    <div>
      <NevBar />
      <RecipeList />
    </div>
  );
}
