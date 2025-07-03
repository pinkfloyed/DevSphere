import { useEffect, useState } from 'react';
import { fetchCoinPrices } from '../services/dataService';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CurrencyTracker({ theme }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const coins = ['bitcoin', 'ethereum', 'dogecoin'];

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const prices = await fetchCoinPrices(coins);
        setData({
          labels: coins.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
          datasets: [
            {
              label: 'Price in USD',
              data: coins.map((c) => prices[c]?.usd),
              backgroundColor:
                theme === 'dark'
                  ? 'rgba(255, 99, 132, 0.7)'
                  : 'rgba(54, 162, 235, 0.7)',
            },
          ],
        });
      } catch {
        setError('Failed to load coin prices');
      }
    };

    loadPrices();
  }, [theme]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!data) return <div>Loading coin prices...</div>;

  return (
    <div>
      <h3>💰 Cryptocurrency Prices</h3>
      <Bar data={data} />
    </div>
  );
}
