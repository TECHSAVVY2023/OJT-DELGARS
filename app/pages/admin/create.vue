
<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 overflow-y-auto bg-gray-50">
        <AdminBreadcrumbs
          :items="[
            { label: 'Dashboard', to: '/admin/adminsahboard' },
            { label: 'Products', to: '/admin/products' },
            { label: 'Create Product', active: true },
          ]"
          title="Create Product"
        >
          <template #actions>
            <button
              @click="handleCancel"
              type="button"
              class="px-4 py-2 bg-[#092C4C] text-white rounded-lg font-semibold hover:bg-[#071f38] transition flex items-center gap-2"
            >
              <Icon name="mdi:arrow-left" class="w-5 h-5" />
              Back to Products
            </button>
          </template>
        </AdminBreadcrumbs>

        <div class="px-8 py-8">
          <form @submit.prevent="submitCreateProduct" class="space-y-6">
            <AdminCreateProductInformation
              :formData="formData"
              :stores="stores"
              :categories="categories"
              :brands="brands"
              :units="units"
              :sellingTypes="sellingTypes"
              :barcodeSymbologies="barcodeSymbologies"
              @generate-sku="onGenerateSKU"
              @generate-item-code="onGenerateItemCode"
            />

            <AdminCreatePricingStocks
              :formData="formData"
              :sellingTypes="sellingTypes"
              :taxTypes="taxTypes"
              :discountTypes="discountTypes"
            />

            <AdminCreateImages />

            <AdminCreateCustomFields :formData="formData" :customFields="customFields" />

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

<script setup lang="ts">
import { useToast } from "~/composables/useToast";
import { useCreateProduct } from "~/composables/useCreateProduct";

const { success, error, info } = useToast();

const {
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
} = useCreateProduct();

const submitCreateProduct = () => {
  handleAddProduct({ success, error });
};

const onGenerateSKU = () => {
  const sku = handleGenerateSKU();
  info(`SKU generated: ${sku}`);
};

const onGenerateItemCode = () => {
  const itemCode = handleGenerateItemCode();
  info(`Item Code generated: ${itemCode}`);
};
</script>
