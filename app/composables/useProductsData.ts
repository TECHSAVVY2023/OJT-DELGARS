import productsData from "~/data/products.json";

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: string;
  unit: string;
  qty: number;
  createdBy: string;
  avatar: string;
}

export const useProductsData = () => {
  const products = useState<Product[]>("products", () => productsData as Product[]);

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const product = products.value.find((p) => p.id === id);
    if (product) {
      Object.assign(product, updates);
    }
  };

  const addProduct = (product: Product) => {
    products.value.push(product);
  };

  const deleteProduct = (id: string) => {
    const index = products.value.findIndex((p) => p.id === id);
    if (index > -1) {
      products.value.splice(index, 1);
    }
  };

  return {
    products,
    updateProduct,
    addProduct,
    deleteProduct,
  };
};
