<script setup lang="ts">
const props = defineProps<{
  searchQuery: string;
  typeFilter: string;
  entityFilter: string;
  typeOptions: string[];
  entityOptions: string[];
}>();

const emit = defineEmits<{
  (event: 'update:searchQuery', value: string): void;
  (event: 'update:typeFilter', value: string): void;
  (event: 'update:entityFilter', value: string): void;
  (event: 'exportPdf'): void;
  (event: 'exportExcel'): void;
  (event: 'refresh'): void;
}>();
</script>

<template>
  <div class="bg-white border-b border-gray-200 px-8 py-6">
    <div class="flex items-center justify-between mb-4">
      <div>
        <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <NuxtLink to="/admin/adminsahboard" class="hover:text-[#8B0101]">Dashboard</NuxtLink>
          <span class="text-gray-400">›</span>
          <span class="text-gray-900 font-medium">Activity Logs</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Activity Logs</h1>
        <p class="text-sm text-gray-500 mt-1">View and filter system activity</p>
      </div>
      <div class="flex items-center gap-2 border-l border-gray-200 pl-3">
        <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Export to PDF" @click.prevent="emit('exportPdf')"><Icon name="mdi:file-pdf" class="w-7 h-7 text-red-500" /></button>
        <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Export to Excel" @click.prevent="emit('exportExcel')"><Icon name="mdi:file-excel" class="w-7 h-7 text-green-600" /></button>
        <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Refresh" @click.prevent="emit('refresh')"><Icon name="mdi:refresh" class="w-7 h-7 text-gray-600" /></button>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-4">
      <div class="flex-1 min-w-50 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
        <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400 shrink-0" />
        <input
          :value="props.searchQuery"
          type="text"
          placeholder="Search action, user or details..."
          class="bg-transparent outline-none text-sm flex-1 min-w-0"
          @input="(e: Event) => emit('update:searchQuery', (e.target as HTMLInputElement).value)"
        />
      </div>
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">Type</label>
        <select
          :value="props.typeFilter"
          @change="(e: Event) => emit('update:typeFilter', (e.target as HTMLSelectElement).value)"
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0"
        >
          <option v-for="opt in props.typeOptions" :key="opt" :value="opt">{{ opt === 'All' ? 'All' : opt }}</option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">Entity</label>
        <select
          :value="props.entityFilter"
          @change="(e: Event) => emit('update:entityFilter', (e.target as HTMLSelectElement).value)"
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0"
        >
          <option v-for="opt in props.entityOptions" :key="opt" :value="opt">{{ opt === 'All' ? 'All' : opt }}</option>
        </select>
      </div>
    </div>
  </div>
</template>
