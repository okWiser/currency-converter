export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  timestamp: number;
}

export interface ConversionResult {
  amount: number;
  from: string;
  to: string;
  result: number;
  rate: number;
  timestamp: number;
}

export interface HistoricalRate {
  date: string;
  rate: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  favorites: string[];
  defaultCurrency: string;
}

export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}