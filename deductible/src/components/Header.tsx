import React from 'react';
import { ReceiptText, Bell, Settings, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-neutral-850 border-b border-neutral-750">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ReceiptText className="h-8 w-8 text-primary-200" />
            <span className="ml-2 text-xl font-semibold text-white">deductble</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <button className="ml-2 p-2 text-gray-400 hover:text-white transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}