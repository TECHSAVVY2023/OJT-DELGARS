import dashboardData from "~/data/dashboard.json";

export interface Stat {
  label: string;
  value: string;
  color: string;
  icon: string;
}

export interface DashboardProduct {
  name: string;
  id: string;
  instock?: string;
  quantity?: string;
  img: string;
}

export interface DashboardData {
  stats: Stat[];
  timeframes: string[];
  yAxisLabels: number[];
  stockChartData: Record<string, number[]>;
  maxStock: number;
  lowStockProducts: DashboardProduct[];
  expiringSoonProducts: DashboardProduct[];
  outOfStockProducts: DashboardProduct[];
  productOverview: DashboardProduct[];
}

export const useDashboardData = () => {
  const dashboard = useState<DashboardData>("dashboard", () => dashboardData as DashboardData);

  return {
    dashboard,
  };
};
