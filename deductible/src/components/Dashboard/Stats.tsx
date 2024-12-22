import React from 'react';
import { DollarSign, TrendingUp, Calculator, PiggyBank } from 'lucide-react';
import type { DashboardStats } from '../../types';

interface StatsProps {
  stats: DashboardStats;
}

export function Stats({ stats }: StatsProps) {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const statItems = [
    {
      label: 'Total Income',
      value: formatCurrency(stats.totalIncome),
      icon: DollarSign,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(stats.totalExpenses),
      icon: TrendingUp,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10'
    },
    {
      label: 'Potential Deductions',
      value: formatCurrency(stats.potentialDeductions),
      icon: Calculator,
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/10'
    },
    {
      label: 'Est. Tax Liability',
      value: formatCurrency(stats.estimatedTaxLiability),
      icon: PiggyBank,
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item) => (
        <div key={item.label} className="bg-white rounded-lg border border-gray-100">
          <div className="p-6">
            <div className="flex items-center">
              <div className={`${item.bgColor} rounded-lg p-3`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{item.label}</p>
                <p className="text-lg font-semibold text-neutral-850">{item.value}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}