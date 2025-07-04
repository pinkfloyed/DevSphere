export const fetchCoinPrices = async (coins = ['bitcoin', 'ethereum', 'dogecoin']) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch coin prices');
  return res.json();
};

export const fetchExchangeRates = async (base = 'USD', symbols = ['EUR', 'GBP', 'JPY']) => {
  const url = `https://api.frankfurter.app/latest?from=${base}&to=${symbols.join(',')}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch exchange rates');
  const data = await res.json();
  return { rates: data.rates };
};

export const fetchForexRates = async () => {
  const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=EUR,BDT');
  const data = await res.json();
  return data.rates;
};

