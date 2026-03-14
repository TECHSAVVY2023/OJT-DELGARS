import expiredProductsData from "~/data/expired-products.json";

export interface ExpiredProduct {
  id: string;
  name: string;
  manufacturedDate: string;
  expiredDate: string;
}

export const useExpiredProductsData = () => {
  const expiredProducts = useState<ExpiredProduct[]>("expiredProducts", () => expiredProductsData as ExpiredProduct[]);

  return {
    expiredProducts,
  };
};
