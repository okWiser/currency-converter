import { API_CONFIG, ERROR_CODES } from '@/constants';
import { retry } from '@/utils';
import type { ApiResponse, ExchangeRate, HistoricalRate } from '@/types';

class ApiService {
  private cache = new Map<string, { data: unknown; timestamp: number }>();

  private async fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
      return cached.data as T;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const response = await retry(async () => {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res;
      }, API_CONFIG.RETRY_ATTEMPTS);

      const data = await response.json();
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : ERROR_CODES.NETWORK_ERROR
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async getCurrencies(): Promise<ApiResponse<Record<string, string>>> {
    try {
      const data = await this.fetchWithCache<Record<string, string>>(
        `${API_CONFIG.BASE_URL}/currencies`,
        'currencies'
      );
      return { data, success: true };
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error instanceof Error ? error.message : ERROR_CODES.API_ERROR,
      };
    }
  }

  async convertCurrency(
    amount: number,
    from: string,
    to: string
  ): Promise<ApiResponse<ExchangeRate>> {
    try {
      const data = await this.fetchWithCache<{
        amount: number;
        base: string;
        date: string;
        rates: Record<string, number>;
      }>(
        `${API_CONFIG.BASE_URL}/latest?amount=${amount}&from=${from}&to=${to}`,
        `convert-${amount}-${from}-${to}`
      );

      const result: ExchangeRate = {
        from,
        to,
        rate: data.rates[to],
        timestamp: Date.now(),
      };

      return { data: result, success: true };
    } catch (error) {
      return {
        data: { from, to, rate: 0, timestamp: Date.now() },
        success: false,
        error: error instanceof Error ? error.message : ERROR_CODES.API_ERROR,
      };
    }
  }

  async getHistoricalRates(
    from: string,
    to: string,
    startDate: string,
    endDate: string
  ): Promise<ApiResponse<HistoricalRate[]>> {
    try {
      const data = await this.fetchWithCache<{
        amount: number;
        base: string;
        start_date: string;
        end_date: string;
        rates: Record<string, Record<string, number>>;
      }>(
        `${API_CONFIG.BASE_URL}/${startDate}..${endDate}?from=${from}&to=${to}`,
        `historical-${from}-${to}-${startDate}-${endDate}`
      );

      const rates: HistoricalRate[] = Object.entries(data.rates).map(
        ([date, rates]) => ({
          date,
          rate: rates[to],
        })
      );

      return { data: rates, success: true };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : ERROR_CODES.API_ERROR,
      };
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const apiService = new ApiService();