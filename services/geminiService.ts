import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { Recipe } from '../types';

/**
 * Converts a File object to a GoogleGenerativeAI.Part object.
 * @param file The file to convert.
 * @returns A promise that resolves to the Part object.
 */
async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error("Failed to read file as base64 string."));
      }
    };
    reader.onerror = (err) => {
        reject(err);
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
    type: Type.OBJECT,
    properties: {
        ingredients: {
            type: Type.ARRAY,
            description: "A list of 2-4 key ingredients identified from the image(s).",
            items: { type: Type.STRING }
        },
        recipes: {
            type: Type.ARRAY,
            description: "A list of 3-4 recipe suggestions based on the ingredients.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The name of the recipe." },
                    prepTime: { type: Type.NUMBER, description: "Estimated preparation and cooking time in minutes." },
                    difficulty: { type: Type.STRING, description: "Difficulty level: 'Easy', 'Medium', or 'Hard'." },
                    ingredients: { type: Type.ARRAY, description: "A list of all ingredients needed for this recipe.", items: { type: Type.STRING } },
                    instructions: { type: Type.ARRAY, description: "Step-by-step cooking instructions.", items: { type: Type.STRING } },
                    dietaryTags: { type: Type.ARRAY, description: "Tags like 'Vegetarian', 'Vegan', 'Gluten-Free', 'Quick Meals'.", items: { type: Type.STRING } },
                },
                required: ["title", "prepTime", "difficulty", "ingredients", "instructions", "dietaryTags"]
            }
        }
    },
    required: ["ingredients", "recipes"]
};


/**
 * Generates the main hero image for the application's homepage.
 * @returns A promise that resolves to a base64 data URL of the generated image.
 */
export const generateHeroImage = async (): Promise<string> => {
    const prompt = "Photorealistic image of a person holding two smartphones side-by-side against a clean, neutral background. The left phone's screen shows a mobile app interface scanning the inside of a refrigerator, with ingredients like onions, pasta, and herbs highlighted by a circular UI scanning element. The text 'SCANNING INGREDIENTS...' is visible at the top of the left screen. The right phone's screen shows the final recipe result: a beautifully plated dish of elegant pasta primavera. The text 'RECIPE GENERATED' is visible at the top of the right screen. The overall aesthetic is clean, modern, and high-tech, with a warm, inviting feel.";
    try {
        console.log(`Generating hero image for FridgeWise...`);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts: [{ text: prompt }] },
            config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
        throw new Error("Hero image data not found in response.");
    } catch (error) {
        console.error(`Failed to generate hero image:`, error);
        return `https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374`; // Fallback image
    }
};

/**
 * Generates an image for a given recipe title.
 * @param title The title of the recipe.
 * @returns A promise resolving to a base64 image data URL.
 */
const generateRecipeImage = async (title: string): Promise<string> => {
    const prompt = `A delicious, photorealistic, professionally styled photo of "${title}".`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts: [{ text: prompt }] },
            config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
        throw new Error("Recipe image data not found.");
    } catch (error) {
        console.error(`Failed to generate image for "${title}":`, error);
        return `https://placehold.co/600x400/E2E8F0/475569?text=${encodeURIComponent(title)}`; // Fallback
    }
};


export const generateRecipesFromImages = async (images: File[]): Promise<{ ingredients: string[], recipes: Recipe[] }> => {
    if (images.length === 0) {
        throw new Error("At least one image is required.");
    }

    console.log(`Generating recipes from ${images.length} image(s)...`);

    const imageParts = await Promise.all(images.map(fileToGenerativePart));
    const textPart = { text: "Analyze the ingredients in these image(s) and generate a list of the key ingredients found, plus 3-4 diverse recipes I can make. Provide the output in the requested JSON format." };
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [...imageParts, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
            },
        });

        const parsedResponse = JSON.parse(response.text);

        // Generate images for each recipe in parallel
        const recipesWithImages = await Promise.all(parsedResponse.recipes.map(async (recipe: Omit<Recipe, 'id' | 'image'>) => {
            const imageUrl = await generateRecipeImage(recipe.title);
            return {
                ...recipe,
                id: crypto.randomUUID(), // Add a client-side ID
                image: imageUrl,
            };
        }));
        
        return {
            ingredients: parsedResponse.ingredients,
            recipes: recipesWithImages,
        };

    } catch (error) {
        console.error("Error calling Gemini API for recipes:", error);
        throw new Error("Failed to generate recipes from the AI model.");
    }
};