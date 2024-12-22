import { Transaction, BankTransaction } from '../../types';

export interface AnalysisResult {
  category: string;
  isDeductible: boolean;
  confidence: number;
  tags: string[];
}

export async function analyzeTransaction(
  transaction: BankTransaction
): Promise<AnalysisResult> {
  // In production, this would call your AI service
  return mockAnalyzeTransaction(transaction);
}

// Mock analysis logic
function mockAnalyzeTransaction(transaction: BankTransaction): AnalysisResult {
  const description = transaction.description.toLowerCase();
  
  if (description.includes('office') || description.includes('supplies')) {
    return {
      category: 'supplies',
      isDeductible: true,
      confidence: 90,
      tags: ['office', 'supplies', 'business']
    };
  }

  return {
    category: 'other',
    isDeductible: false,
    confidence: 70,
    tags: []
  };
}