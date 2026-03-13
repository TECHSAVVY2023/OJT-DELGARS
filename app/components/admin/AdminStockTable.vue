<script setup lang="ts">
import type { StockEntry } from '~/composables/useStockData';

const props = defineProps<{
  entries: StockEntry[];
  isLowStock: (entry: StockEntry) => boolean;
}>();

const emit = defineEmits<{
  (event: 'edit', entry: StockEntry): void;
}>();
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b border-gray-200 bg-gray-50">
          <th class="px-6 py-4 text-center"><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#8B0101] focus:ring-[#8B0101] cursor-pointer" /></th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Date ⬆</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Person</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Qty</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Threshold</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="entry in props.entries"
          :key="entry.id"
          class="border-b border-gray-200 hover:bg-gray-50 transition"
        >
          <td class="px-6 py-4 text-center"><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#8B0101] focus:ring-[#8B0101] cursor-pointer" /></td>
          <td class="px-6 py-4 text-left">
            <div class="flex items-center justify-start gap-2">
              <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
                <Icon name="mdi:fish" class="w-4 h-4" />
              </div>
              <span class="text-sm font-medium text-gray-900">{{ entry.productName }}</span>
            </div>
          </td>
          <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ entry.date }}</td>
          <td class="px-6 py-4 text-center">
            <div class="flex items-center justify-center gap-2">
              <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                <img src="/logo/delgar-logo.png" alt="" class="w-full h-full object-cover" />
              </div>
              <span class="text-sm text-gray-600">{{ entry.person }}</span>
            </div>
          </td>
          <td class="px-6 py-4 text-sm font-medium text-gray-900 text-center">{{ entry.qty }}</td>
          <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ entry.threshold }}</td>
          <td class="px-6 py-4 text-center">
            <span
              :class="[
                'inline-flex px-2 py-0.5 text-[10px] font-medium rounded border-2',
                props.isLowStock(entry)
                  ? 'border-red-600 bg-red-500 text-white'
                  : 'border-green-600 bg-green-500 text-white',
              ]"
            >
              {{ props.isLowStock(entry) ? 'Low' : 'OK' }}
            </span>
          </td>
          <td class="px-6 py-4 text-center">
            <div class="flex items-center justify-center gap-2">
              <button
                @click="() => emit('edit', entry)"
                class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition"
                title="Edit"
              >
                <Icon name="mdi:pencil" class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
