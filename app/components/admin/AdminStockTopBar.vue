<script setup lang="ts">
const props = defineProps<{
  searchQuery: string;
  selectedCategory: string;
  stockFilter: 'all' | 'low';
  categories: string[];
}>();

const emit = defineEmits<{
  (event: 'update:searchQuery', value: string): void;
  (event: 'update:selectedCategory', value: string): void;
  (event: 'update:stockFilter', value: 'all' | 'low'): void;
  (event: 'exportPdf'): void;
  (event: 'exportExcel'): void;
  (event: 'print'): void;
  (event: 'refresh'): void;
}>();
</script>

<template>
  <div class="bg-white border-b border-gray-200 px-8 py-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <NuxtLink to="/admin/adminsahboard" class="hover:text-[#8B0101]">Dashboard</NuxtLink>
          <span class="text-gray-400">›</span>
          <span class="text-gray-900 font-medium">Manage Stock</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Manage Stock</h1>
      </div>
      <div class="flex items-center gap-1">
        <button class="p-2 hover:bg-gray-100 rounded-lg transition" title="Export to PDF" @click.prevent="emit('exportPdf')"><Icon name="mdi:file-pdf" class="w-5 h-5 text-red-500" /></button>
        <button class="p-2 hover:bg-gray-100 rounded-lg transition" title="Export to Excel" @click.prevent="emit('exportExcel')"><Icon name="mdi:file-excel" class="w-5 h-5 text-green-500" /></button>
        <button class="p-2 hover:bg-gray-100 rounded-lg transition" title="Print" @click.prevent="emit('print')"><Icon name="mdi:printer" class="w-5 h-5 text-gray-600" /></button>
        <button class="p-2 hover:bg-gray-100 rounded-lg transition" title="Refresh" @click.prevent="emit('refresh')"><Icon name="mdi:refresh" class="w-5 h-5 text-gray-600" /></button>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
        <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400" />
        <input
          :value="props.searchQuery"
          @input="(e: Event) => emit('update:searchQuery', (e.target as HTMLInputElement).value)"
          type="text"
          placeholder="Search"
          class="bg-transparent outline-none text-sm flex-1"
        />
      </div>
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">Category</label>
        <select
          :value="props.selectedCategory"
          @change="(e: Event) => emit('update:selectedCategory', (e.target as HTMLSelectElement).value)"
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0 cursor-pointer transition"
        >
          <option value="All">All</option>
          <option v-for="c in props.categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">Stock</label>
        <select
          :value="props.stockFilter"
          @change="(e: Event) => emit('update:stockFilter', (e.target as HTMLSelectElement).value as 'all' | 'low')"
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0 cursor-pointer transition"
        >
          <option value="all">All</option>
          <option value="low">Low stock only</option>
        </select>
      </div>
    </div>
  </div>
</template>
