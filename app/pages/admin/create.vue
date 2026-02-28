<script setup lang="ts">
import { ref, computed } from "vue";
import { useToast } from "~/composables/useToast";
import { useRoute } from "vue-router";
import { useOptionsData } from "~/composables/useOptionsData";

const route = useRoute();
const { success, error, info } = useToast();
const { options } = useOptionsData();

const formData = ref({
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

const stores = computed(() => options.value.stores.filter((s) => s !== "All"));
const categories = computed(() => options.value.categoryOptions);
const brands = computed(() => options.value.brandOptions);
const units = computed(() => options.value.units);
const sellingTypes = computed(() => options.value.sellingTypes);
const taxTypes = computed(() => options.value.taxTypes);
const discountTypes = computed(() => options.value.discountTypes);
const barcodeSymbologies = computed(() => options.value.barcodeSymbologies);

const customFields = ref({
  manufacturer: true,
  expiry: true,
});

const handleCancel = () => {
  navigateTo("/admin/products");
};

const handleAddProduct = () => {
  if (!formData.value.productName || !formData.value.price) {
    error("Please fill in required fields");
    return;
  }
  success("Product created successfully!");
};

const handleGenerateSKU = () => {
  const sku = "SKU" + Math.random().toString(36).substr(2, 9).toUpperCase();
  formData.value.sku = sku;
  info("SKU generated: " + sku);
};

const handleGenerateItemCode = () => {
  const itemCode = "ITEM" + Math.random().toString(36).substr(2, 9).toUpperCase();
  formData.value.itemCode = itemCode;
  info("Item Code generated: " + itemCode);
};
</script>

<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 overflow-y-auto bg-gray-50">
        <div class="bg-white border-b border-gray-200 px-8 py-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <NuxtLink to="/admin/adminsahboard" class="hover:text-[#8B0101]">Dashboard</NuxtLink>
                <span class="text-gray-400">›</span>
                <NuxtLink to="/admin/products" class="hover:text-[#8B0101]">Products</NuxtLink>
                <span class="text-gray-400">›</span>
                <span class="text-gray-900 font-medium">Create Product</span>
              </div>
              <h1 class="text-3xl font-bold text-gray-900">Create Product</h1>
            </div>
            <button
              @click="handleCancel"
              type="button"
              class="px-4 py-2 bg-[#092C4C] text-white rounded-lg font-semibold hover:bg-[#071f38] transition flex items-center gap-2"
            >
              <Icon name="mdi:arrow-left" class="w-5 h-5" />
              Back to Products
            </button>
          </div>
        </div>

        <div class="px-8 py-8">
          <form @submit.prevent="handleAddProduct" class="space-y-6">
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                <Icon name="mdi:information" class="w-5 h-5 text-amber-500" />
                <h2 class="text-lg font-semibold text-gray-900">Product Information</h2>
              </div>
              <div class="p-6 space-y-6">
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Store <span class="text-red-500">*</span></label>
                    <select v-model="formData.store" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]">
                      <option value="">Select</option>
                      <option v-for="store in stores" :key="store" :value="store">{{ store }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Storage <span class="text-red-500">*</span></label>
                    <select v-model="formData.storage" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]">
                      <option value="">Select</option>
                      <option value="Cold Storage">Cold Storage</option>
                      <option value="Dry Storage">Dry Storage</option>
                    </select>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Product Name <span class="text-red-500">*</span></label>
                    <input v-model="formData.productName" type="text" placeholder="" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Slug <span class="text-red-500">*</span></label>
                    <input v-model="formData.slug" type="text" placeholder="" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">SKU <span class="text-red-500">*</span></label>
                    <div class="flex gap-2">
                      <input v-model="formData.sku" type="text" placeholder="" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]" />
                      <button @click="handleGenerateSKU" type="button" class="px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition">Generate</button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Selling Type <span class="text-red-500">*</span></label>
                    <select v-model="formData.sellingType" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]">
                      <option value="">Select</option>
                      <option v-for="type in sellingTypes" :key="type" :value="type">{{ type }}</option>
                    </select>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Category <span class="text-red-500">*</span></label>
                    <select v-model="formData.category" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]">
                      <option value="">Select</option>
                      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                    <p class="text-xs text-amber-600 mt-1 flex items-center gap-1"><Icon name="mdi:plus" class="w-4 h-4" /> Add New</p>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Brand <span class="text-red-500">*</span></label>
                    <select v-model="formData.brand" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]">
                      <option value="">Select</option>
                      <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Unit <span class="text-red-500">*</span></label>
                    <select v-model="formData.unit" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]">
                      <option value="">Select</option>
                      <option v-for="unit in units" :key="unit" :value="unit">{{ unit }}</option>
                    </select>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Item Code <span class="text-red-500">*</span></label>
                    <div class="flex gap-2">
                      <input v-model="formData.itemCode" type="text" placeholder="" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]" />
                      <button @click="handleGenerateItemCode" type="button" class="px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition">Generate</button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Barcode Symbology <span class="text-red-500">*</span></label>
                    <select v-model="formData.barcodeSymbology" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]">
                      <option value="">Select</option>
                      <option v-for="sym in barcodeSymbologies" :key="sym" :value="sym">{{ sym }}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
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
                    <textarea v-model="formData.description" placeholder="Type your message" class="w-full px-4 py-3 text-sm outline-none resize-none" rows="6"></textarea>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">Maximum 60 Words</p>
                  <div class="mt-2 flex gap-2 text-gray-600">
                    <button type="button" class="p-1 hover:bg-gray-100 rounded"><Icon name="mdi:attachment" class="w-5 h-5" /></button>
                    <button type="button" class="p-1 hover:bg-gray-100 rounded"><Icon name="mdi:emoticon" class="w-5 h-5" /></button>
                    <button type="button" class="p-1 hover:bg-gray-100 rounded"><Icon name="mdi:trash-can" class="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                <Icon name="mdi:shopping-outline" class="w-5 h-5 text-amber-500" />
                <h2 class="text-lg font-semibold text-gray-900">Pricing & Stocks</h2>
              </div>
              <div class="p-6 space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Product Type <span class="text-red-500">*</span></label>
                  <div class="flex gap-4">
                    <label class="flex items-center gap-2">
                      <input v-model="formData.productType" type="radio" value="single" class="w-4 h-4 text-amber-500" />
                      <span class="text-sm text-gray-700">Single Product</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input v-model="formData.productType" type="radio" value="variable" class="w-4 h-4 text-amber-500" />
                      <span class="text-sm text-gray-700">Variable Product</span>
                    </label>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Quantity <span class="text-red-500">*</span></label>
                    <input v-model="formData.quantity" type="number" placeholder="" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Price <span class="text-red-500">*</span></label>
                    <input v-model="formData.price" type="number" placeholder="" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tax Type <span class="text-red-500">*</span></label>
                    <select v-model="formData.taxType" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]">
                      <option value="">Select</option>
                      <option v-for="tax in taxTypes" :key="tax" :value="tax">{{ tax }}</option>
                    </select>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Discount Type <span class="text-red-500">*</span></label>
                    <select v-model="formData.discountType" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]">
                      <option value="">Select</option>
                      <option v-for="discount in discountTypes" :key="discount" :value="discount">{{ discount }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Discount Value <span class="text-red-500">*</span></label>
                    <input v-model="formData.discountValue" type="number" placeholder="" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Quantity Alert <span class="text-red-500">*</span></label>
                    <input v-model="formData.quantityAlert" type="number" placeholder="" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]" />
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                <Icon name="mdi:image" class="w-5 h-5 text-amber-500" />
                <h2 class="text-lg font-semibold text-gray-900">Images</h2>
              </div>
              <div class="p-6">
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition cursor-pointer">
                  <Icon name="mdi:image-plus" class="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p class="text-sm text-gray-600">Add Image</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                <Icon name="mdi:form-textbox" class="w-5 h-5 text-amber-500" />
                <h2 class="text-lg font-semibold text-gray-900">Custom Fields</h2>
              </div>
              <div class="p-6 space-y-6">
                <div class="flex gap-6 pb-6 border-b border-gray-200">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input v-model="customFields.manufacturer" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-amber-500" />
                    <span class="text-sm text-gray-700">Manufacturer</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input v-model="customFields.expiry" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-amber-500" />
                    <span class="text-sm text-gray-700">Expiry</span>
                  </label>
                </div>
                <div v-if="customFields.manufacturer">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Manufacturer <span class="text-red-500">*</span></label>
                  <input v-model="formData.manufacturer" type="text" placeholder="" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]" />
                </div>
                <div v-if="customFields.expiry" class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Manufactured Date <span class="text-red-500">*</span></label>
                    <div class="relative">
                      <input v-model="formData.manufacturedDate" type="text" placeholder="dd/mm/yyyy" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]" />
                      <button type="button" class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"><Icon name="mdi:calendar" class="w-5 h-5" /></button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expiry On <span class="text-red-500">*</span></label>
                    <div class="relative">
                      <input v-model="formData.expiryOn" type="text" placeholder="dd/mm/yyyy" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101]" />
                      <button type="button" class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"><Icon name="mdi:calendar" class="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pb-8">
              <button @click="handleCancel" type="button" class="px-6 py-2 bg-[#092C4C] text-white rounded-lg font-semibold hover:bg-[#071f38] transition">Cancel</button>
              <button type="submit" class="px-6 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>
