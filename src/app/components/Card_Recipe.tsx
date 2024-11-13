import Image from "next/image";
import React from "react";
import ButtonLink from "./Button";

interface RecipeProps {
  imageUrl: string;
  name: string;
  category: string;
  introduction: string;
}

const Card_Recipe: React.FC<RecipeProps> = ({ imageUrl, name, category, introduction }) => {
  // Create a shortened introduction
  const shortIntroduction = introduction.length > 50 ? introduction.slice(0, 50) + "..." : introduction;

  return (
    <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Image */}
      <Image
       src={imageUrl} 
       alt={name} 
       width={400} 
       height={224}
       className="w-full h-56 object-cover rounded-t-lg" />

      <div className="p-4">
        {/* Name and Category */}
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>

        {/* Introduction */}
        <p className="text-gray-700 mt-2">{shortIntroduction}</p>

        {/* Read More Button */}
        {/* <button className="mt-4 px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md">
        Read More
        </button> */}
        <ButtonLink href='' text="Read More"/>
      </div>
    </div>
  );
};

export default Card_Recipe;
