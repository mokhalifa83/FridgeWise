export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type DietaryFilter = 'All' | 'Quick Meals' | 'Vegetarian' | 'Gluten-Free' | 'Vegan';

export interface Recipe {
    id: string;
    title: string;
    prepTime: number; // in minutes
    difficulty: Difficulty;
    ingredients: string[];
    instructions: string[];
    dietaryTags: DietaryFilter[];
    image: string; // base64 data URL
}
