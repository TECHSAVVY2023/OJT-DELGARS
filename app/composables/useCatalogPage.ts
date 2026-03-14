import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import catalogData from "~/data/catalog.json";
import { useToast } from "~/composables/useToast";
import { useCart } from "~/composables/useCart";
import { getCategoryClass, categoryFromQuery } from "~/composables/useCategoryStyle";
import type { ProductInfoWithContext } from "~/types/client";

export const useCatalogPage = () => {
  const data = catalogData as typeof catalogData;
  const route = useRoute();
  const { info: toastInfo } = useToast();
  const { addItem, totalCount } = useCart();

  const selectedCategory = ref(categoryFromQuery(route.query.category as string));
  const priceRange = ref<[number, number]>([195, 500]);
  const selectedWeightRanges = ref<string[]>([]);
  const selectedCutTypes = ref<string[]>([]);
  const searchQuery = ref("");
  const currentPage = ref(1);
  const mobileFiltersOpen = ref(false);

  const productQuantities = ref<Record<number, number>>({});
  const newlyStockedQuantities = ref<Record<number, number>>({});
  const productPriceType = ref<Record<number, "retail" | "wholesale">>({});
  const newlyStockedPriceType = ref<Record<number, "retail" | "wholesale">>({});

  const productInfoModalOpen = ref(false);
  const productInfoModalProduct = ref<ProductInfoWithContext | null>(null);

  const categories = data.categories;
  const weightRanges = data.weightRanges;
  const cutTypes = data.cutTypes;
  const filters = data.filters;
  const searchSort = data.searchSort;
  const allProducts = data.products;
  const newProducts = data.newProducts;
  const deals = data.deals;
  const promoBanners = data.promoBanners;
  const newlyStocked = data.newlyStocked;
  const imageSection = data.imageSection;

  const underConstruction = () => toastInfo("Under construction");

  const openProductInfo = (product: ProductInfoWithContext) => {
    productInfoModalProduct.value = product;
    productInfoModalOpen.value = true;
  };

  const onProductInfoAddToCart = (quantity: number) => {
    const p = productInfoModalProduct.value;
    if (!p || p.id == null) return;

    addItem(
      {
        id: p.id,
        name: p.name,
        image: p.image,
        price: p.price,
      },
      quantity,
    );

    if (p._newlyIndex !== undefined) {
      setQuantityNewly(p._newlyIndex, getQuantityNewly(p._newlyIndex) + quantity);
    } else {
      setQuantity(p.id, getQuantity(p.id) + quantity);
    }

    productInfoModalOpen.value = false;
  };

  const getQuantity = (productId: number) => productQuantities.value[productId] ?? 0;

  const setQuantity = (productId: number, qty: number) => {
    const product = allProducts.find((p: { id: number; stock?: number }) => p.id === productId);
    const max = product && typeof product.stock === "number" ? Number(product.stock) : 999;
    const next = Math.max(1, Math.min(max, qty));
    productQuantities.value = { ...productQuantities.value, [productId]: next };
  };

  const NEWLY_STOCKED_MAX_QTY = 99;

  const getQuantityNewly = (index: number) => newlyStockedQuantities.value[index] ?? 0;

  const setQuantityNewly = (index: number, qty: number) => {
    const next = Math.max(0, Math.min(NEWLY_STOCKED_MAX_QTY, qty));
    newlyStockedQuantities.value = { ...newlyStockedQuantities.value, [index]: next };
  };

  const getPriceTypeNewly = (index: number): "retail" | "wholesale" =>
    newlyStockedPriceType.value[index] ?? "retail";

  const setPriceTypeNewly = (index: number, type: "retail" | "wholesale") => {
    newlyStockedPriceType.value = { ...newlyStockedPriceType.value, [index]: type };
  };

  const getPriceType = (productId: number): "retail" | "wholesale" =>
    productPriceType.value[productId] ?? "retail";

  const setPriceType = (productId: number, type: "retail" | "wholesale") => {
    productPriceType.value = { ...productPriceType.value, [productId]: type };
  };

  const filteredProducts = computed(() => {
    const low = priceRangeLow.value;
    const high = priceRangeHigh.value;
    return allProducts.filter((product: { category: string; name: string; price: number }) => {
      const categoryMatch =
        selectedCategory.value === "All" || product.category === selectedCategory.value;
      const searchMatch = product.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const priceMatch = product.price >= low && product.price <= high;
      return categoryMatch && searchMatch && priceMatch;
    });
  });

  const itemsPerPage = 8;
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredProducts.value.slice(start, start + itemsPerPage);
  });

  const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage) || 1);

  const toggleWeightRange = (range: string) => {
    const index = selectedWeightRanges.value.indexOf(range);
    if (index > -1) {
      selectedWeightRanges.value.splice(index, 1);
    } else {
      selectedWeightRanges.value.push(range);
    }
  };

  const toggleCutType = (type: string) => {
    const index = selectedCutTypes.value.indexOf(type);
    if (index > -1) {
      selectedCutTypes.value.splice(index, 1);
    } else {
      selectedCutTypes.value.push(type);
    }
  };

  const clampPriceRange = () => {
    const [a, b] = priceRange.value;
    if (a != null && b != null && a > b) {
      priceRange.value = [b, a];
    }
  };

  const onPriceRangeUpdate = (v: [number, number]) => {
    priceRange.value = [v[0], v[1]];
    clampPriceRange();
  };

  const priceRangeLow = computed(() => Math.min(priceRange.value[0] ?? 0, priceRange.value[1] ?? 0));
  const priceRangeHigh = computed(() => Math.max(priceRange.value[0] ?? 0, priceRange.value[1] ?? 0));

  watch(totalPages, (pages) => {
    if (currentPage.value > pages) {
      currentPage.value = Math.max(1, pages);
    }
  });

  watch(
    () => route.query.category as string | undefined,
    (category) => {
      selectedCategory.value = categoryFromQuery(category);
    },
  );

  onMounted(() => {
    if (allProducts?.length) {
      const initial: Record<number, number> = {};
      for (const p of allProducts as Array<{ id: number }>) {
        if (p.id != null) {
          initial[p.id] = 1;
        }
      }
      productQuantities.value = initial;
    }
  });

  return {
    data,
    categories,
    weightRanges,
    cutTypes,
    filters,
    searchSort,
    allProducts,
    newProducts,
    deals,
    promoBanners,
    newlyStocked,
    imageSection,
    selectedCategory,
    priceRange,
    selectedWeightRanges,
    selectedCutTypes,
    searchQuery,
    currentPage,
    mobileFiltersOpen,
    productQuantities,
    newlyStockedQuantities,
    productPriceType,
    newlyStockedPriceType,
    productInfoModalOpen,
    productInfoModalProduct,
    totalCount,
    addItem,
    NEWLY_STOCKED_MAX_QTY,
    getCategoryClass,
    underConstruction,
    openProductInfo,
    onProductInfoAddToCart,
    getQuantity,
    setQuantity,
    getQuantityNewly,
    setQuantityNewly,
    getPriceType,
    setPriceType,
    getPriceTypeNewly,
    setPriceTypeNewly,
    filteredProducts,
    paginatedProducts,
    totalPages,
    toggleWeightRange,
    toggleCutType,
    onPriceRangeUpdate,
    priceRangeLow,
    priceRangeHigh,
  };
};
