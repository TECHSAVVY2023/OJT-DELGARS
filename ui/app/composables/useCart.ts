export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number | string;
  quantity: number;
}

export const useCart = () => {
  const items = useState<CartItem[]>("cart-items", () => []);

  const addItem = (
    product: { id: number; name: string; image: string; price: number | string },
    quantity: number,
  ) => {
    const qty = Math.max(0, Math.floor(quantity));
    if (qty <= 0) return;

    const existing = items.value.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += qty;
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: qty,
      });
    }
  };

  const removeItem = (id: number) => {
    items.value = items.value.filter((item) => item.id !== id);
  };

  const clearCart = () => {
    items.value = [];
  };

  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  return {
    items,
    addItem,
    removeItem,
    clearCart,
    totalCount,
  };
};

