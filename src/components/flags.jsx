import React from 'react';
import { FiFlag } from 'react-icons/fi'; // Assuming you're using Font Awesome 5

const CurrencyDropdown = ({ currencies, currency, setCurrency, handleFavorite }) => {
  return (
    <div className="relative">
      <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
        {currencies.map((c) => (
          <option key={c} value={c}>
            <i className={`flag-icon flag-icon-${c}`} /> {c}
          </option>
        ))}
      </select>
      {/* ... other elements */}
    </div>
  );
};

export default CurrencyDropdown;