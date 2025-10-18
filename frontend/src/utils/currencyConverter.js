// Currency conversion utility
const EXCHANGE_RATES_API = 'https://api.exchangerate-api.com/v4/latest/USD';

// Cache for exchange rates (valid for 1 hour)
let ratesCache = {
  rates: null,
  timestamp: null,
  ttl: 3600000 // 1 hour in milliseconds
};

export const getExchangeRates = async () => {
  const now = Date.now();
  
  // Return cached rates if still valid
  if (ratesCache.rates && ratesCache.timestamp && (now - ratesCache.timestamp < ratesCache.ttl)) {
    return ratesCache.rates;
  }
  
  try {
    const response = await fetch(EXCHANGE_RATES_API);
    const data = await response.json();
    
    // Cache the rates
    ratesCache = {
      rates: data.rates,
      timestamp: now,
      ttl: 3600000
    };
    
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    // Fallback rates if API fails
    return {
      USD: 1,
      EUR: 0.85,
      GBP: 0.73,
      INR: 83.12
    };
  }
};

// Normalize currency codes
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

export const convertCurrency = async (amount, fromCurrency, toCurrency = 'INR') => {
  const normalizedFrom = normalizeCurrency(fromCurrency);
  const normalizedTo = normalizeCurrency(toCurrency);
  
  if (normalizedFrom === normalizedTo) {
    return amount;
  }
  
  const rates = await getExchangeRates();
  
  // Convert to USD first, then to target currency
  let amountInUSD = amount;
  if (normalizedFrom !== 'USD') {
    amountInUSD = amount / rates[normalizedFrom];
  }
  
  // Convert from USD to target currency
  const convertedAmount = amountInUSD * rates[normalizedTo];
  return convertedAmount;
};

export const formatCurrency = (amount, currency) => {
  const currencySymbols = {
    'USD': '$',
    'US$': '$',
    'EUR': '€',
    'GBP': '£',
    'INR': '₹',
    'RS': '₹'
  };
  
  const symbol = currencySymbols[currency] || currency;
  return `${symbol}${amount.toFixed(2)}`;
};