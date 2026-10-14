export type ScreenType = 'safety-hub' | 'live-intercept' | 'analyst-ai';
export type AppMode = 'mobile' | 'soc';

export interface Transaction {
  id: string;
  timestamp: string;
  merchantOrPayee: string;
  vpa: string;
  amount: number;
  riskScore: number;
  status: 'safe' | 'blocked' | 'challenged' | 'warned' | 'frozen';
  category: string;
  scamVector?: string;
  timeLabel: string;
  isLegit?: boolean;
}

export interface ShapFeature {
  name: string;
  label: string;
  contribution: string;
  weight: number;
  percentage: number;
  colorClass: string;
  icon: string;
}

export interface ScamScenario {
  id: number;
  title: string;
  categoryBadge: string;
  categoryBadgeClass: string;
  description: string;
  defense: string;
  defenseClass: string;
  simTarget: string;
  simAmount: number;
  simRisk: number;
  simExplanation: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface MuleNode {
  id: string;
  name: string;
  bank: string;
  amount: number;
  lat: number;
  lng: number;
  hopTime: string;
}
