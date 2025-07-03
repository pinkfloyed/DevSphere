import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchExchangeRates } from '../services/dataService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ExchangeRateChart({ theme }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRates = async () => {
      try {
        const res = await fetchExchangeRates();
        const rates = res?.rates;
        const desiredCurrencies = ['EUR', 'GBP', 'JPY', 'BDT'];
setData({
  labels: desiredCurrencies,
  datasets: [
    {
      label: 'Exchange rates vs USD',
      data: desiredCurrencies.map((curr) => rates[curr]),
      borderColor: theme === 'dark' ? 'rgba(255, 206, 86, 1)' : 'rgba(75, 192, 192, 1)',
      backgroundColor: theme === 'dark' ? 'rgba(255, 206, 86, 0.2)' : 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.3,
    },
  ],
});

      } catch {
        setError('Failed to load exchange rates');
      }
    };

    loadRates();
  }, [theme]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!data) return <div>Loading exchange rates...</div>;

  return (
    <div>
      <h3>💱 Exchange Rates</h3>
      <Line data={data} />
    </div>
  );
}
