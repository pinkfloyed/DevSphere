import { useEffect, useState } from 'react';
import {
  fetchDevToArticles,
  fetchHackerNewsArticles,
  fetchMediumArticles,
  fetchRedditArticles,
  fetchTechCrunchArticles,
  fetchStackOverflowBlogArticles,
} from '../services/newsService';

const SOURCES = [
  'Dev.to',
  'HackerNews',
  'Medium',
  'Reddit',
  'TechCrunch',
  'StackOverflow Blog',
];

export default function NewsFeed() {
  const [source, setSource] = useState('Dev.to');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError('');
      try {
        let data = [];
        if (source === 'Dev.to') data = await fetchDevToArticles();
        else if (source === 'HackerNews') data = await fetchHackerNewsArticles();
        else if (source === 'Medium') data = await fetchMediumArticles();
        else if (source === 'Reddit') data = await fetchRedditArticles();
        else if (source === 'TechCrunch') data = await fetchTechCrunchArticles();
        else if (source === 'StackOverflow Blog') data = await fetchStackOverflowBlogArticles();
        setArticles(data);
      } catch (err) {
        setError(err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, [source]);

  return (
    <div className="container mt-4">
      <h2>📰 Tech News Feed</h2>

      <div className="mb-3">
        <label htmlFor="sourceSelect" className="form-label">
          Select News Source:
        </label>
        <select
          id="sourceSelect"
          className="form-select"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          {SOURCES.map((src) => (
            <option key={src} value={src}>
              {src}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="alert alert-info">Loading articles...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {articles.length === 0 && !loading && !error && (
          <p>No articles found for the selected source.</p>
        )}
        {articles.map((article) => (
          <div className="col-md-6 mb-4" key={article.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  <small className="text-muted">
                    By {article.user?.name || 'Unknown'}{' '}
                    {article.published_at && (
                      <span> | {new Date(article.published_at).toLocaleDateString()}</span>
                    )}
                  </small>
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary mt-auto align-self-start"
                >
                  Read Full Article
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
