import lowStocksData from "~/data/low-stocks.json";

export interface LowStockItem {
  id: string;
  name: string;
  currentStock: number;
  threshold: number;
  status: string;
}

export const useLowStocksData = () => {
  const lowStockItems = useState<LowStockItem[]>(
    "lowStockItems",
    () => lowStocksData as LowStockItem[]
  );
  return { lowStockItems };
};
