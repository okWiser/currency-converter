import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('https://api.frankfurter.app/currencies', () => {
    return HttpResponse.json({
      USD: 'United States Dollar',
      EUR: 'Euro',
      GBP: 'British Pound Sterling',
      JPY: 'Japanese Yen',
    });
  }),

  http.get('https://api.frankfurter.app/latest', ({ request }) => {
    const url = new URL(request.url);
    const amount = url.searchParams.get('amount') || '1';
    const from = url.searchParams.get('from') || 'USD';
    const to = url.searchParams.get('to') || 'EUR';

    return HttpResponse.json({
      amount: parseFloat(amount),
      base: from,
      date: '2024-01-01',
      rates: {
        [to]: 0.85,
      },
    });
  }),
];

export const server = setupServer(...handlers);