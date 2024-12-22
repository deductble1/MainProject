import React from 'react';
import { Brain, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { useTransactions } from '../../hooks/useTransactions';
import { useAIAnalysis } from '../../hooks/useAIAnalysis';

export function AIInsights() {
  const { transactions } = useTransactions();
  const { insights, totalPotentialSavings } = useAIAnalysis(transactions);

  const getIcon = (type: string) => {
    switch (type) {
      case 'saving':
        return <TrendingUp className="h-5 w-5 text-emerald-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'tip':
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Brain className="h-5 w-5 text-primary-500 mr-2" />
            <h2 className="text-lg font-semibold text-neutral-850">AI Insights</h2>
          </div>
          {totalPotentialSavings > 0 && (
            <div className="text-sm text-emerald-600 font-medium">
              Potential Savings: {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(totalPotentialSavings)}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`flex items-start p-4 rounded-lg ${
                insight.type === 'saving'
                  ? 'bg-emerald-50'
                  : insight.type === 'warning'
                  ? 'bg-amber-50'
                  : 'bg-blue-50'
              }`}
            >
              <div className="mt-1 mr-4">{getIcon(insight.type)}</div>
              <div>
                <h3 className="text-sm font-medium text-neutral-850 mb-1">
                  {insight.title}
                </h3>
                <p className="text-sm text-gray-600">{insight.description}</p>
                {insight.impact && (
                  <p className="text-sm font-medium text-emerald-600 mt-2">
                    Potential Impact: {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(insight.impact)}
                  </p>
                )}
              </div>
            </div>
          ))}

          {insights.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No insights available at the moment. Add more transactions to get AI-powered recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}