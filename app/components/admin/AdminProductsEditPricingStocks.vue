<script setup lang="ts">
type ProductEditForm = {
  productType: "single" | "variable";
  price: string;
  taxType: string;
  discountType: string;
  discountValue: string;
  quantityAlert: string;
};

const props = defineProps<{
  editForm: ProductEditForm;
  taxTypes: string[];
  discountTypes: string[];
}>();
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2 text-gray-700">
      <Icon name="mdi:shopping-outline" class="w-5 h-5 text-amber-500" />
      <h3 class="font-semibold">Pricing & Stocks</h3>
    </div>

    <div class="flex gap-4">
      <label class="flex items-center gap-2">
        <input v-model="props.editForm.productType" type="radio" value="single" class="w-4 h-4 text-amber-500" />
        <span class="text-sm text-gray-700">Single</span>
      </label>
      <label class="flex items-center gap-2">
        <input v-model="props.editForm.productType" type="radio" value="variable" class="w-4 h-4 text-amber-500" />
        <span class="text-sm text-gray-700">Variable</span>
      </label>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Price</label>
        <input v-model="props.editForm.price" type="text" placeholder="e.g. 600" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Tax Type</label>
        <select v-model="props.editForm.taxType" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
          <option v-for="t in props.taxTypes" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Discount Type</label>
        <select v-model="props.editForm.discountType" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
          <option v-for="d in props.discountTypes" :key="d" :value="d">{{ d }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Discount Value</label>
        <input v-model="props.editForm.discountValue" type="number" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Quantity Alert</label>
        <input v-model="props.editForm.quantityAlert" type="number" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
      </div>
    </div>
  </div>
</template>