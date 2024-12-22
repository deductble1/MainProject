import { Configuration, PlaidEnvironments } from 'plaid';

if (!import.meta.env.VITE_PLAID_CLIENT_ID || !import.meta.env.VITE_PLAID_SECRET) {
  console.error('Missing Plaid credentials');
}

export const plaidConfig = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': import.meta.env.VITE_PLAID_CLIENT_ID || '',
      'PLAID-SECRET': import.meta.env.VITE_PLAID_SECRET || '',
    },
  },
});