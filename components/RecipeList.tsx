import React, { useMemo } from 'react';
import type { Recipe, DietaryFilter } from '../types';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  activeFilter: DietaryFilter;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, activeFilter }) => {
  const filteredRecipes = useMemo(() => {
    if (activeFilter === 'All') {
      return recipes;
    }
    return recipes.filter(recipe => recipe.dietaryTags.includes(activeFilter));
  }, [recipes, activeFilter]);

  if (filteredRecipes.length === 0) {
    return <p className="text-center text-slate-500 py-8">No recipes match your filter. Try selecting 'All'!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {filteredRecipes.map((recipe, index) => (
        <div key={recipe.id} style={{ animation: `fade-in-up 0.5s ${index * 0.1}s both` }}>
            <RecipeCard recipe={recipe} />
        </div>
      ))}
       <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RecipeList;