import type { Transaction } from '../../types';
import type { PlaidTransaction } from 'plaid';

export function mapPlaidTransactions(plaidTransactions: PlaidTransaction[]): Transaction[] {
  return plaidTransactions.map(pt => ({
    id: pt.transaction_id || crypto.randomUUID(),
    date: pt.date,
    amount: pt.amount,
    description: pt.name || '',
    category: pt.category?.[0]?.toLowerCase() || 'uncategorized',
    type: pt.amount < 0 ? 'expense' : 'income',
    confidence: 90,
    accountId: pt.account_id,
    lastModified: new Date().toISOString()
  }));
}