<script setup lang="ts">
import { ref, computed } from "vue";
import { useToast } from "~/composables/useToast";
import { useRoute } from "vue-router";
import { useProductsData } from "~/composables/useProductsData";
import { useOptionsData } from "~/composables/useOptionsData";

const route = useRoute();
const { success, error, info } = useToast();
const { products, updateProduct } = useProductsData();
const { options } = useOptionsData();

const selectedCategory = ref("All");
const selectedBrand = ref("All");
const searchQuery = ref("");
const currentPage = ref(1);
const rowsPerPage = ref(10);

const categories = computed(() => options.value.categories);
const brands = computed(() => options.value.brands);

// Edit modal – same field set as create, some read-only
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

const editForm = ref({
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
  subCategory: "",
  unit: "",
  barcodeSymbology: "Code128",
  productType: "single" as "single" | "variable",
  quantity: "",
  price: "",
  taxType: "VAT",
  discountType: "Fixed",
  discountValue: "",
  quantityAlert: "",
  manufacturer: "",
  manufacturedDate: "",
  expiryOn: "",
});


const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchCategory =
      selectedCategory.value === "All" || product.category === selectedCategory.value;
    const matchBrand =
      selectedBrand.value === "All" || product.brand === selectedBrand.value;
    const matchSearch =
      searchQuery.value === "" ||
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchCategory && matchBrand && matchSearch;
  });
});

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * rowsPerPage.value;
  const endIndex = startIndex + rowsPerPage.value;
  return filteredProducts.value.slice(startIndex, endIndex);
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredProducts.value.length / rowsPerPage.value))
);

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

const handleAddProduct = () => {
  navigateTo("/admin/create");
};

const handleImportProduct = () => {
  info("Import Product feature - under construction");
};

const openEditProduct = (product: typeof products.value[0]) => {
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
    subCategory: "",
    unit: product.unit,
    barcodeSymbology: "Code128",
    productType: "single",
    quantity: String(product.qty),
    price: priceNum,
    taxType: "VAT",
    discountType: "Fixed",
    discountValue: "",
    quantityAlert: "10",
    manufacturer: "",
    manufacturedDate: "",
    expiryOn: "",
  };
  showEditProductModal.value = true;
};

const closeEditProductModal = () => {
  showEditProductModal.value = false;
  editingProductId.value = null;
};

const submitEditProduct = () => {
  if (!editingProductId.value || !editForm.value.productName?.trim()) {
    error("Product name is required.");
    return;
  }
  const priceVal = editForm.value.price ? `₱${editForm.value.price}` : "";
  updateProduct(editingProductId.value, {
    name: editForm.value.productName.trim(),
    category: editForm.value.category || "",
    brand: editForm.value.brand || "",
    price: priceVal,
    unit: editForm.value.unit || "",
    qty: Number(editForm.value.quantity) || 0,
  });
  success("Product updated successfully!");
  closeEditProductModal();
};

const handleEditProduct = (productId: string) => {
  const product = products.value.find((p) => p.id === productId);
  if (product) openEditProduct(product);
};

const handleDeleteProduct = (productId: string) => {
  error(`Product ${productId} deleted successfully`);
};

const handleViewProduct = (productId: string) => {
  info(`Viewing product: ${productId}`);
};
</script>

<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <!-- Page header -->
        <div class="bg-white border-b border-gray-200 px-8 py-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <NuxtLink to="/admin/adminsahboard" class="hover:text-[#8B0101]">Dashboard</NuxtLink>
                <span class="text-gray-400">›</span>
                <span class="text-gray-900 font-medium">Products</span>
              </div>
              <h1 class="text-3xl font-bold text-gray-900">Products</h1>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1 border-r border-gray-300 pr-3">
                <button
                  @click="handleAddProduct"
                  class="px-3 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition flex items-center gap-2 text-sm"
                >
                  <Icon name="mdi:plus" class="w-5 h-5" />
                  Add Product
                </button>
                <button
                  @click="handleImportProduct"
                  class="px-3 py-2 text-white rounded-lg font-semibold transition flex items-center gap-2 text-sm bg-[#092C4C] hover:bg-[#071f38]"
                >
                  <Icon name="mdi:import" class="w-5 h-5" />
                  Import Product
                </button>
              </div>
              <div class="flex items-center gap-1">
                <button class="p-2 hover:bg-red-50 rounded-lg transition" title="Export to PDF">
                  <Icon name="mdi:file-pdf" class="w-5 h-5 text-red-500" />
                </button>
                <button class="p-2 hover:bg-green-50 rounded-lg transition" title="Export to Excel">
                  <Icon name="mdi:file-excel" class="w-5 h-5 text-green-500" />
                </button>
                <button class="p-2 hover:bg-gray-100 rounded-lg transition" title="Print">
                  <Icon name="mdi:printer" class="w-5 h-5 text-gray-600" />
                </button>
                <button class="p-2 hover:bg-gray-100 rounded-lg transition" title="Refresh">
                  <Icon name="mdi:refresh" class="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <!-- Search and filters -->
          <div class="flex items-center gap-4">
            <div class="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
              <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search"
                class="bg-transparent outline-none text-sm flex-1"
              />
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <label class="text-sm font-medium text-gray-700">Category</label>
                <select
                  v-model="selectedCategory"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0 cursor-pointer transition"
                >
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <label class="text-sm font-medium text-gray-700">Brand</label>
                <select
                  v-model="selectedBrand"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0 cursor-pointer transition"
                >
                  <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="flex-1 overflow-auto px-8 py-6">
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table class="w-full border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50">
                  <th class="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      class="w-4 h-4 rounded border-gray-300 text-[#8B0101] focus:ring-[#8B0101] cursor-pointer"
                    />
                  </th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">SKU #</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Brand</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Unit</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Qty</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Created By</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="product in paginatedProducts"
                  :key="product.id"
                  class="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td class="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      class="w-4 h-4 rounded border-gray-300 text-[#8B0101] focus:ring-[#8B0101] cursor-pointer"
                    />
                  </td>
                  <td class="px-6 py-4 text-sm font-medium text-gray-900 text-center">{{ product.id }}</td>
                  <td class="px-6 py-4 text-left">
                    <div class="flex items-center justify-start gap-2">
                      <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
                        <Icon name="mdi:fish" class="w-4 h-4" />
                      </div>
                      <span class="text-sm font-medium text-gray-900">{{ product.name }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ product.category }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ product.brand }}</td>
                  <td class="px-6 py-4 text-sm font-semibold text-gray-900 text-center">{{ product.price }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ product.unit }}</td>
                  <td class="px-6 py-4 text-sm font-medium text-gray-900 text-center">{{ product.qty }}</td>
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <div
                        class="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0"
                      >
                        <img
                          src="/logo/delgar-logo.png"
                          alt=""
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <span class="text-sm text-gray-600">{{ product.createdBy }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <button
                        @click="handleViewProduct(product.id)"
                        class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        title="View"
                      >
                        <Icon name="mdi:eye" class="w-5 h-5" />
                      </button>
                      <button
                        @click="handleEditProduct(product.id)"
                        class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition"
                        title="Edit"
                      >
                        <Icon name="mdi:pencil" class="w-5 h-5" />
                      </button>
                      <button
                        @click="handleDeleteProduct(product.id)"
                        class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                        title="Delete"
                      >
                        <Icon name="mdi:trash-can" class="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination -->
        <div class="bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Row Per Page</label>
              <select
                v-model.number="rowsPerPage"
                class="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0 cursor-pointer transition"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <span class="text-sm text-gray-600">Entries</span>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-50"
              title="Previous page"
            >
              <Icon name="mdi:chevron-left" class="w-5 h-5 text-gray-600" />
            </button>
            <div class="flex items-center gap-1">
              <button
                v-for="page in visiblePageNumbers"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition',
                  currentPage === page 
                    ? 'bg-[#8B0101] text-white' 
                    : 'border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50',
                ]"
              >
                {{ page }}
              </button>
              <span v-if="totalPages > 5 && !visiblePageNumbers.includes(totalPages)" class="px-2 text-gray-600 text-sm">...</span>
              <button
                v-if="totalPages > 5 && !visiblePageNumbers.includes(totalPages)"
                @click="currentPage = totalPages"
                class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition"
              >
                {{ totalPages }}
              </button>
            </div>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-50"
              title="Next page"
            >
              <Icon name="mdi:chevron-right" class="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Edit Product Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showEditProductModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          style="font-family: 'Nunito Sans', sans-serif"
          @click.self="closeEditProductModal"
        >
          <div class="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col" @click.stop>
            <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
              <h2 class="text-lg font-semibold text-gray-900">Edit Product</h2>
              <button type="button" class="p-1 text-gray-400 hover:text-gray-600 rounded transition" @click="closeEditProductModal">
                <Icon name="mdi:close" class="w-5 h-5" />
              </button>
            </div>
            <form @submit.prevent="submitEditProduct" class="flex flex-col flex-1 min-h-0">
              <div class="p-6 space-y-6 overflow-y-auto">
                <!-- Product Information -->
                <div class="space-y-4">
                  <div class="flex items-center gap-2 text-gray-700">
                    <Icon name="mdi:information" class="w-5 h-5 text-amber-500" />
                    <h3 class="font-semibold">Product Information</h3>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Store</label>
                      <select v-model="editForm.store" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
                        <option v-for="s in stores" :key="s" :value="s">{{ s }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Storage</label>
                      <select v-model="editForm.storage" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
                        <option value="Cold Storage">Cold Storage</option>
                        <option value="Dry Storage">Dry Storage</option>
                      </select>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Product Name <span class="text-red-500">*</span></label>
                      <input v-model="editForm.productName" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Slug</label>
                      <input v-model="editForm.slug" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">SKU</label>
                      <input :value="editForm.sku" type="text" readonly class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
                      <p class="text-[10px] text-gray-400 mt-0.5">Cannot be changed</p>
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Selling Type</label>
                      <select v-model="editForm.sellingType" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
                        <option v-for="t in sellingTypes" :key="t" :value="t">{{ t }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Category</label>
                      <select v-model="editForm.category" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
                        <option value="">Select</option>
                        <option v-for="c in categoryOptions" :key="c" :value="c">{{ c }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Sub Category</label>
                      <select v-model="editForm.subCategory" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Brand</label>
                      <select v-model="editForm.brand" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
                        <option value="">Select</option>
                        <option v-for="b in brandOptions" :key="b" :value="b">{{ b }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Unit</label>
                      <select v-model="editForm.unit" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
                        <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Item Code</label>
                      <input :value="editForm.itemCode" type="text" readonly class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
                      <p class="text-[10px] text-gray-400 mt-0.5">Cannot be changed</p>
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Barcode Symbology</label>
                      <select v-model="editForm.barcodeSymbology" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
                        <option v-for="sym in barcodeSymbologies" :key="sym" :value="sym">{{ sym }}</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
                    <div class="border border-gray-300 rounded-lg overflow-hidden">
                      <div class="bg-gray-50 border-b border-gray-300 p-2 flex items-center gap-1">
                        <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:format-bold" class="w-5 h-5 text-gray-600" /></button>
                        <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:format-italic" class="w-5 h-5 text-gray-600" /></button>
                        <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:format-underline" class="w-5 h-5 text-gray-600" /></button>
                        <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:format-strikethrough" class="w-5 h-5 text-gray-600" /></button>
                        <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:link" class="w-5 h-5 text-gray-600" /></button>
                        <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:format-list-bulleted" class="w-5 h-5 text-gray-600" /></button>
                        <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:format-list-numbered" class="w-5 h-5 text-gray-600" /></button>
                        <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:code-tags" class="w-5 h-5 text-gray-600" /></button>
                      </div>
                      <textarea v-model="editForm.description" placeholder="Type your message" class="w-full px-4 py-3 text-sm outline-none resize-none" rows="6"></textarea>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">Maximum 60 Words</p>
                    <div class="mt-2 flex gap-2 text-gray-600">
                      <button type="button" class="p-1 hover:bg-gray-100 rounded"><Icon name="mdi:attachment" class="w-5 h-5" /></button>
                      <button type="button" class="p-1 hover:bg-gray-100 rounded"><Icon name="mdi:emoticon" class="w-5 h-5" /></button>
                      <button type="button" class="p-1 hover:bg-gray-100 rounded"><Icon name="mdi:trash-can" class="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>

                <!-- Pricing & Stocks -->
                <div class="space-y-4">
                  <div class="flex items-center gap-2 text-gray-700">
                    <Icon name="mdi:shopping-outline" class="w-5 h-5 text-amber-500" />
                    <h3 class="font-semibold">Pricing & Stocks</h3>
                  </div>
                  <div class="flex gap-4">
                    <label class="flex items-center gap-2">
                      <input v-model="editForm.productType" type="radio" value="single" class="w-4 h-4 text-amber-500" />
                      <span class="text-sm text-gray-700">Single</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input v-model="editForm.productType" type="radio" value="variable" class="w-4 h-4 text-amber-500" />
                      <span class="text-sm text-gray-700">Variable</span>
                    </label>
                  </div>
                  <div class="grid grid-cols-3 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                      <input v-model="editForm.quantity" type="number" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Price</label>
                      <input v-model="editForm.price" type="text" placeholder="e.g. 600" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Tax Type</label>
                      <select v-model="editForm.taxType" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
                        <option v-for="t in taxTypes" :key="t" :value="t">{{ t }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Discount Type</label>
                      <select v-model="editForm.discountType" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
                        <option v-for="d in discountTypes" :key="d" :value="d">{{ d }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Discount Value</label>
                      <input v-model="editForm.discountValue" type="number" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Quantity Alert</label>
                      <input v-model="editForm.quantityAlert" type="number" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
                    </div>
                  </div>
                </div>

                <!-- Custom Fields -->
                <div class="space-y-4">
                  <div class="flex items-center gap-2 text-gray-700">
                    <Icon name="mdi:form-textbox" class="w-5 h-5 text-amber-500" />
                    <h3 class="font-semibold">Custom Fields</h3>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Manufacturer</label>
                      <input v-model="editForm.manufacturer" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Manufactured Date</label>
                      <input v-model="editForm.manufacturedDate" type="text" placeholder="dd/mm/yyyy" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Expiry On</label>
                      <input v-model="editForm.expiryOn" type="text" placeholder="dd/mm/yyyy" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 shrink-0">
                <button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition" @click="closeEditProductModal">
                  Cancel
                </button>
                <button type="submit" class="px-4 py-2 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition flex items-center gap-2">
                  <Icon name="mdi:content-save" class="w-4 h-4" />
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;800&display=swap");

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>