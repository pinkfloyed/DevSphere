import { useCallback, useEffect, useRef, useState } from 'react';
import { searchRecipes } from '../services/recipeService';

const PAGE_SIZE = 10;

export default function RecipeFinder() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState('');

  const observer = useRef();

  const lastRecipeRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prev) => prev + PAGE_SIZE);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setRecipes([]);
    setOffset(0);
  }, [ingredient]);

  useEffect(() => {
    if (!ingredient) {
      setRecipes([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await searchRecipes(ingredient, offset, PAGE_SIZE);
        setRecipes((prev) => [...prev, ...data.results]);
        setHasMore(data.results.length === PAGE_SIZE);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ingredient, offset]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = ingredient.trim();
    if (!trimmed) return;
    setRecipes([]);
    setOffset(0);
    setHasMore(false);
    setIngredient(trimmed);
  };

  return (
    <div className="container mt-4">
      <h2>🍳 Recipe Finder</h2>

      <form onSubmit={handleSearch} className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter ingredient (e.g. chicken, tomato)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {recipes.map((recipe, index) => {
          const isLast = recipes.length === index + 1;
          return (
            <div
              key={recipe.id}
              className="col-md-4 mb-4"
              ref={isLast ? lastRecipeRef : null}
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.title}
                  loading="lazy"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p>Calories: {Math.round(recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 'N/A')}</p>
                  <p className="card-text flex-grow-1">
                    {recipe.summary ? (
                      <span
                        dangerouslySetInnerHTML={{ __html: recipe.summary.slice(0, 100) + '...' }}
                      />
                    ) : (
                      'No description available.'
                    )}
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#steps${recipe.id}`}
                    aria-expanded="false"
                    aria-controls={`steps${recipe.id}`}
                  >
                    Show Cooking Steps
                  </button>

                  <div className="collapse mt-2" id={`steps${recipe.id}`}>
                    {recipe.analyzedInstructions?.length > 0 ? (
                      <ol>
                        {recipe.analyzedInstructions[0].steps.map((step) => (
                          <li key={step.number}>{step.step}</li>
                        ))}
                      </ol>
                    ) : (
                      <p>No steps available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <div>Loading more recipes...</div>}
    </div>
  );
}
