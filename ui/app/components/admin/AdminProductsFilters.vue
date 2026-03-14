<script setup lang="ts">
type ExpiredFilter = 'all' | 'expired' | 'notExpired';

const props = defineProps<{
  selectedCategory: string;
  selectedBrand: string;
  expiredFilter: ExpiredFilter;
  categories: string[];
  brands: string[];
}>();
const emit = defineEmits<{
  (event: 'update:selectedCategory', value: string): void;
  (event: 'update:selectedBrand', value: string): void;
  (event: 'update:expiredFilter', value: ExpiredFilter): void;
}>();

const onCategoryChange = (event: Event) => {
  const target = event.target as HTMLSelectElement | null;
  if (target) emit('update:selectedCategory', target.value);
};

const onBrandChange = (event: Event) => {
  const target = event.target as HTMLSelectElement | null;
  if (target) emit("update:selectedBrand", target.value);
};

const onExpiredFilterChange = (event: Event) => {
  const target = event.target as HTMLSelectElement | null;
  if (!target) return;
  const value = target.value as ExpiredFilter;
  emit('update:expiredFilter', value);
};
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-2">
      <label class="text-sm font-medium text-gray-700">Category</label>
      <select
        :value="props.selectedCategory"
        @change="onCategoryChange"
        class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0 cursor-pointer transition"
      >
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="flex items-center gap-2">
      <label class="text-sm font-medium text-gray-700">Brand</label>
      <select
        :value="props.selectedBrand"
        @change="onBrandChange"
        class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0 cursor-pointer transition"
      >
        <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
      </select>
    </div>

    <div class="flex items-center gap-2">
      <label class="text-sm font-medium text-gray-700">Expired</label>
      <select
        :value="props.expiredFilter"
        @change="onExpiredFilterChange"
        class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0 cursor-pointer transition"
      >
        <option value="all">All</option>
        <option value="expired">Expired only</option>
        <option value="notExpired">Not expired</option>
      </select>
    </div>
  </div>
</template>
