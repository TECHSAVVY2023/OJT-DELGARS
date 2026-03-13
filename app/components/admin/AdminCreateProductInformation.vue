<script setup lang="ts">
import type { ProductFormData } from "~/composables/useCreateProduct";

const props = defineProps<{
  formData: ProductFormData;
  stores: string[];
  categories: string[];
  brands: string[];
  units: string[];
  sellingTypes: string[];
  barcodeSymbologies: string[];
}>();

const emit = defineEmits<{
  (event: "generate-sku"): void;
  (event: "generate-item-code"): void;
}>();
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
      <Icon name="mdi:information" class="w-5 h-5 text-amber-500" />
      <h2 class="text-lg font-semibold text-gray-900">Product Information</h2>
    </div>

    <div class="p-6 space-y-6">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Store <span class="text-red-500">*</span></label>
          <select v-model="props.formData.store" class="form-select w-full">
            <option value="">Select</option>
            <option v-for="store in props.stores" :key="store" :value="store">{{ store }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Storage <span class="text-red-500">*</span></label>
          <select v-model="props.formData.storage" class="form-select w-full">
            <option value="">Select</option>
            <option value="Cold Storage">Cold Storage</option>
            <option value="Dry Storage">Dry Storage</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product Name <span class="text-red-500">*</span></label>
          <input v-model="props.formData.productName" type="text" class="form-input w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Slug <span class="text-red-500">*</span></label>
          <input v-model="props.formData.slug" type="text" class="form-input w-full" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">SKU <span class="text-red-500">*</span></label>
          <div class="flex gap-2">
            <input v-model="props.formData.sku" type="text" class="form-input flex-1" />
            <button type="button" @click="emit('generate-sku')" class="btn-action">Generate</button>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Selling Type <span class="text-red-500">*</span></label>
          <select v-model="props.formData.sellingType" class="form-select w-full">
            <option value="">Select</option>
            <option v-for="type in props.sellingTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Category <span class="text-red-500">*</span></label>
          <select v-model="props.formData.category" class="form-select w-full">
            <option value="">Select</option>
            <option v-for="cat in props.categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Unit <span class="text-red-500">*</span></label>
          <select v-model="props.formData.unit" class="form-select w-full">
            <option value="">Select</option>
            <option v-for="unit in props.units" :key="unit" :value="unit">{{ unit }}</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Item Code <span class="text-red-500">*</span></label>
          <div class="flex gap-2">
            <input v-model="props.formData.itemCode" type="text" class="form-input flex-1" />
            <button type="button" @click="emit('generate-item-code')" class="btn-action">Generate</button>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Barcode Symbology <span class="text-red-500">*</span></label>
          <select v-model="props.formData.barcodeSymbology" class="form-select w-full">
            <option value="">Select</option>
            <option v-for="sym in props.barcodeSymbologies" :key="sym" :value="sym">{{ sym }}</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea v-model="props.formData.description" rows="5" class="form-input w-full"></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-select { width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.5rem; }
.form-input { width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.5rem; }
.btn-action { padding: 0.5rem 0.75rem; background:#F59E0B; color:#fff; border-radius:0.5rem; }
</style>
