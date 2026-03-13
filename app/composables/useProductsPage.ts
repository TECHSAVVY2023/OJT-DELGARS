import { computed, onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { useProductsData, type Product } from "~/composables/useProductsData";
import { useOptionsData } from "~/composables/useOptionsData";

export type ExpiredFilter = "all" | "expired" | "notExpired";

export type ProductEditForm = {
  store: string;
  productName: string;
  sku: string;
  category: string;
  brand: string;
  itemCode: string;
  description: string;
  storage: string;
  slug: string;
  sellingType: string;
  unit: string;
  barcodeSymbology: string;
  productType: "single" | "variable";
  price: string;
  taxType: string;
  discountType: string;
  discountValue: string;
  quantityAlert: string;
  manufacturer: string;
  manufacturedDate: string;
  expiryOn: string;
};

export const useProductsPage = () => {
  const route = useRoute();
  const { products, updateProduct, deleteProduct } = useProductsData();
  const { options } = useOptionsData();

  const selectedCategory = ref("All");
  const selectedBrand = ref("All");
  const expiredFilter = ref<ExpiredFilter>("all");
  const searchQuery = ref("");
  const currentPage = ref(1);
  const rowsPerPage = ref(10);

  const showEditProductModal = ref(false);
  const editingProductId = ref<string | null>(null);

  const stores = computed(() => options.value.stores.filter((s) => s !== "All"));
  const categoryOptions = computed(() => options.value.categoryOptions);
  const brandOptions = computed(() => options.value.brandOptions);
  const units = computed(() => options.value.units);
  const sellingTypes = computed(() => options.value.sellingTypes);
  const taxTypes = computed(() => options.value.taxTypes);
  const discountTypes = computed(() => options.value.discountTypes);
  const barcodeSymbologies = computed(() => options.value.barcodeSymbologies);

  const categories = computed(() => options.value.categories);
  const brands = computed(() => options.value.brands);

  function syncExpiredFilterFromRoute() {
    const query = route.query.expiredFilter as string;
    if (query === "expired" || query === "notExpired") expiredFilter.value = query;
    else expiredFilter.value = "all";
  }

  onMounted(syncExpiredFilterFromRoute);
  watch(() => route.query.expiredFilter, syncExpiredFilterFromRoute);

  const isProductExpired = (expirationDate: string) => {
    if (!expirationDate) return false;
    const d = new Date(expirationDate);
    if (Number.isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      const matchCategory = selectedCategory.value === "All" || product.category === selectedCategory.value;
      const matchBrand = selectedBrand.value === "All" || product.brand === selectedBrand.value;
      const matchSearch =
        searchQuery.value === "" ||
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.id.toLowerCase().includes(searchQuery.value.toLowerCase());
      const expired = isProductExpired(product.expirationDate);
      const matchExpired =
        expiredFilter.value === "all" ||
        (expiredFilter.value === "expired" && expired) ||
        (expiredFilter.value === "notExpired" && !expired);
      return matchCategory && matchBrand && matchSearch && matchExpired;
    });
  });

  const paginatedProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * rowsPerPage.value;
    const endIndex = startIndex + rowsPerPage.value;
    return filteredProducts.value.slice(startIndex, endIndex);
  });

  const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / rowsPerPage.value)));

  const visiblePageNumbers = computed(() => {
    const total = totalPages.value;
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: number[] = [];
    let start = Math.max(1, currentPage.value - 2);
    let end = Math.min(total, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  });

  const productActions = {
    openEditProduct: (product: Product) => {
      editingProductId.value = product.id;
      const priceNum = product.price.replace(/[^\d]/g, "") || "0";
      editForm.value = {
        store: "Store 1",
        productName: product.name,
        sku: product.id,
        category: product.category,
        brand: product.brand,
        itemCode: product.id,
        description: "",
        storage: "Cold Storage",
        slug: product.name.toLowerCase().replace(/\s+/g, "-"),
        sellingType: "Single",
        unit: product.unit,
        barcodeSymbology: "Code128",
        productType: "single",
        price: priceNum,
        taxType: "VAT",
        discountType: "Fixed",
        discountValue: "",
        quantityAlert: "10",
        manufacturer: "",
        manufacturedDate: "",
        expiryOn: product.expirationDate || "",
      };
      showEditProductModal.value = true;
    },
    closeEditProductModal: () => {
      showEditProductModal.value = false;
      editingProductId.value = null;
    },
    submitEditProduct: (toasts: { success: (msg: string) => void; error: (msg: string) => void; }) => {
      if (!editingProductId.value || !editForm.value.productName?.trim()) {
        toasts.error("Product name is required.");
        return;
      }
      const priceVal = editForm.value.price ? `₱${editForm.value.price}` : "";
      updateProduct(editingProductId.value, {
        name: editForm.value.productName.trim(),
        category: editForm.value.category || "",
        brand: editForm.value.brand || "",
        price: priceVal,
        unit: editForm.value.unit || "",
        expirationDate: editForm.value.expiryOn || "",
      });
      toasts.success("Product updated successfully!");
      productActions.closeEditProductModal();
    },
    archiveProduct: (id: string, info: (msg: string) => void) => info(`Product ${id} archived`),
    deleteProduct: (id: string, error: (msg: string) => void) => {
      deleteProduct(id);
      error(`Product ${id} deleted successfully`);
    },
  };

  const editForm = ref<ProductEditForm>({
    store: "Store 1",
    productName: "",
    sku: "",
    category: "",
    brand: "",
    itemCode: "",
    description: "",
    storage: "Cold Storage",
    slug: "",
    sellingType: "Single",
    unit: "",
    barcodeSymbology: "Code128",
    productType: "single",
    price: "",
    taxType: "VAT",
    discountType: "Fixed",
    discountValue: "",
    quantityAlert: "",
    manufacturer: "",
    manufacturedDate: "",
    expiryOn: "",
  });

  return {
    products,
    categories,
    brands,
    stores,
    categoryOptions,
    brandOptions,
    units,
    sellingTypes,
    taxTypes,
    discountTypes,
    barcodeSymbologies,
    selectedCategory,
    selectedBrand,
    expiredFilter,
    searchQuery,
    currentPage,
    rowsPerPage,
    showEditProductModal,
    editingProductId,
    editForm,
    filteredProducts,
    paginatedProducts,
    totalPages,
    visiblePageNumbers,
    isProductExpired,
    openEditProduct: productActions.openEditProduct,
    closeEditProductModal: productActions.closeEditProductModal,
    submitEditProduct: productActions.submitEditProduct,
    archiveProduct: productActions.archiveProduct,
    deleteProductAction: productActions.deleteProduct,
  };
};