<script setup lang="ts">
const props = defineProps<{
  searchQuery: string;
  statusFilter: string;
}>();

const emit = defineEmits(["update:searchQuery", "update:statusFilter", "add-category"] as const);
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
      <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400" />
      <input :value="props.searchQuery" @input="(e: Event) => emit('update:searchQuery', ((e.target as HTMLInputElement).value || ''))" type="text" placeholder="Search" class="bg-transparent outline-none text-sm flex-1" />
    </div>
    <div class="flex items-center gap-2">
      <label class="text-sm font-medium text-gray-700">Status</label>
      <select
        :value="props.statusFilter"
        @change="(e: Event) => emit('update:statusFilter', (e.target as HTMLSelectElement).value)"
        class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0"
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  </div>
</template>
