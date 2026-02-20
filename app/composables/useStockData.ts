import stockData from "~/data/stock.json";

export interface StockEntry {
  id: number;
  warehouse: string;
  store: string;
  productName: string;
  date: string;
  person: string;
  qty: number;
}

export const useStockData = () => {
  const stockEntries = useState<StockEntry[]>("stockEntries", () => stockData as StockEntry[]);

  const updateStockEntry = (id: number, updates: Partial<StockEntry>) => {
    const entry = stockEntries.value.find((e) => e.id === id);
    if (entry) {
      Object.assign(entry, updates);
    }
  };

  const addStockEntry = (entry: Omit<StockEntry, "id">) => {
    const maxId = Math.max(...stockEntries.value.map((e) => e.id), 0);
    stockEntries.value.push({ ...entry, id: maxId + 1 });
  };

  const deleteStockEntry = (id: number) => {
    const index = stockEntries.value.findIndex((e) => e.id === id);
    if (index > -1) {
      stockEntries.value.splice(index, 1);
    }
  };

  return {
    stockEntries,
    updateStockEntry,
    addStockEntry,
    deleteStockEntry,
  };
};
