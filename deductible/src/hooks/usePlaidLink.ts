import { useState, useCallback } from 'react';
import { usePlaidLink as usePlaidLinkSDK } from 'react-plaid-link';
import { createLinkToken, exchangePublicToken, fetchTransactions } from '../services/api';
import { useTransactions } from './useTransactions';

export function usePlaidLink() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addTransactions } = useTransactions();

  const onSuccess = useCallback(async (publicToken: string) => {
    try {
      const accessToken = await exchangePublicToken(publicToken);
      const transactions = await fetchTransactions(accessToken);
      addTransactions(transactions);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process transactions');
      setIsLoading(false);
    }
  }, [addTransactions]);

  const config = {
    token,
    onSuccess,
    onExit: () => {
      setError(null);
      setIsLoading(false);
    },
    onEvent: (eventName: string) => {
      console.log('Plaid Event:', eventName);
    },
  };

  const { open, ready } = usePlaidLinkSDK(config);

  const connectBank = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!token) {
        const linkToken = await createLinkToken();
        if (linkToken) {
          setToken(linkToken);
          setTimeout(() => open(), 100);
        } else {
          throw new Error('Failed to get link token');
        }
      } else {
        open();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to bank');
      setIsLoading(false);
    }
  }, [token, open]);

  return {
    connectBank,
    isReady: ready,
    isLoading,
    error
  };
}