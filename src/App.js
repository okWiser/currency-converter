import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import flags from './flags';

const currencyList = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
  'ZAR', 'NGN', 'EGP', 'KES', 'GHS', 'TZS', 'UGX', 'MAD', 'DZD', 'AOA',
  'XOF', 'XAF', 'BWP', 'MUR', 'NAD', 'ZMW', 'ETB', 'CDF', 'LRD', 'SLL',
  'SZL', 'MWK', 'MZN', 'SCR', 'SOS', 'LSL', 'DJF', 'ERN', 'GMD', 'GNF'
];

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencies, setCurrencies] = useState(currencyList);

  useEffect(() => {
    axios.get(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}`)
      .then(response => {
        setExchangeRate(response.data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleFromCurrencyChange = (e) => setFromCurrency(e.target.value);
  const handleToCurrencyChange = (e) => setToCurrency(e.target.value);

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Currency Converter</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4 flex items-center">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="border p-2 mr-2 w-full rounded-md"
          />
          <div className="flex items-center">
            <img src={flags[fromCurrency]} alt={fromCurrency} className="w-6 h-6 mr-2" />
            <select value={fromCurrency} onChange={handleFromCurrencyChange} className="border p-2 mr-2 rounded-md">
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <span className="mr-2 text-lg">to</span>
          <div className="flex items-center">
            <img src={flags[toCurrency]} alt={toCurrency} className="w-6 h-6 mr-2" />
            <select value={toCurrency} onChange={handleToCurrencyChange} className="border p-2 rounded-md">
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-600">
            {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
