import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

if (!import.meta.env.VITE_PLAID_CLIENT_ID || !import.meta.env.VITE_PLAID_SECRET) {
  throw new Error('Plaid credentials are required');
}

export const plaidConfig = new Configuration({
  basePath: PlaidEnvironments[import.meta.env.VITE_PLAID_ENV as keyof typeof PlaidEnvironments] || PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': import.meta.env.VITE_PLAID_CLIENT_ID,
      'PLAID-SECRET': import.meta.env.VITE_PLAID_SECRET,
    },
  },
});

export const plaidClient = new PlaidApi(plaidConfig);