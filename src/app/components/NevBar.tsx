'use client'
import React, { useState } from 'react'
import ButtonLink from './Button';

const NevBar = () => {
   const [category, setCategory] = useState("");
   const [search, setSearch] = useState("");
   const categories = ["Appetizers", "Main Course", "Desserts", "Beverages"];

  return (
    <div className="p-4">
      {/* Top Controls */}
      <h1>Recipes</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          {/* Pick a Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Pick a Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Add Button */}
        <ButtonLink href={'/pages/addRecipe'} text='Add Recipe' />
      </div>

      {/* Navbar Links */}
      <div className="flex justify-center mb-4 space-x-6">
        <a href="/all-recipes" className="text-blue-500 hover:underline">
          All Recipes
        </a>
        <a href="/favorites" className="text-blue-500 hover:underline">
          Favorites
        </a>
      </div>
    </div>
  )
}

export default NevBar
