import React from 'react';

interface IngredientTagsProps {
  ingredients: string[];
}

const colors = [
  'bg-emerald-100 text-emerald-800',
  'bg-sky-100 text-sky-800',
  'bg-violet-100 text-violet-800',
  'bg-amber-100 text-amber-800',
  'bg-rose-100 text-rose-800',
];

const IngredientTags: React.FC<IngredientTagsProps> = ({ ingredients }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {ingredients.map((ingredient, index) => (
        <span
          key={ingredient}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-transform hover:scale-105 ${colors[index % colors.length]}`}
          style={{ animation: `fade-in-up 0.5s ${index * 0.1}s both` }}
        >
          {ingredient}
        </span>
      ))}
    </div>
  );
};

export default IngredientTags;