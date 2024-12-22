import { useState } from 'react';
import type { Transaction } from '../types';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-03-10',
      amount: -250.00,
      description: 'Office Supplies - Staples',
      category: 'supplies',
      type: 'expense',
      isDeductible: true,
      confidence: 95
    },
    {
      id: '2',
      date: '2024-03-09',
      amount: 1500.00,
      description: 'Client Payment - ABC Corp',
      category: 'income',
      type: 'income',
      confidence: 98
    }
  ]);

  const addTransaction = (newTransaction: Omit<Transaction, 'id' | 'confidence'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
      confidence: 90
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const addTransactions = (newTransactions: Transaction[]) => {
    setTransactions(prev => [...newTransactions, ...prev]);
  };

  const updateCategory = (id: string, category: string) => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === id
          ? { ...transaction, category }
          : transaction
      )
    );
  };

  return {
    transactions,
    addTransaction,
    addTransactions,
    updateCategory,
  };
}