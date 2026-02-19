import React, { useState } from 'react';
import { Stock } from '@/types';
import { ArrowUpCircle, ArrowDownCircle, Search, TrendingUp, TrendingDown, AlertCircle, ExternalLink } from 'lucide-react';

interface Props {
  stocks: Stock[];
}

const PortfolioTable: React.FC<Props> = ({ stocks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Stock>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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

  const formatPercentage = (value: number) => {
    return value.toFixed(2) + '%';
  };

  const handleSort = (field: keyof Stock) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    if (aVal === undefined || bVal === undefined) return 0;
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' 
        ? aVal.localeCompare(bVal) 
        : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const columns = [
    { key: 'name', label: 'Particulars' },
    { key: 'sector', label: 'Sector' },
    { key: 'purchasePrice', label: 'Purchase Price' },
    { key: 'quantity', label: 'Qty' },
    { key: 'investment', label: 'Investment' },
    { key: 'portfolioPercentage', label: 'Portfolio %' },
    { key: 'exchange', label: 'Exchange' },
    { key: 'cmp', label: 'CMP' },
    { key: 'presentValue', label: 'Present Value' },
    { key: 'gainLoss', label: 'Gain/Loss' },
    { key: 'peRatio', label: 'P/E Ratio' },
    { key: 'latestEarnings', label: 'Latest Earnings' },
  ];

  const getStockUrl = (symbol: string, exchange: string) => {
    return `https://www.google.com/finance/quote/${symbol}:${exchange}`;
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold gradient-text">Portfolio Holdings</h2>
            <span className="live-badge">
              <TrendingUp className="w-3 h-3 mr-1" />
              Real-time
            </span>
            <span className="text-xs text-gray-500">Data from Alpha Vantage API</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm w-full md:w-64"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key as keyof Stock)}
                  className="table-header cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span>{col.label}</span>
                    {sortField === col.key && (
                      <span className="text-blue-400">
                        {sortDirection === 'asc' ? '?' : '?'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedStocks.map((stock) => (
              <tr key={stock.id} className="hover:bg-white/5 transition-colors group">
                <td className="table-cell font-medium">
                  <div className="flex items-center space-x-2">
                    <span>{stock.name}</span>
                    <a 
                      href={getStockUrl(stock.symbol, stock.exchange)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="w-3 h-3 text-gray-500 hover:text-blue-400" />
                    </a>
                  </div>
                </td>
                <td className="table-cell">
                  <span className="px-2 py-1 bg-white/5 rounded-lg text-xs">
                    {stock.sector}
                  </span>
                </td>
                <td className="table-cell font-mono">{formatCurrency(stock.purchasePrice)}</td>
                <td className="table-cell font-mono">{stock.quantity}</td>
                <td className="table-cell font-mono">{formatCurrency(stock.investment)}</td>
                <td className="table-cell font-mono">{formatPercentage(stock.portfolioPercentage)}</td>
                <td className="table-cell">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-mono">
                    {stock.exchange}
                  </span>
                </td>
                <td className="table-cell">
                  {stock.cmp ? (
                    <div>
                      <span className="font-semibold text-blue-400 font-mono">
                        {formatCurrency(stock.cmp)}
                      </span>
                      {'change' in stock && stock.change !== 0 && (
                        <span className={`ml-2 text-xs ${stock.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {stock.change > 0 ? '?' : '?'} {formatNumber(Math.abs(stock.change))}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Loading...
                    </span>
                  )}
                </td>
                <td className="table-cell font-mono">{formatCurrency(stock.presentValue)}</td>
                <td className="table-cell">
                  <div className="flex items-center space-x-2">
                    {stock.gainLoss >= 0 ? (
                      <ArrowUpCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowDownCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className={stock.gainLoss >= 0 ? 'positive font-mono' : 'negative font-mono'}>
                      {formatCurrency(Math.abs(stock.gainLoss))}
                    </span>
                    <span className={`text-xs font-mono ${stock.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ({stock.gainLossPercentage.toFixed(2)}%)
                    </span>
                  </div>
                </td>
                <td className="table-cell">
                  {stock.peRatio ? (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-mono">
                      {stock.peRatio.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-gray-500 font-mono">N/A</span>
                  )}
                </td>
                <td className="table-cell text-gray-400 font-mono">
                  {stock.latestEarnings || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-white/10 text-xs text-gray-500 flex justify-between items-center">
        <span>* Real-time data from Alpha Vantage API</span>
        <span className="live-badge text-xs">Auto-refresh every 15s</span>
      </div>
    </div>
  );
};

export default PortfolioTable;
