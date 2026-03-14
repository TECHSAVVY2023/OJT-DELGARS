<script setup lang="ts">
type ProductEditForm = {
  manufacturer: string;
  manufacturedDate: string;
  expiryOn: string;
};

const props = defineProps<{
  editForm: ProductEditForm;
}>();
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2 text-gray-700">
      <Icon name="mdi:form-textbox" class="w-5 h-5 text-amber-500" />
      <h3 class="font-semibold">Custom Fields</h3>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Manufacturer</label>
        <input v-model="props.editForm.manufacturer" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Manufactured Date</label>
        <input v-model="props.editForm.manufacturedDate" type="text" placeholder="dd/mm/yyyy" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Expiry On</label>
        <input v-model="props.editForm.expiryOn" type="text" placeholder="dd/mm/yyyy" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
      </div>
    </div>
  </div>
</template>