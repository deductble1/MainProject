export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  isDeductible?: boolean;
  confidence: number;
  accountId?: string;
  receipt?: string; // URL to receipt image/document
  aiTags?: string[]; // AI-generated tags for better categorization
  lastModified?: string;
  notes?: string;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  potentialDeductions: number;
  estimatedTaxLiability: number;
}

export interface ConnectedAccount {
  id: string;
  bankName: string;
  lastFour: string;
  type: 'checking' | 'savings' | 'credit';
  lastSync: string;
}

export interface BankProvider {
  id: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  isDeductible: boolean;
}