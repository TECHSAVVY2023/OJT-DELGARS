<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  visiblePageNumbers: number[];
}>();
const emit = defineEmits<{
  (event: "update:currentPage", value: number): void;
  (event: "update:rowsPerPage", value: number): void;
}>();

const onRowsPerPageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement | null;
  if (!target) return;
  emit('update:rowsPerPage', Number(target.value));
};
</script>

<template>
  <div class="bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">Row Per Page</label>
        <select
          :value="rowsPerPage"
          @change="onRowsPerPageChange"
          class="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0 cursor-pointer transition"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <span class="text-sm text-gray-600">Entries</span>
    </div>

    <div class="flex items-center gap-2">
      <button
        @click="emit('update:currentPage', Math.max(1, currentPage - 1))"
        :disabled="currentPage === 1"
        class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-50"
        title="Previous page"
      >
        <Icon name="mdi:chevron-left" class="w-5 h-5 text-gray-600" />
      </button>

      <div class="flex items-center gap-1">
        <button
          v-for="page in visiblePageNumbers"
          :key="page"
          @click="emit('update:currentPage', page)"
          :class="[
            'w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition',
            currentPage === page
              ? 'bg-[#8B0101] text-white'
              : 'border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50',
          ]"
        >
          {{ page }}
        </button>
        <span v-if="totalPages > 5 && !visiblePageNumbers.includes(totalPages)" class="px-2 text-gray-600 text-sm">...</span>
        <button
          v-if="totalPages > 5 && !visiblePageNumbers.includes(totalPages)"
          @click="emit('update:currentPage', totalPages)"
          class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition"
        >
          {{ totalPages }}
        </button>
      </div>

      <button
        @click="emit('update:currentPage', Math.min(totalPages, currentPage + 1))"
        :disabled="currentPage === totalPages"
        class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-50"
        title="Next page"
      >
        <Icon name="mdi:chevron-right" class="w-5 h-5 text-gray-600" />
      </button>
    </div>
  </div>
</template>
