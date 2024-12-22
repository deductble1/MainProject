import React from 'react';
import { Building2, RotateCw, Unlink } from 'lucide-react';
import { type ConnectedAccount } from '../../types';

interface AccountsListProps {
  accounts: ConnectedAccount[];
  onSync: (accountId: string) => void;
  onDisconnect: (accountId: string) => void;
}

export function AccountsList({ accounts, onSync, onDisconnect }: AccountsListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-neutral-850 mb-4">Connected Accounts</h2>
        <div className="space-y-4">
          {accounts.map(account => (
            <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-850">{account.bankName}</h3>
                  <p className="text-sm text-gray-500">••••{account.lastFour}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onSync(account.id)}
                  className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                  title="Sync transactions"
                >
                  <RotateCw className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDisconnect(account.id)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Disconnect account"
                >
                  <Unlink className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}