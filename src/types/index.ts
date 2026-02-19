export interface Stock {
  id: string;
  name: string;
  sector: string;
  purchasePrice: number;
  quantity: number;
  exchange: string;
  symbol: string;
  cmp?: number;
  peRatio?: number;
  latestEarnings?: string;
  investment: number;
  portfolioPercentage: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercentage: number;
}

export interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  gainLossPercentage: number;
  stocks: Stock[];
}

export interface PortfolioSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
  lastUpdated: string;
}

export interface PortfolioData {
  stocks: Stock[];
  sectorSummaries: SectorSummary[];
  summary: PortfolioSummary;
}
