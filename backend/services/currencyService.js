// Centralized currency conversion service
let ratesCache = {
  rates: null,
  timestamp: null,
  ttl: 3600000 // 1 hour
};

const getExchangeRates = async () => {
  const now = Date.now();
  
  if (ratesCache.rates && ratesCache.timestamp && (now - ratesCache.timestamp < ratesCache.ttl)) {
    return ratesCache.rates;
  }
  
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    
    ratesCache = {
      rates: data.rates,
      timestamp: now,
      ttl: 3600000
    };
    
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return {
      USD: 1,
      EUR: 0.85,
      GBP: 0.73,
      INR: 83.12
    };
  }
};

const normalizeCurrency = (currency) => {
  const currencyMap = {
    'US$': 'USD',
    'USD': 'USD',
    'RS': 'INR',
    'INR': 'INR',
    'EUR': 'EUR',
    'GBP': 'GBP'
  };
  return currencyMap[currency?.toUpperCase()] || 'INR';
};

const convertToINR = async (amount, fromCurrency) => {
  const normalizedFrom = normalizeCurrency(fromCurrency);
  
  if (normalizedFrom === 'INR') {
    return amount;
  }
  
  const rates = await getExchangeRates();
  
  let amountInUSD = amount;
  if (normalizedFrom !== 'USD') {
    amountInUSD = amount / rates[normalizedFrom];
  }
  
  return amountInUSD * rates.INR;
};

module.exports = { convertToINR, normalizeCurrency };