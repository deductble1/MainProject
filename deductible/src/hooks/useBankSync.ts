import { useState } from 'react';
import { syncBankTransactions } from '../services/bankSync/bankSyncService';
import { analyzeTransaction } from '../services/ai/transactionAnalyzer';
import { useTransactions } from './useTransactions';
import type { Transaction } from '../types';

export function useBankSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncError, setLastSyncError] = useState<string | null>(null);
  const { addTransactions } = useTransactions();

  const syncAccount = async (accountId: string) => {
    setIsSyncing(true);
    setLastSyncError(null);

    try {
      const result = await syncBankTransactions(accountId);
      
      if (!result.success) {
        throw new Error(result.error || 'Sync failed');
      }

      // Analyze and process new transactions
      const analyzedTransactions: Transaction[] = [];
      
      for (const bankTx of result.transactions) {
        const analysis = await analyzeTransaction(bankTx);
        
        analyzedTransactions.push({
          id: bankTx.id,
          date: bankTx.date,
          amount: bankTx.amount,
          description: bankTx.description,
          category: analysis.category,
          type: bankTx.amount < 0 ? 'expense' : 'income',
          isDeductible: analysis.isDeductible,
          confidence: analysis.confidence,
          accountId: bankTx.accountId,
          aiTags: analysis.tags,
          lastModified: new Date().toISOString()
        });
      }

      addTransactions(analyzedTransactions);
      return { success: true, count: analyzedTransactions.length };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setLastSyncError(message);
      return { success: false, error: message };
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    syncAccount,
    isSyncing,
    lastSyncError
  };
}