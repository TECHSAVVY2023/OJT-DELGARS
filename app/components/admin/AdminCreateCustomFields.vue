<script setup lang="ts">
import type { ProductFormData, CustomFields } from "~/composables/useCreateProduct";

const props = defineProps<{
  formData: ProductFormData;
  customFields: CustomFields;
}>();
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
      <Icon name="mdi:form-textbox" class="w-5 h-5 text-amber-500" />
      <h2 class="text-lg font-semibold text-gray-900">Custom Fields</h2>
    </div>

    <div class="p-6 space-y-6">
      <div class="flex gap-6 pb-6 border-b border-gray-200">
        <label class="flex items-center gap-2 cursor-pointer">
          <input v-model="props.customFields.manufacturer" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-amber-500" />
          <span class="text-sm text-gray-700">Manufacturer</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input v-model="props.customFields.expiry" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-amber-500" />
          <span class="text-sm text-gray-700">Expiry</span>
        </label>
      </div>

      <div v-if="props.customFields.manufacturer">
        <label class="block text-sm font-medium text-gray-700 mb-2">Manufacturer <span class="text-red-500">*</span></label>
        <input v-model="props.formData.manufacturer" type="text" class="form-input w-full" />
      </div>

      <div v-if="props.customFields.expiry" class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Manufactured Date <span class="text-red-500">*</span></label>
          <div class="relative">
            <input v-model="props.formData.manufacturedDate" type="text" placeholder="dd/mm/yyyy" class="form-input w-full" />
            <button type="button" class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"><Icon name="mdi:calendar" class="w-5 h-5" /></button>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Expiry On <span class="text-red-500">*</span></label>
          <div class="relative">
            <input v-model="props.formData.expiryOn" type="text" placeholder="dd/mm/yyyy" class="form-input w-full" />
            <button type="button" class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"><Icon name="mdi:calendar" class="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-input { width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.5rem; }
</style>
