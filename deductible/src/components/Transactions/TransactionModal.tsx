import React from 'react';
import { X } from 'lucide-react';
import type { Transaction } from '../../types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, 'id' | 'confidence'>) => void;
}

export function TransactionModal({ isOpen, onClose, onSubmit }: TransactionModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const transaction = {
      date: formData.get('date') as string,
      amount: Number(formData.get('amount')) * (formData.get('type') === 'expense' ? -1 : 1),
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      type: formData.get('type') as 'income' | 'expense',
      isDeductible: formData.get('isDeductible') === 'true'
    };

    onSubmit(transaction);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-850">Add Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full rounded-lg border-gray-300 border p-2 focus:border-primary-500 focus:ring-primary-500"
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full rounded-lg border-gray-300 border p-2 focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              min="0"
              className="w-full rounded-lg border-gray-300 border p-2 focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="w-full rounded-lg border-gray-300 border p-2 focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full rounded-lg border-gray-300 border p-2 focus:border-primary-500 focus:ring-primary-500"
              required
            >
              <option value="office">Office Expenses</option>
              <option value="travel">Travel</option>
              <option value="meals">Meals & Entertainment</option>
              <option value="supplies">Supplies</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDeductible"
              name="isDeductible"
              value="true"
              className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isDeductible" className="ml-2 block text-sm text-gray-700">
              Tax Deductible
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}