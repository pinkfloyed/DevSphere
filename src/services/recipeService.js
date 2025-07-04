const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function searchRecipes(ingredient, offset = 0, number = 10) {
  const url = `${BASE_URL}/complexSearch?query=${encodeURIComponent(
    ingredient
  )}&offset=${offset}&number=${number}&addRecipeInformation=true&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
}
