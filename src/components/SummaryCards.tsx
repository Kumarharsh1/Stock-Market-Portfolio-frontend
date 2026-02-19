import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';

interface Props {
  summary: {
    totalInvestment: number;
    totalPresentValue: number;
    totalGainLoss: number;
    totalGainLossPercentage: number;
  };
}

const SummaryCards: React.FC<Props> = ({ summary }) => {
  const formatCurrency = (value: number) => {
    // Simple format without special symbols
    return 'Rs. ' + new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const cards = [
    {
      title: 'Total Investment',
      value: formatCurrency(summary.totalInvestment),
      icon: DollarSign,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-500/20',
      textColor: 'text-blue-400',
      subtext: 'Initial capital deployed',
      progress: 100
    },
    {
      title: 'Present Value',
      value: formatCurrency(summary.totalPresentValue),
      icon: PieChart,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-500/20',
      textColor: 'text-purple-400',
      subtext: 'Current market value',
      progress: (summary.totalPresentValue / summary.totalInvestment) * 100
    },
    {
      title: 'Total Gain/Loss',
      value: formatCurrency(Math.abs(summary.totalGainLoss)),
      icon: summary.totalGainLoss >= 0 ? TrendingUp : TrendingDown,
      color: summary.totalGainLoss >= 0 ? 'from-green-400 to-green-600' : 'from-red-400 to-red-600',
      bgColor: summary.totalGainLoss >= 0 ? 'bg-green-500/20' : 'bg-red-500/20',
      textColor: summary.totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400',
      change: summary.totalGainLossPercentage,
      isPositive: summary.totalGainLoss >= 0,
      subtext: summary.totalGainLoss >= 0 ? 'Profit' : 'Loss',
      progress: Math.min(Math.abs(summary.totalGainLossPercentage), 100)
    },
    {
      title: 'Return %',
      value: `${summary.totalGainLossPercentage >= 0 ? '+' : ''}${formatNumber(Math.abs(summary.totalGainLossPercentage))}%`,
      icon: summary.totalGainLossPercentage >= 0 ? ArrowUpRight : ArrowDownRight,
      color: summary.totalGainLossPercentage >= 0 ? 'from-green-400 to-green-600' : 'from-red-400 to-red-600',
      bgColor: summary.totalGainLossPercentage >= 0 ? 'bg-green-500/20' : 'bg-red-500/20',
      textColor: summary.totalGainLossPercentage >= 0 ? 'text-green-400' : 'text-red-400',
      isPositive: summary.totalGainLossPercentage >= 0,
      subtext: 'Overall return',
      progress: Math.min(Math.abs(summary.totalGainLossPercentage), 100)
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="stat-card group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 rounded-full blur-2xl`} />
            
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${card.bgColor} rounded-xl group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
              {card.change !== undefined && (
                <span className={`text-sm font-semibold ${card.isPositive ? 'text-green-400' : 'text-red-400'} bg-white/5 px-2 py-1 rounded-full border border-white/10`}>
                  {card.isPositive ? '+' : ''}{card.change.toFixed(2)}%
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-400 mb-1">{card.title}</p>
            <p className={`text-2xl font-bold ${card.isPositive !== undefined ? (card.isPositive ? 'positive' : 'negative') : ''}`}>
              {card.value}
            </p>
            <p className="text-xs text-gray-500 mt-2">{card.subtext}</p>
            
            <div className="mt-3 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${card.color} rounded-full transition-all duration-500`}
                style={{ width: `${card.progress}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
