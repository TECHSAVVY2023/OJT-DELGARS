<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 shrink-0">
    <button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition" @click="$emit('close')">
      Cancel
    </button>
    <button type="submit" class="px-4 py-2 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition flex items-center gap-2">
      <Icon name="mdi:content-save" class="w-4 h-4" />
      Update Product
    </button>
  </div>
</template>