'use client'
import { useRouter } from "next/navigation";

// import RecipeList from "./components/List_Recipes";
// import NevBar from "./components/NevBar";

export default function Home() {
  const route = useRouter();
  route.push('pages/login');
  return (
    <div className="max-w-[100rem] mx-auto px-4">
    </div>
  );
}
