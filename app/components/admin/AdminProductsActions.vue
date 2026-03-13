<script setup lang="ts">
const emit = defineEmits(["add-product", "export-pdf", "export-excel", "print", "refresh"]);
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      @click="emit('add-product')"
      class="px-3 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition flex items-center gap-2 text-sm"
    >
      <Icon name="mdi:plus" class="w-5 h-5" />
      Add Product
    </button>

    <div class="flex items-center gap-1">
      <button @click="emit('export-pdf')" class="p-2 hover:bg-red-50 rounded-lg transition" title="Export to PDF">
        <Icon name="mdi:file-pdf" class="w-5 h-5 text-red-500" />
      </button>
      <button @click="emit('export-excel')" class="p-2 hover:bg-green-50 rounded-lg transition" title="Export to Excel">
        <Icon name="mdi:file-excel" class="w-5 h-5 text-green-500" />
      </button>
      <button @click="emit('print')" class="p-2 hover:bg-gray-100 rounded-lg transition" title="Print">
        <Icon name="mdi:printer" class="w-5 h-5 text-gray-600" />
      </button>
      <button @click="emit('refresh')" class="p-2 hover:bg-gray-100 rounded-lg transition" title="Refresh">
        <Icon name="mdi:refresh" class="w-5 h-5 text-gray-600" />
      </button>
    </div>
  </div>
</template>
