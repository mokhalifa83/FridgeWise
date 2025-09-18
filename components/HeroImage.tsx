import React from 'react';

interface HeroImageProps {
    heroImage: string | null;
}

const SkeletonLoader: React.FC = () => (
    <div className="w-full h-full bg-slate-200 rounded-2xl animate-pulse">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
             style={{
                 animation: 'shimmer 2s infinite',
                 backgroundSize: '200% 100%',
             }}
         />
         <style>{`
             @keyframes shimmer {
                 0% { background-position: -200% 0; }
                 100% { background-position: 200% 0; }
             }
         `}</style>
    </div>
);

const HeroImage: React.FC<HeroImageProps> = ({ heroImage }) => {
    return (
        <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:max-w-none md:aspect-auto md:h-full rounded-2xl shadow-2xl overflow-hidden bg-slate-200">
            {heroImage ? (
                <img
                    src={heroImage}
                    alt="AI-generated visualization of ingredients transforming into a meal"
                    className="w-full h-full object-cover animate-fade-in"
                />
            ) : (
                <SkeletonLoader />
            )}
        </div>
    );
};

export default HeroImage;
