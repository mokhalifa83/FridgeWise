import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './Icons';

interface LoaderProps {
    imagePreviews: string[];
}

const loadingMessages = [
  'Scanning your ingredients...',
  'Consulting our gourmet AI chef...',
  'Dreaming up delicious recipes...',
  'Photographing the final dishes...',
  'Plating your suggestions now!'
];

const Loader: React.FC<LoaderProps> = ({ imagePreviews }) => {
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessage(prevMessage => {
        const currentIndex = loadingMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center animate-fade-in space-y-6">
      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        {imagePreviews.slice(0, 3).map((src, index) => (
            <img
                key={src}
                src={src}
                alt="Ingredient"
                className="absolute w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white"
                style={{
                    transform: `rotate(${index * 10 - 10}deg) translate(${index * 10}px, ${index * -5}px)`,
                    zIndex: imagePreviews.length - index,
                }}
            />
        ))}
         <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center animate-pulse">
                <SparklesIcon className="w-12 h-12 text-emerald-500"/>
            </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-700">{currentMessage}</h2>
      <p className="text-slate-500 max-w-md">Our AI is analyzing your photos to create unique recipes. This can take a moment.</p>
    </div>
  );
};

export default Loader;