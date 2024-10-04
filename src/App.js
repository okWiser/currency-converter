import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencies, setCurrencies] = useState([]);

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
      <div className="mb-4">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="border p-2 mr-2"
        />
        <select value={fromCurrency} onChange={handleFromCurrencyChange} className="border p-2 mr-2">
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <span className="mr-2">to</span>
        <select value={toCurrency} onChange={handleToCurrencyChange} className="border p-2">
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        <h2 className="text-xl font-semibold">
          {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
        </h2>
      </div>
    </div>
  );
}

export default App;
