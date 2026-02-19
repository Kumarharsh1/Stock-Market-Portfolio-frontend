import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity, RefreshCw, Clock, Zap, Globe, BarChart3 } from 'lucide-react';

interface HeaderProps {
  lastUpdated: Date;
}

const Header: React.FC<HeaderProps> = ({ lastUpdated }) => {
  const [marketStatus, setMarketStatus] = useState('Open');
  const [marketChange, setMarketChange] = useState(0.45);

  useEffect(() => {
    // Simulate market status check
    const hour = new Date().getHours();
    setMarketStatus(hour >= 9 && hour <= 15 ? 'Open' : 'Closed');
  }, []);

  return (
    <div className="glass-card p-6 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
      
      <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl animate-bounce">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Portfolio Dashboard</h1>
            <div className="flex items-center space-x-4 mt-2">
              <p className="text-gray-400 flex items-center">
                <Globe className="w-4 h-4 mr-2 text-blue-400" />
                Real-time data from Alpha Vantage API
              </p>
              <span className="live-badge">
                <Zap className="w-3 h-3 mr-1" />
                LIVE
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                marketStatus === 'Open' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                Market {marketStatus}
                {marketStatus === 'Open' && (
                  <span className="ml-1 text-green-400">? {marketChange}%</span>
                )}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <RefreshCw className="w-4 h-4 text-blue-400 animate-spin-slow" />
            <span className="text-sm text-gray-300">Updates every 15s</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">
              {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <BarChart3 className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-gray-300">NSE/BSE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
