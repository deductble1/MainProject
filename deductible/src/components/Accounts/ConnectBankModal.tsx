import React from 'react';
import { X, Building2 } from 'lucide-react';
import { usePlaidLink } from '../../hooks/usePlaidLink';

interface ConnectBankModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectBankModal({ isOpen, onClose }: ConnectBankModalProps) {
  const { connectBank, isLoading, error } = usePlaidLink();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-850">Connect Your Bank Account</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <p className="text-gray-600">
            Connect your bank account securely using Plaid. We'll import your transactions automatically.
          </p>
          
          <button
            onClick={connectBank}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Building2 className="h-5 w-5 mr-2" />
            {isLoading ? 'Connecting...' : 'Connect Bank Account'}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Your credentials are securely handled by Plaid and never stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}