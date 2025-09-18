import React, { useState } from 'react';
import type { Recipe } from '../types';
import { ClockIcon, FlameIcon, ChevronDownIcon } from './Icons';

interface RecipeCardProps {
  recipe: Recipe;
}

const DifficultyIndicator: React.FC<{ difficulty: 'Easy' | 'Medium' | 'Hard' }> = ({ difficulty }) => {
    const levelMap = { Easy: 1, Medium: 2, Hard: 3 };
    const level = levelMap[difficulty] || 1;
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
                <FlameIcon key={i} className={`w-5 h-5 ${i < level ? 'text-orange-400' : 'text-slate-300'}`} />
            ))}
            <span className="text-sm font-medium text-slate-600 ml-1">{difficulty}</span>
        </div>
    );
};


const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  const handleImageError = () => {
    setHasImageError(true);
  };
  
  const imageSource = hasImageError 
    ? `https://placehold.co/600x400/E2E8F0/475569?text=${encodeURIComponent(recipe.title)}` 
    : recipe.image;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-200/80">
      <div className="aspect-[4/3] bg-slate-200">
        <img 
          src={imageSource}
          alt={recipe.title} 
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-800 mb-4 h-14">{recipe.title}</h3>
        
        <div className="flex flex-wrap items-center justify-between gap-4 text-slate-600 mb-5">
            <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-slate-500"/>
                <span className="font-medium text-sm">{recipe.prepTime} min</span>
            </div>
            <DifficultyIndicator difficulty={recipe.difficulty} />
        </div>

        <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
                <div className="pb-4 space-y-4">
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-2">Ingredients:</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-600 text-sm">
                            {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-2">Instructions:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-slate-600 text-sm">
                            {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="w-full flex justify-center items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors py-3 rounded-lg bg-emerald-100/70 hover:bg-emerald-200/70"
        >
          <span>{isExpanded ? 'Show Less' : 'View Full Recipe'}</span>
          <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;