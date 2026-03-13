<script setup lang="ts">
import type { ProductFormData } from "~/composables/useCreateProduct";

const props = defineProps<{
  formData: ProductFormData;
  sellingTypes: string[];
  taxTypes: string[];
  discountTypes: string[];
}>();
</script>

<template>
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
            <input v-model="props.formData.productType" type="radio" value="single" class="w-4 h-4 text-amber-500" />
            <span class="text-sm text-gray-700">Single Product</span>
          </label>
          <label class="flex items-center gap-2">
            <input v-model="props.formData.productType" type="radio" value="variable" class="w-4 h-4 text-amber-500" />
            <span class="text-sm text-gray-700">Variable Product</span>
          </label>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Quantity <span class="text-red-500">*</span></label>
          <input v-model="props.formData.quantity" type="number" class="form-input w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Price <span class="text-red-500">*</span></label>
          <input v-model="props.formData.price" type="number" class="form-input w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tax Type <span class="text-red-500">*</span></label>
          <select v-model="props.formData.taxType" class="form-select w-full">
            <option value="">Select</option>
            <option v-for="tax in props.taxTypes" :key="tax" :value="tax">{{ tax }}</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Discount Type <span class="text-red-500">*</span></label>
          <select v-model="props.formData.discountType" class="form-select w-full">
            <option value="">Select</option>
            <option v-for="discount in props.discountTypes" :key="discount" :value="discount">{{ discount }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Discount Value <span class="text-red-500">*</span></label>
          <input v-model="props.formData.discountValue" type="number" class="form-input w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Quantity Alert <span class="text-red-500">*</span></label>
          <input v-model="props.formData.quantityAlert" type="number" class="form-input w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-select { width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.5rem; }
.form-input { width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.5rem; }
</style>
