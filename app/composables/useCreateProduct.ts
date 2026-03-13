import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useOptionsData } from "~/composables/useOptionsData";

export type ProductFormData = {
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
  quantity: string;
  price: string;
  taxType: string;
  discountType: string;
  discountValue: string;
  quantityAlert: string;
  manufacturer: string;
  manufacturedDate: string;
  expiryOn: string;
};

export type CustomFields = {
  manufacturer: boolean;
  expiry: boolean;
};

export const useCreateProduct = () => {
  const router = useRouter();
  const { options } = useOptionsData();

  const formData = ref<ProductFormData>({
    store: "",
    productName: "",
    sku: "",
    category: "",
    brand: "",
    itemCode: "",
    description: "",
    storage: "",
    slug: "",
    sellingType: "",
    unit: "",
    barcodeSymbology: "",
    productType: "single",
    quantity: "",
    price: "",
    taxType: "",
    discountType: "",
    discountValue: "",
    quantityAlert: "",
    manufacturer: "",
    manufacturedDate: "",
    expiryOn: "",
  });

  const customFields = ref<CustomFields>({ manufacturer: true, expiry: true });

  const stores = computed(() => options.value.stores.filter((s) => s !== "All"));
  const categories = computed(() => options.value.categoryOptions);
  const brands = computed(() => options.value.brandOptions);
  const units = computed(() => options.value.units);
  const sellingTypes = computed(() => options.value.sellingTypes);
  const taxTypes = computed(() => options.value.taxTypes);
  const discountTypes = computed(() => options.value.discountTypes);
  const barcodeSymbologies = computed(() => options.value.barcodeSymbologies);

  const handleCancel = () => router.push("/admin/products");

  const handleGenerateSKU = () => {
    const sku = "SKU" + Math.random().toString(36).substring(2, 11).toUpperCase();
    formData.value.sku = sku;
    return sku;
  };

  const handleGenerateItemCode = () => {
    const itemCode = "ITEM" + Math.random().toString(36).substring(2, 11).toUpperCase();
    formData.value.itemCode = itemCode;
    return itemCode;
  };

  const handleAddProduct = ({ success, error }: { success: (msg: string) => void; error: (msg: string) => void; }) => {
    if (!formData.value.productName || !formData.value.price) {
      error("Please fill in required fields");
      return;
    }

    // TODO: connect to store/data API in real app
    success("Product created successfully!");
    router.push("/admin/products");
  };

  return {
    formData,
    customFields,
    stores,
    categories,
    brands,
    units,
    sellingTypes,
    taxTypes,
    discountTypes,
    barcodeSymbologies,
    handleCancel,
    handleAddProduct,
    handleGenerateSKU,
    handleGenerateItemCode,
  };
};
