import { useMemo } from 'react';
import type { Transaction, DashboardStats } from '../types';

export function useDashboardStats(transactions: Transaction[]): DashboardStats {
  return useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = Math.abs(
      transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const potentialDeductions = Math.abs(
      transactions
        .filter(t => t.type === 'expense' && t.isDeductible)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    // Simple tax liability calculation (for demonstration)
    const estimatedTaxLiability = (totalIncome - potentialDeductions) * 0.21;

    return {
      totalIncome,
      totalExpenses,
      potentialDeductions,
      estimatedTaxLiability
    };
  }, [transactions]);
}