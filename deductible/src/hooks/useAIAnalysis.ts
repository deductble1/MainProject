import { useMemo } from 'react';
import type { Transaction } from '../types';

interface AIInsight {
  type: 'saving' | 'warning' | 'tip';
  title: string;
  description: string;
  impact?: number;
  category?: string;
}

export function useAIAnalysis(transactions: Transaction[]) {
  return useMemo(() => {
    const insights: AIInsight[] = [];
    
    // Analyze missing receipts
    const expensesWithoutReceipts = transactions.filter(
      t => t.type === 'expense' && !t.receipt
    );
    
    if (expensesWithoutReceipts.length > 0) {
      const totalAmount = expensesWithoutReceipts.reduce((sum, t) => sum + Math.abs(t.amount), 0);
      insights.push({
        type: 'warning',
        title: 'Missing Documentation',
        description: `${expensesWithoutReceipts.length} transactions lack receipts. Adding these could increase your deductible expenses by ${formatCurrency(totalAmount)}.`,
        impact: totalAmount
      });
    }

    // Analyze expense patterns
    const categoryTotals = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>);

    // Find categories with potential tax savings
    Object.entries(categoryTotals).forEach(([category, total]) => {
      if (total > 5000 && !transactions.some(t => t.category === category && t.isDeductible)) {
        insights.push({
          type: 'saving',
          title: `Potential Tax Savings in ${formatCategory(category)}`,
          description: `You have ${formatCurrency(total)} in ${formatCategory(category)} expenses. Some of these might be tax-deductible.`,
          impact: total * 0.21, // Estimated tax savings
          category
        });
      }
    });

    // Analyze transaction confidence scores
    const lowConfidenceTransactions = transactions.filter(t => t.confidence < 80);
    if (lowConfidenceTransactions.length > 0) {
      insights.push({
        type: 'tip',
        title: 'Review Needed',
        description: `${lowConfidenceTransactions.length} transactions have low confidence scores and may need manual review.`
      });
    }

    return {
      insights,
      totalPotentialSavings: insights.reduce((sum, i) => sum + (i.impact || 0), 0)
    };
  }, [transactions]);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1');
}