import React, { useState } from 'react';
import { Stats } from './Stats';
import { TransactionList } from '../Transactions/TransactionList';
import { AIInsights } from './AIInsights';
import { DashboardHeader } from './DashboardHeader';
import { TransactionModal } from '../Transactions/TransactionModal';
import { AccountsList } from '../Accounts/AccountsList';
import { ConnectBankModal } from '../Accounts/ConnectBankModal';
import { useTransactions } from '../../hooks/useTransactions';
import { useBankAccounts } from '../../hooks/useBankAccounts';
import { useDashboardStats } from '../../hooks/useDashboardStats';

export function Dashboard() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isConnectBankModalOpen, setIsConnectBankModalOpen] = useState(false);
  
  const { transactions, addTransaction, updateCategory } = useTransactions();
  const { accounts, providers, connectAccount, syncAccount, disconnectAccount } = useBankAccounts();
  const stats = useDashboardStats(transactions);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DashboardHeader 
        onAddTransaction={() => setIsTransactionModalOpen(true)}
        onConnectBank={() => setIsConnectBankModalOpen(true)}
      />
      <Stats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-850">Recent Transactions</h2>
            <button className="text-sm text-primary-500 hover:text-primary-600">
              View All
            </button>
          </div>
          <TransactionList 
            transactions={transactions}
            onCategoryChange={updateCategory}
          />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <AccountsList
            accounts={accounts}
            onSync={syncAccount}
            onDisconnect={disconnectAccount}
          />
          <AIInsights />
        </div>
      </div>

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSubmit={addTransaction}
      />

      <ConnectBankModal
        isOpen={isConnectBankModalOpen}
        onClose={() => setIsConnectBankModalOpen(false)}
        onSelect={connectAccount}
        providers={providers}
      />
    </main>
  );
}