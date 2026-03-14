import optionsData from "~/data/options.json";

export interface OptionsData {
  warehouses: string[];
  stores: string[];
  productOptions: string[];
  categories: string[];
  categoryOptions: string[];
  brands: string[];
  brandOptions: string[];
  units: string[];
  sellingTypes: string[];
  taxTypes: string[];
  discountTypes: string[];
  barcodeSymbologies: string[];
  parentCategoryOptions: string[];
  statusOptions: string[];
}

export const useOptionsData = () => {
  const options = useState<OptionsData>("options", () => optionsData as OptionsData);

  return {
    options,
  };
};
