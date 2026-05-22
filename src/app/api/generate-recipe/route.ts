import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { Recipe } from '@/types';

// For fallback when no API key is set
const MOCK_RECIPE: Recipe = {
  id: 'mock-123',
  title: 'Cheesy Tomato Pasta',
  description: 'A delicious cheesy pasta made with tomato sauce and herbs.',
  cookingTime: '20 min',
  difficulty: 'Easy',
  servings: 2,
  ingredients: ['Tomato', 'Onion', 'Cheese', 'Pasta'],
  missingIngredients: ['Garlic', 'Olive Oil', 'Oregano'],
  steps: [
    { step: 1, instruction: 'Boil water in a deep pan and add 1 tsp salt.' },
    { step: 2, instruction: 'Add pasta and cook for 8-10 minutes or until it is soft.' },
    { step: 3, instruction: 'In a separate pan, heat oil, add chopped onions and tomatoes.' },
    { step: 4, instruction: 'Cook until tomatoes are soft. Add cheese and mix well.' },
    { step: 5, instruction: 'Toss the boiled pasta in the sauce and serve hot.' }
  ],
  videoUrl: 'https://www.youtube.com/results?search_query=Cheesy+Tomato+Pasta+recipe'
};

export async function POST(req: NextRequest) {
  try {
    const { ingredients, mealTime } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set, returning mock data.');
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return NextResponse.json({ recipes: [
        { ...MOCK_RECIPE, id: `mock-${Date.now()}-1` },
        { 
          ...MOCK_RECIPE, 
          id: `mock-${Date.now()}-2`, 
          title: 'Paneer Bhurji', 
          description: 'Spicy and tasty paneer bhurji goes well with roti or bread.',
          cookingTime: '15 min',
          ingredients: ['Paneer', 'Onion', 'Tomato', 'Chilli'],
          steps: [
            { step: 1, instruction: 'Crumble the paneer and keep aside.' },
            { step: 2, instruction: 'Heat oil, sauté onions, tomatoes and chillies.' },
            { step: 3, instruction: 'Add spices and crumbled paneer. Mix well and serve.' }
          ]
        }
      ] });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `You are an expert chef, especially in Indian cuisine. 
I have the following ingredients: ${ingredients.join(', ')}.
I want to make a ${mealTime} meal.
Suggest 3 recipes I can make primarily using these ingredients. 
You can assume I have basic pantry staples (salt, pepper, oil, water).
Prefer simple, quick, and homemade recipes.

Return the response STRICTLY as a JSON array of objects. Do not include markdown formatting like \`\`\`json.
Each object must have this exact structure:
{
  "title": "String",
  "description": "Short description (max 15 words)",
  "cookingTime": "String (e.g. '15 min')",
  "difficulty": "Easy" | "Medium" | "Hard",
  "servings": Number,
  "ingredients": ["String"],
  "missingIngredients": ["String"] (ingredients I don't have but need),
  "steps": [{"step": Number, "instruction": "String"}],
  "videoUrl": "String (a youtube search URL for the recipe)"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('No response from AI');
    }
    
    let parsedRecipes;
    try {
      parsedRecipes = JSON.parse(text);
    } catch(e) {
      // Try to clean up markdown if any
      const cleaned = text.replace(/```json\n|\n```/g, '');
      parsedRecipes = JSON.parse(cleaned);
    }

    // Assign unique IDs to the generated recipes
    const recipesWithIds = parsedRecipes.map((r: any) => ({
      ...r,
      id: `ai-${Date.now()}-${Math.random().toString(36).substring(7)}`
    }));

    return NextResponse.json({ recipes: recipesWithIds });

  } catch (error) {
    console.error('Error generating recipes:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipes' },
      { status: 500 }
    );
  }
}
