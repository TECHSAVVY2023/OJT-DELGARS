<script setup lang="ts">
defineProps<{
  allCategoriesOption: string;
  searchPlaceholder: string;
  filtersLabel: string;
  compareLabel: string;
  searchQuery: string;
}>();

const emit = defineEmits<{
  "update:searchQuery": [value: string];
  "open-filters": [];
  compare: [];
  search: [];
}>();
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
    <button
      type="button"
      class="lg:hidden px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition flex items-center gap-2"
      @click="emit('open-filters')"
    >
      <Icon name="mdi:filter-menu" class="w-5 h-5" />
      {{ filtersLabel }}
    </button>
    <div class="flex-1 relative w-full sm:w-auto">
      <div class="flex gap-2">
        <select
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0101]"
        >
          <option>{{ allCategoriesOption }}</option>
          <option>Pork</option>
          <option>Chicken</option>
          <option>Beef</option>
          <option>Seafood</option>
        </select>
        <input
          :value="searchQuery"
          type="text"
          :placeholder="searchPlaceholder"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0101]"
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement)?.value ?? '')"
        />
        <button
          type="button"
          class="px-4 py-2 bg-[#8B0101] text-white rounded-lg hover:bg-[#6B0001] transition"
          @click="emit('search')"
        >
          <Icon name="mdi:magnify" class="w-5 h-5" />
        </button>
      </div>
    </div>
    <button
      type="button"
      class="flex items-center gap-2 text-[#8B0101] font-medium hover:opacity-80 transition whitespace-nowrap"
      @click="emit('compare')"
    >
      <Icon name="mdi:compare" class="w-5 h-5" />
      {{ compareLabel }}
    </button>
  </div>
</template>
