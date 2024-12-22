import { useState } from 'react';
import type { Transaction, DashboardStats } from '../types';

export function useDashboardData() {
  const [stats] = useState<DashboardStats>({
    totalIncome: 150000,
    totalExpenses: 45000,
    potentialDeductions: 28000,
    estimatedTaxLiability: 31500
  });

  const [transactions] = useState<Transaction[]>([
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

  const handleCategoryChange = (id: string, category: string) => {
    console.log('Category changed:', { id, category });
  };

  return {
    stats,
    transactions,
    handleCategoryChange
  };
}