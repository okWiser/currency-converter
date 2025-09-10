import React, { useMemo } from 'react';
import { HiOutlineStar, HiStar } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store';
import { getCurrencyName } from '@/utils';
import type { Currency } from '@/types';

interface CurrencyDropdownProps {
  currencies: Currency[];
  value: string;
  onChange: (currency: string) => void;
  label?: string;
  disabled?: boolean;
}

export const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  currencies,
  value,
  onChange,
  label,
  disabled = false,
}) => {
  const { preferences, addFavorite, removeFavorite } = useAppStore();
  const { favorites } = preferences;

  const { favoriteOptions, regularOptions } = useMemo(() => {
    const favoritesSet = new Set(favorites);
    const favoriteOptions = currencies.filter(c => favoritesSet.has(c.code));
    const regularOptions = currencies.filter(c => !favoritesSet.has(c.code));
    
    return { favoriteOptions, regularOptions };
  }, [currencies, favorites]);

  const isFavorite = favorites.includes(value);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFavorite(value);
    } else {
      addFavorite(value);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="
            w-full pl-4 pr-16 py-3 border-2 border-gray-200 dark:border-gray-600
            bg-white/80 backdrop-blur-sm dark:bg-gray-800 text-gray-900 dark:text-white
            rounded-xl shadow-sm transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
            hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed
            appearance-none
          "
        >
          {favoriteOptions.length > 0 && (
            <optgroup label="Favorites">
              {favoriteOptions.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {getCurrencyName(currency.code)}
                </option>
              ))}
            </optgroup>
          )}
          
          {regularOptions.length > 0 && (
            <optgroup label="All Currencies">
              {regularOptions.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {getCurrencyName(currency.code)}
                </option>
              ))}
            </optgroup>
          )}
        </select>

        <button
          onClick={handleFavoriteToggle}
          disabled={disabled}
          className={`
            absolute right-8 top-1/2 -translate-y-1/2
            p-1.5 z-10 rounded-md border
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none
            ${
              isFavorite
                ? 'text-yellow-500 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700'
                : 'text-gray-400 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600'
            }
          `}
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <HiStar size={16} /> : <HiOutlineStar size={16} />}
        </button>

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};