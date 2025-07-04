import { useState } from 'react';
import CurrencyTracker from '../components/CurrencyTracker';
import ExchangeRateChart from '../components/ExchangeRateChart';
import GitHubContribution from '../components/GitHubContribution';

export default function DataVisualization({ theme }) {
  const [githubUser, setGithubUser] = useState('');
  const [inputUser, setInputUser] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setGithubUser(inputUser.trim());
  };

  const cardClass = `card mb-4 shadow-sm bg-${theme} text-${theme === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">📊 Data Visualization Dashboard</h2>

      <div className={cardClass}>
        <div className="card-header fw-bold">💱 Live Currency Tracker</div>
        <div className="card-body">
          <CurrencyTracker theme={theme} />
        </div>
      </div>


      <div className={cardClass}>
        <div className="card-header fw-bold">📉 Historical Exchange Rates</div>
        <div className="card-body">
          <ExchangeRateChart theme={theme} />
        </div>
      </div>

      <div className={cardClass}>
        <div className="card-header fw-bold">🐙 GitHub Contributions</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-2 align-items-end">
              <div className="col-sm-8">
                <label htmlFor="githubUserInput" className="form-label">
                  Enter GitHub Username
                </label>
                <input
                  id="githubUserInput"
                  type="text"
                  className="form-control"
                  value={inputUser}
                  onChange={(e) => setInputUser(e.target.value)}
                  placeholder="e.g. pinkiakter"
                />
              </div>
              <div className="col-sm-4">
                <button className="btn btn-primary w-100 mt-sm-4" type="submit">
                  Show Graph
                </button>
              </div>
            </div>
          </form>

          {githubUser && (
            <div className="mt-4">
              <GitHubContribution username={githubUser} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
