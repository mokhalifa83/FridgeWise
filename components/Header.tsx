import React from 'react';
import { SparklesIcon } from './Icons';

interface HeaderProps {
    onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={onReset}
            aria-label="FridgeWise Home"
          >
            <SparklesIcon className="w-7 h-7 text-emerald-500" />
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              FridgeWise
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;