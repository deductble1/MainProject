import React from 'react';
import { Plus, Link2 } from 'lucide-react';

interface DashboardHeaderProps {
  onAddTransaction: () => void;
  onConnectBank: () => void;
}

export function DashboardHeader({ onAddTransaction, onConnectBank }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-semibold text-neutral-850">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={onConnectBank}
          className="flex items-center px-4 py-2 bg-white border border-gray-200 text-neutral-850 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Link2 className="h-4 w-4 mr-2" />
          Connect Bank
        </button>
        <button
          onClick={onAddTransaction}
          className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </button>
      </div>
    </div>
  );
}