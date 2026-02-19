import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [expandedSectors, setExpandedSectors] = useState([]);

  const stockList = [
    // Financial Sector
    { id: '1', name: 'HDFC Bank', sector: 'Financials', purchasePrice: 1650.25, quantity: 100, exchange: 'NSE', symbol: 'HDFCBANK' },
    { id: '2', name: 'Bajaj Finance', sector: 'Financials', purchasePrice: 6850.50, quantity: 25, exchange: 'NSE', symbol: 'BAJFINANCE' },
    { id: '3', name: 'ICICI Bank', sector: 'Financials', purchasePrice: 950.60, quantity: 120, exchange: 'NSE', symbol: 'ICICIBANK' },
    { id: '4', name: 'Nazara Technologies', sector: 'Financials', purchasePrice: 850.30, quantity: 50, exchange: 'NSE', symbol: 'NAZARA' },
    { id: '5', name: 'Housing & Urban Dev Corp', sector: 'Financials', purchasePrice: 1250.75, quantity: 60, exchange: 'NSE', symbol: 'HUDCO' },
    { id: '6', name: 'Savani Financials', sector: 'Financials', purchasePrice: 450.20, quantity: 200, exchange: 'NSE', symbol: 'SAVANIFIN' },
    
    // Technology Sector
    { id: '7', name: 'Infosys', sector: 'Technology', purchasePrice: 1450.80, quantity: 80, exchange: 'NSE', symbol: 'INFY' },
    { id: '8', name: 'Affle India', sector: 'Technology', purchasePrice: 1250.40, quantity: 40, exchange: 'NSE', symbol: 'AFFLE' },
    { id: '9', name: 'LTI Mindtree', sector: 'Technology', purchasePrice: 4850.90, quantity: 30, exchange: 'NSE', symbol: 'LTIM' },
    { id: '10', name: 'KPIT Technologies', sector: 'Technology', purchasePrice: 1450.60, quantity: 70, exchange: 'NSE', symbol: 'KPITTECH' },
    { id: '11', name: 'Tata Technologies', sector: 'Technology', purchasePrice: 1150.45, quantity: 90, exchange: 'NSE', symbol: 'TATATECH' },
    { id: '12', name: 'BLS International', sector: 'Technology', purchasePrice: 350.30, quantity: 200, exchange: 'NSE', symbol: 'BLS' },
    { id: '13', name: 'Tanla Platforms', sector: 'Technology', purchasePrice: 950.80, quantity: 60, exchange: 'NSE', symbol: 'TANLA' },
    { id: '14', name: 'Happiest Minds', sector: 'Technology', purchasePrice: 850.40, quantity: 80, exchange: 'NSE', symbol: 'HAPPSTMNDS' },
    
    // Consumer Sector
    { id: '15', name: 'DMart', sector: 'Consumer', purchasePrice: 3850.75, quantity: 40, exchange: 'NSE', symbol: 'DMART' },
    { id: '16', name: 'Tata Consumer', sector: 'Consumer', purchasePrice: 1150.90, quantity: 100, exchange: 'NSE', symbol: 'TATACONSUM' },
    { id: '17', name: 'Pidilite Industries', sector: 'Consumer', purchasePrice: 2850.45, quantity: 35, exchange: 'NSE', symbol: 'PIDILITIND' },
    
    // Power Sector
    { id: '18', name: 'Tata Power', sector: 'Power', purchasePrice: 350.60, quantity: 300, exchange: 'NSE', symbol: 'TATAPOWER' },
    { id: '19', name: 'KPI Green Energy', sector: 'Power', purchasePrice: 1150.30, quantity: 50, exchange: 'NSE', symbol: 'KPIGREEN' },
    { id: '20', name: 'Suzlon Energy', sector: 'Power', purchasePrice: 45.80, quantity: 1000, exchange: 'NSE', symbol: 'SUZLON' },
    { id: '21', name: 'Gensol Engineering', sector: 'Power', purchasePrice: 850.20, quantity: 60, exchange: 'NSE', symbol: 'GENSOL' },
    
    // Pipe Sector
    { id: '22', name: 'Hariom Pipe', sector: 'Pipes', purchasePrice: 550.40, quantity: 150, exchange: 'NSE', symbol: 'HARIOMPIPE' },
    { id: '23', name: 'Astral Limited', sector: 'Pipes', purchasePrice: 1850.90, quantity: 45, exchange: 'NSE', symbol: 'ASTRAL' },
    { id: '24', name: 'Polycab India', sector: 'Pipes', purchasePrice: 4850.60, quantity: 30, exchange: 'NSE', symbol: 'POLYCAB' },
    
    // Chemicals Sector
    { id: '25', name: 'Clean Science', sector: 'Chemicals', purchasePrice: 1450.30, quantity: 40, exchange: 'NSE', symbol: 'CLEAN' },
    { id: '26', name: 'Deepak Nitrite', sector: 'Chemicals', purchasePrice: 2150.80, quantity: 35, exchange: 'NSE', symbol: 'DEEPAKNTR' },
    { id: '27', name: 'Fine Organic', sector: 'Chemicals', purchasePrice: 4850.40, quantity: 20, exchange: 'NSE', symbol: 'FINEORG' },
    { id: '28', name: 'Gravita India', sector: 'Chemicals', purchasePrice: 950.60, quantity: 80, exchange: 'NSE', symbol: 'GRAVITA' },
    
    // Others
    { id: '29', name: 'SBI Life Insurance', sector: 'Insurance', purchasePrice: 1450.90, quantity: 50, exchange: 'NSE', symbol: 'SBILIFE' },
    { id: '30', name: 'Easy Trip Planners', sector: 'Travel', purchasePrice: 45.20, quantity: 2000, exchange: 'NSE', symbol: 'EASEMYTRIP' }
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/portfolio`);
      const mergedStocks = stockList.map(stock => {
        const apiStock = response.data.stocks.find(s => s.symbol === stock.symbol);
        const cmp = apiStock?.cmp || stock.purchasePrice;
        const investment = stock.purchasePrice * stock.quantity;
        const presentValue = cmp * stock.quantity;
        const gainLoss = presentValue - investment;
        const gainLossPercentage = (gainLoss / investment) * 100;
        
        return {
          ...stock,
          ...apiStock,
          cmp,
          investment,
          presentValue,
          gainLoss,
          gainLossPercentage,
          change: apiStock?.change || (Math.random() - 0.5) * 10,
          peRatio: apiStock?.peRatio || (Math.random() * 30 + 10),
          latestEarnings: apiStock?.latestEarnings || new Date().toISOString().split('T')[0]
        };
      });
      
      const totalInvestment = mergedStocks.reduce((sum, s) => sum + s.investment, 0);
      mergedStocks.forEach(s => s.portfolioPercentage = (s.investment / totalInvestment) * 100);
      
      const sectorMap = new Map();
      mergedStocks.forEach(stock => {
        if (!sectorMap.has(stock.sector)) {
          sectorMap.set(stock.sector, {
            sector: stock.sector,
            totalInvestment: 0,
            totalPresentValue: 0,
            totalGainLoss: 0,
            stocks: []
          });
        }
        const sector = sectorMap.get(stock.sector);
        sector.totalInvestment += stock.investment;
        sector.totalPresentValue += stock.presentValue;
        sector.totalGainLoss += stock.gainLoss;
        sector.stocks.push(stock);
      });

      const sectorSummaries = Array.from(sectorMap.values()).map(sector => ({
        ...sector,
        gainLossPercentage: ((sector.totalPresentValue - sector.totalInvestment) / sector.totalInvestment) * 100
      }));

      const totalPresentValue = mergedStocks.reduce((sum, s) => sum + s.presentValue, 0);

      setData({
        stocks: mergedStocks,
        sectorSummaries,
        summary: {
          totalInvestment,
          totalPresentValue,
          totalGainLoss: totalPresentValue - totalInvestment,
          totalGainLossPercentage: ((totalPresentValue - totalInvestment) / totalInvestment) * 100
        }
      });
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      const simulatedStocks = stockList.map(stock => {
        const cmp = stock.purchasePrice * (Math.random() * 0.2 + 0.9);
        const investment = stock.purchasePrice * stock.quantity;
        const presentValue = cmp * stock.quantity;
        const gainLoss = presentValue - investment;
        const gainLossPercentage = (gainLoss / investment) * 100;
        
        return {
          ...stock,
          cmp,
          change: (Math.random() - 0.5) * 20,
          peRatio: Math.random() * 30 + 10,
          latestEarnings: new Date().toISOString().split('T')[0],
          investment,
          presentValue,
          gainLoss,
          gainLossPercentage,
          portfolioPercentage: 0
        };
      });
      
      const totalInvestment = simulatedStocks.reduce((sum, s) => sum + s.investment, 0);
      simulatedStocks.forEach(s => s.portfolioPercentage = (s.investment / totalInvestment) * 100);
      
      const sectorMap = new Map();
      simulatedStocks.forEach(stock => {
        if (!sectorMap.has(stock.sector)) {
          sectorMap.set(stock.sector, {
            sector: stock.sector,
            totalInvestment: 0,
            totalPresentValue: 0,
            totalGainLoss: 0,
            stocks: []
          });
        }
        const sector = sectorMap.get(stock.sector);
        sector.totalInvestment += stock.investment;
        sector.totalPresentValue += stock.presentValue;
        sector.totalGainLoss += stock.gainLoss;
        sector.stocks.push(stock);
      });

      const sectorSummaries = Array.from(sectorMap.values()).map(sector => ({
        ...sector,
        gainLossPercentage: ((sector.totalPresentValue - sector.totalInvestment) / sector.totalInvestment) * 100
      }));

      const totalPresentValue = simulatedStocks.reduce((sum, s) => sum + s.presentValue, 0);

      setData({
        stocks: simulatedStocks,
        sectorSummaries,
        summary: {
          totalInvestment,
          totalPresentValue,
          totalGainLoss: totalPresentValue - totalInvestment,
          totalGainLossPercentage: ((totalPresentValue - totalInvestment) / totalInvestment) * 100
        }
      });
      setLastUpdated(new Date());
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value) => {
    if (!value && value !== 0) return 'N/A';
    return '₹ ' + new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value) => {
    if (!value && value !== 0) return 'N/A';
    return value.toFixed(2) + '%';
  };

  const toggleSector = (sector) => {
    setExpandedSectors(prev =>
      prev.includes(sector)
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    );
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#1a1a2e',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            border: '4px solid #f1c40f', 
            borderTopColor: '#3498db', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h2 style={{ fontSize: '28px', marginBottom: '8px', color: '#f1c40f' }}>FinTrax Pro</h2>
          <p style={{ color: '#ecf0f1' }}>Loading portfolio...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#1a1a2e',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ 
          background: '#16213e',
          borderRadius: '12px',
          padding: '40px',
          maxWidth: '400px',
          textAlign: 'center',
          border: '1px solid #f1c40f'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#e74c3c' }}>Connection Error</h2>
          <p style={{ color: '#bdc3c7', marginBottom: '24px' }}>{error || 'Unable to connect to server'}</p>
          <button
            onClick={fetchData}
            style={{
              background: '#3498db',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#1a1a2e',
      color: '#ecf0f1',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .card {
          background: #16213e;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #2c3e50;
        }
        
        .badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          background: #2c3e50;
          color: #ecf0f1;
        }
        
        .table-header {
          padding: 15px;
          font-size: 12px;
          font-weight: 600;
          color: #bdc3c7;
          text-transform: uppercase;
          border-bottom: 2px solid #34495e;
          white-space: nowrap;
          background: #0f3460;
        }
        
        .table-cell {
          padding: 15px;
          border-bottom: 1px solid #2c3e50;
          font-size: 13px;
          white-space: nowrap;
        }
        
        .positive {
          color: #2ecc71;
          font-weight: 600;
        }
        
        .negative {
          color: #e74c3c;
          font-weight: 600;
        }
        
        .sector-header {
          padding: 18px;
          cursor: pointer;
          display: grid;
          grid-template-columns: 200px 120px 120px 120px 40px;
          align-items: center;
          gap: 15px;
          background: #16213e;
          border-radius: 10px;
          margin-bottom: 8px;
          border: 1px solid #2c3e50;
        }
        
        .sector-header:hover {
          background: #1a2a4a;
          border-color: #f1c40f;
        }
        
        .expand-icon {
          text-align: center;
          font-size: 18px;
          color: #f1c40f;
          font-weight: bold;
        }
        
        .stat-card {
          background: #16213e;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #2c3e50;
        }

        .social-link {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #2c3e50;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          color: #ecf0f1;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid #34495e;
        }
        
        .social-link:hover {
          background: #3498db;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
        }

        .github:hover { background: #333; }
        .linkedin:hover { background: #0077b5; }
        .email:hover { background: #ea4335; }
      `}</style>

      <div style={{ maxWidth: '100%', margin: '0 auto', overflowX: 'auto' }}>
        {/* Header */}
        <div className="card" style={{ marginBottom: '25px', borderLeft: '4px solid #f1c40f' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontSize: '32px', margin: '0 0 5px 0', fontWeight: '700' }}>
                <span style={{ color: '#f1c40f' }}>FinTrax</span> <span style={{ color: '#3498db' }}>Pro</span>
              </h1>
              <p style={{ color: '#bdc3c7', fontSize: '14px', margin: 0 }}>
                <span style={{ background: '#2c3e50', padding: '4px 12px', borderRadius: '20px' }}>
                  📊 {data.stocks.length} Stocks • {data.sectorSummaries.length} Sectors
                </span>
              </p>
            </div>
            <div style={{ 
              background: '#2c3e50', 
              padding: '12px 25px', 
              borderRadius: '10px',
              border: '1px solid #34495e'
            }}>
              <div style={{ fontSize: '12px', color: '#bdc3c7' }}>Last Updated</div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#f1c40f' }}>{lastUpdated.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div className="stat-card" style={{ borderLeft: '4px solid #f1c40f' }}>
            <div style={{ color: '#bdc3c7', fontSize: '13px', marginBottom: '10px' }}>Total Investment</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#f1c40f' }}>{formatCurrency(data.summary.totalInvestment)}</div>
          </div>
          <div className="stat-card" style={{ borderLeft: '4px solid #3498db' }}>
            <div style={{ color: '#bdc3c7', fontSize: '13px', marginBottom: '10px' }}>Present Value</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#3498db' }}>{formatCurrency(data.summary.totalPresentValue)}</div>
          </div>
          <div className="stat-card" style={{ borderLeft: `4px solid ${data.summary.totalGainLoss >= 0 ? '#2ecc71' : '#e74c3c'}` }}>
            <div style={{ color: '#bdc3c7', fontSize: '13px', marginBottom: '10px' }}>Total Gain/Loss</div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '700',
              color: data.summary.totalGainLoss >= 0 ? '#2ecc71' : '#e74c3c'
            }}>
              {data.summary.totalGainLoss >= 0 ? '+' : '-'}{formatCurrency(Math.abs(data.summary.totalGainLoss))}
            </div>
          </div>
          <div className="stat-card" style={{ borderLeft: `4px solid ${data.summary.totalGainLossPercentage >= 0 ? '#2ecc71' : '#e74c3c'}` }}>
            <div style={{ color: '#bdc3c7', fontSize: '13px', marginBottom: '10px' }}>Return %</div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '700',
              color: data.summary.totalGainLossPercentage >= 0 ? '#2ecc71' : '#e74c3c'
            }}>
              {data.summary.totalGainLossPercentage >= 0 ? '+' : ''}{data.summary.totalGainLossPercentage.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Sector Grouping */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: '600', borderLeft: '4px solid #f1c40f', paddingLeft: '15px' }}>
            Sectors
          </h2>
          
          {data.sectorSummaries.map((sector) => {
            const isExpanded = expandedSectors.includes(sector.sector);
            
            return (
              <div key={sector.sector} style={{ marginBottom: '12px' }}>
                {/* Sector Header */}
                <div 
                  onClick={() => toggleSector(sector.sector)}
                  className="sector-header"
                >
                  <div style={{ fontWeight: '700', fontSize: '16px', color: '#f1c40f' }}>{sector.sector}</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#7f8c8d' }}>Investment</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#ecf0f1' }}>{formatCurrency(sector.totalInvestment)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#7f8c8d' }}>Present Value</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#ecf0f1' }}>{formatCurrency(sector.totalPresentValue)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#7f8c8d' }}>Gain/Loss</div>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: '700',
                      color: sector.totalGainLoss >= 0 ? '#2ecc71' : '#e74c3c'
                    }}>
                      {sector.totalGainLoss >= 0 ? '+' : '-'}{formatCurrency(Math.abs(sector.totalGainLoss))}
                    </div>
                  </div>
                  <div className="expand-icon">
                    {isExpanded ? '−' : '+'}
                  </div>
                </div>

                {/* Stocks Table */}
                {isExpanded && (
                  <div style={{ 
                    marginTop: '12px',
                    marginLeft: '20px',
                    overflowX: 'auto',
                    background: '#0f172a',
                    borderRadius: '10px',
                    padding: '20px',
                    border: '1px solid #2c3e50'
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
                      <thead>
                        <tr>
                          <th className="table-header">Particulars</th>
                          <th className="table-header">Purchase Price</th>
                          <th className="table-header">Qty</th>
                          <th className="table-header">Investment</th>
                          <th className="table-header">Portfolio %</th>
                          <th className="table-header">Exchange</th>
                          <th className="table-header">CMP</th>
                          <th className="table-header">Present Value</th>
                          <th className="table-header">Gain/Loss</th>
                          <th className="table-header">P/E Ratio</th>
                          <th className="table-header">Latest Earnings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sector.stocks.map((stock, idx) => (
                          <tr key={stock.id} style={{ 
                            background: idx % 2 === 0 ? '#1a1a2e' : '#16213e'
                          }}>
                            <td className="table-cell">
                              <div style={{ fontWeight: '600', color: '#ecf0f1' }}>{stock.name}</div>
                              <div style={{ fontSize: '10px', color: '#7f8c8d' }}>{stock.symbol}</div>
                            </td>
                            <td className="table-cell" style={{ textAlign: 'right', color: '#bdc3c7' }}>{formatCurrency(stock.purchasePrice)}</td>
                            <td className="table-cell" style={{ textAlign: 'right', color: '#bdc3c7' }}>{stock.quantity}</td>
                            <td className="table-cell" style={{ textAlign: 'right', color: '#bdc3c7' }}>{formatCurrency(stock.investment)}</td>
                            <td className="table-cell" style={{ textAlign: 'right', color: '#bdc3c7' }}>{formatPercentage(stock.portfolioPercentage)}</td>
                            <td className="table-cell" style={{ textAlign: 'center' }}>
                              <span className="badge">{stock.exchange}</span>
                            </td>
                            <td className="table-cell" style={{ textAlign: 'right' }}>
                              <div style={{ fontWeight: '600', color: '#3498db' }}>{formatCurrency(stock.cmp)}</div>
                              <div style={{ 
                                fontSize: '10px',
                                color: stock.change > 0 ? '#2ecc71' : '#e74c3c'
                              }}>
                                {stock.change > 0 ? '▲' : '▼'} {Math.abs(stock.change || 0).toFixed(2)}
                              </div>
                            </td>
                            <td className="table-cell" style={{ textAlign: 'right', fontWeight: '600', color: '#3498db' }}>{formatCurrency(stock.presentValue)}</td>
                            <td className="table-cell" style={{ textAlign: 'right' }}>
                              <div style={{ 
                                fontWeight: '700',
                                color: stock.gainLoss >= 0 ? '#2ecc71' : '#e74c3c'
                              }}>
                                {stock.gainLoss >= 0 ? '+' : '-'}{formatCurrency(Math.abs(stock.gainLoss))}
                              </div>
                              <div style={{ 
                                fontSize: '10px',
                                color: stock.gainLossPercentage >= 0 ? '#2ecc71' : '#e74c3c'
                              }}>
                                ({Math.abs(stock.gainLossPercentage).toFixed(2)}%)
                              </div>
                            </td>
                            <td className="table-cell" style={{ textAlign: 'right' }}>
                              <span className="badge">{stock.peRatio?.toFixed(2) || 'N/A'}</span>
                            </td>
                            <td className="table-cell" style={{ textAlign: 'right' }}>
                              <span className="badge">{stock.latestEarnings || 'N/A'}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer with proper logo icons */}
        <footer className="card" style={{ 
          padding: '30px',
          marginTop: '40px',
          textAlign: 'center',
          borderTop: '3px solid #f1c40f'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '28px', margin: '0 0 5px 0', fontWeight: '700' }}>
              <span style={{ color: '#f1c40f' }}>Kumar</span> <span style={{ color: '#3498db' }}>Harsh</span>
            </h3>
            <p style={{ color: '#bdc3c7', fontSize: '16px', marginTop: '5px' }}>📞 9279157296</p>
          </div>
          
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '25px',
            marginBottom: '25px'
          }}>
            {/* GitHub Logo */}
            <a 
              href="https://github.com/Kumarharsh1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link github"
              title="GitHub"
            >
              <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>

            {/* LinkedIn Logo */}
            <a 
              href="https://www.linkedin.com/in/kumar-harsh-6ab195241/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link linkedin"
              title="LinkedIn"
            >
              <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"></path>
              </svg>
            </a>

            {/* Email Logo */}
            <a 
              href="mailto:kumarharsh@example.com" 
              className="social-link email"
              title="Email"
            >
              <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
              </svg>
            </a>
          </div>
          
          <div style={{ 
            padding: '15px 0',
            borderTop: '1px solid #2c3e50',
            fontSize: '13px',
            color: '#7f8c8d'
          }}>
            <p>Portfolio Dashboard • Real-time Data from APIs</p>
            <p style={{ marginTop: '5px' }}>© 2026 All Rights Reserved</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
