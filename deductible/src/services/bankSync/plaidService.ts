import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import type { Transaction } from '../../types';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export async function createLinkToken() {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'user-id' },
      client_name: 'Deductble',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en'
    });
    
    return response.data.link_token;
  } catch (error) {
    console.error('Error creating link token:', error);
    return null;
  }
}

export async function getTransactions(accessToken: string) {
  try {
    const response = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: '2024-01-01',
      end_date: '2024-12-31'
    });
    
    return response.data.transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}