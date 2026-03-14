/**
 * Shared types for client-side (catalog, product modal, product cards).
 */

export interface ProductInfo {
  id?: number;
  name: string;
  category: string;
  price: number | string;
  image: string;
  stock?: number;
  inStock?: boolean;
  badge?: string;
}

/** Product with optional context for newly stocked (index-based cart). */
export interface ProductInfoWithContext extends ProductInfo {
  _newlyIndex?: number;
}

export interface ProductCardLabels {
  brandLabel: string;
  retailLabel: string;
  wholesaleLabel: string;
  addLabel: string;
  inStockLabel: string;
}
