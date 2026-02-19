import React, { useState } from 'react';
import { SectorSummary as SectorSummaryType } from '@/types';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface Props {
  sectorSummaries: SectorSummaryType[];
}

const SectorSummary: React.FC<Props> = ({ sectorSummaries }) => {
  const [expandedSectors, setExpandedSectors] = useState<string[]>([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const toggleSector = (sector: string) => {
    setExpandedSectors(prev =>
      prev.includes(sector)
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold gradient-text">Sector-wise Performance</h2>
        <BarChart3 className="w-5 h-5 text-gray-400" />
      </div>
      
      {sectorSummaries.map((sector) => {
        const isExpanded = expandedSectors.includes(sector.sector);
        const isPositive = sector.gainLossPercentage >= 0;
        
        return (
          <div key={sector.sector} className="glass-card overflow-hidden">
            <div
              className="p-4 cursor-pointer hover:bg-white/5 transition-all"
              onClick={() => toggleSector(sector.sector)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {isPositive ? (
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200">{sector.sector}</h3>
                    <p className="text-xs text-gray-400">{sector.stocks.length} stocks</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Investment</p>
                    <p className="font-semibold">{formatCurrency(sector.totalInvestment)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Present Value</p>
                    <p className="font-semibold">{formatCurrency(sector.totalPresentValue)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Gain/Loss</p>
                    <p className={`font-semibold ${isPositive ? 'positive' : 'negative'}`}>
                      {isPositive ? '+' : '-'}{formatCurrency(Math.abs(sector.totalGainLoss))}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Return</p>
                    <p className={`font-semibold ${isPositive ? 'positive' : 'negative'}`}>
                      {isPositive ? '+' : ''}{sector.gainLossPercentage.toFixed(2)}%
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            
            {isExpanded && (
              <div className="border-t border-white/10 p-4 bg-white/5">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-400">
                      <th className="text-left py-2">Stock</th>
                      <th className="text-right py-2">Investment</th>
                      <th className="text-right py-2">Present Value</th>
                      <th className="text-right py-2">Gain/Loss</th>
                      <th className="text-right py-2">Return %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sector.stocks.map((stock) => {
                      const stockPositive = stock.gainLoss >= 0;
                      return (
                        <tr key={stock.id} className="text-sm border-t border-white/5">
                          <td className="py-2">{stock.name}</td>
                          <td className="text-right py-2">{formatCurrency(stock.investment)}</td>
                          <td className="text-right py-2">{formatCurrency(stock.presentValue)}</td>
                          <td className={`text-right py-2 ${stockPositive ? 'positive' : 'negative'}`}>
                            {stockPositive ? '+' : '-'}{formatCurrency(Math.abs(stock.gainLoss))}
                          </td>
                          <td className={`text-right py-2 ${stockPositive ? 'positive' : 'negative'}`}>
                            {stockPositive ? '+' : ''}{stock.gainLossPercentage.toFixed(2)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SectorSummary;
