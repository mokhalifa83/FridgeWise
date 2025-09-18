import React, { useState, useCallback, useEffect } from 'react';
import { generateHeroImage, generateRecipesFromImages } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import Loader from './components/Loader';
import { SparklesIcon, XCircleIcon } from './components/Icons';
import HeroImage from './components/HeroImage';
import type { Recipe, DietaryFilter } from './types';
import IngredientTags from './components/IngredientTags';
import FilterButtons from './components/FilterButtons';
import RecipeList from './components/RecipeList';
import { FILTERS } from './constants';


type AppState = 'upload' | 'loading' | 'results';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('upload');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeFilter, setActiveFilter] = useState<DietaryFilter>('All');
  const [error, setError] = useState<string | null>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      const imageUrl = await generateHeroImage();
      setHeroImage(imageUrl);
    };
    fetchHeroImage();
  }, []);

  const handleImageUpload = useCallback((files: File[]) => {
    const newFiles = [...uploadedImages, ...files];
    setUploadedImages(newFiles);
    const newPreviews = [...imagePreviews, ...files.map(file => URL.createObjectURL(file))];
    setImagePreviews(newPreviews);
    setError(null);
  }, [uploadedImages, imagePreviews]);
  
  const handleRemoveImage = (indexToRemove: number) => {
    const newFiles = uploadedImages.filter((_, index) => index !== indexToRemove);
    setUploadedImages(newFiles);

    const newPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[indexToRemove]);
    setImagePreviews(newPreviews);
  };

  const handleAnalyze = async () => {
    if (uploadedImages.length === 0) {
        setError('Please upload at least one photo of your ingredients.');
        return;
    }
    setAppState('loading');
    setError(null);

    try {
        const result = await generateRecipesFromImages(uploadedImages);
        setIngredients(result.ingredients);
        setRecipes(result.recipes);
        setAppState('results');
    } catch (err) {
        console.error("Failed to generate recipes:", err);
        setError('Our AI chef is a bit busy. Please try again with different images.');
        setAppState('upload'); // Go back to upload on error
    }
  };
  
  const handleReset = () => {
    setAppState('upload');
    setUploadedImages([]);
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    setImagePreviews([]);
    setIngredients([]);
    setRecipes([]);
    setError(null);
    setActiveFilter('All');
  };
  
  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    }
  }, [imagePreviews]);

  const renderContent = () => {
    switch(appState) {
        case 'loading':
            return <div className="py-20"><Loader imagePreviews={imagePreviews} /></div>;
        case 'results':
            return (
                <div className="animate-fade-in py-12">
                    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-200/80 mb-8 text-center">
                        <div className="flex justify-center items-center gap-3 mb-3">
                            <SparklesIcon className="w-8 h-8 text-emerald-500" />
                            <h2 className="text-3xl font-bold text-slate-800">Your Ingredients, Reimagined</h2>
                        </div>
                        <p className="text-slate-600 mb-6">We found these ingredients in your photos. Here's what you can create:</p>
                        <IngredientTags ingredients={ingredients} />
                    </div>
                    <FilterButtons filters={FILTERS} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                    <RecipeList recipes={recipes} activeFilter={activeFilter} />
                </div>
            );
        case 'upload':
        default:
          return (
            <div className="animate-fade-in py-10 md:py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center min-h-[75vh]">
                <div className="text-left">
                  <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">Waste less, cook more.</h1>
                  <p className="mt-4 text-lg text-slate-600">
                    Snap a photo of your leftovers. Our AI chef will whip up delicious recipe ideas in seconds. Welcome to FridgeWise.
                  </p>
                  <div className="mt-8 space-y-4">
                    <ImageUploader onImageUpload={handleImageUpload} />

                    {imagePreviews.length > 0 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {imagePreviews.map((src, index) => (
                            <div key={src} className="relative group aspect-square">
                              <img src={src} alt={`Ingredient upload ${index + 1}`} className="w-full h-full object-cover rounded-lg border border-slate-200" />
                              <button onClick={() => handleRemoveImage(index)} className="absolute -top-2 -right-2 bg-white rounded-full text-slate-600 hover:text-red-600 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100">
                                <XCircleIcon className="w-7 h-7" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={handleAnalyze} 
                          className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                          Analyze Images ({imagePreviews.length})
                        </button>
                      </div>
                    )}
                    
                    {error && <p className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
                  </div>
                </div>
                <HeroImage heroImage={heroImage} />
              </div>
            </div>
          );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Header onReset={handleReset} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        {renderContent()}
      </main>
      <footer className="py-6 text-center text-slate-500">
        <p className="text-base">
          Made By <a 
            href="https://www.facebook.com/moekhalifa8/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-serif font-medium text-slate-600 hover:text-emerald-600 transition-colors"
          >
            Mohamed Khalifa
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;