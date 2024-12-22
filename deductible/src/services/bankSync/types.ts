export interface BankTransaction {
  id: string;
  accountId: string;
  date: string;
  amount: number;
  description: string;
  category?: string;
  merchantName?: string;
  pending: boolean;
  type: 'credit' | 'debit';
}

export interface SyncResult {
  success: boolean;
  newTransactions: number;
  error?: string;
}