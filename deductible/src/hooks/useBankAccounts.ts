import { useState, useCallback } from 'react';
import type { ConnectedAccount, BankProvider } from '../types';

// Simulated bank providers (in real app, this would come from an API)
const BANK_PROVIDERS: BankProvider[] = [
  {
    id: 'plaid',
    name: 'Most Major Banks',
    description: 'Chase, Bank of America, Wells Fargo, and more',
  },
  {
    id: 'mx',
    name: 'Credit Unions & Regional Banks',
    description: 'Local credit unions and smaller banks',
  },
];

export function useBankAccounts() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    {
      id: '1',
      bankName: 'Chase Bank',
      lastFour: '4567',
      type: 'checking',
      lastSync: new Date().toISOString(),
    },
  ]);

  const connectAccount = useCallback(async (providerId: string) => {
    // In a real app, this would integrate with Plaid/MX Link
    console.log('Connecting account with provider:', providerId);
    
    // Simulate new account connection
    const newAccount: ConnectedAccount = {
      id: crypto.randomUUID(),
      bankName: 'New Connected Bank',
      lastFour: '9999',
      type: 'checking',
      lastSync: new Date().toISOString(),
    };
    
    setAccounts(prev => [...prev, newAccount]);
  }, []);

  const syncAccount = useCallback(async (accountId: string) => {
    // In a real app, this would fetch new transactions from the bank
    console.log('Syncing account:', accountId);
    
    // Update last sync time
    setAccounts(prev =>
      prev.map(account =>
        account.id === accountId
          ? { ...account, lastSync: new Date().toISOString() }
          : account
      )
    );
  }, []);

  const disconnectAccount = useCallback((accountId: string) => {
    setAccounts(prev => prev.filter(account => account.id !== accountId));
  }, []);

  return {
    accounts,
    providers: BANK_PROVIDERS,
    connectAccount,
    syncAccount,
    disconnectAccount,
  };
}