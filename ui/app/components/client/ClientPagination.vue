<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  "update:currentPage": [value: number];
}>();
</script>

<template>
  <div class="flex justify-center items-center gap-2 py-8">
    <button
      type="button"
      :disabled="currentPage === 1"
      class="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
      @click="emit('update:currentPage', Math.max(1, currentPage - 1))"
    >
      <Icon name="mdi:chevron-left" class="w-5 h-5" />
    </button>
    <div class="flex gap-1">
      <button
        v-for="page in totalPages"
        :key="page"
        type="button"
        :class="[
          'w-10 h-10 flex items-center justify-center rounded-full font-medium transition',
          currentPage === page
            ? 'bg-[#8B0101] text-white'
            : 'border border-gray-300 hover:bg-gray-50',
        ]"
        @click="emit('update:currentPage', page)"
      >
        {{ page }}
      </button>
    </div>
    <button
      type="button"
      :disabled="currentPage === totalPages"
      class="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
      @click="emit('update:currentPage', Math.min(totalPages, currentPage + 1))"
    >
      <Icon name="mdi:chevron-right" class="w-5 h-5" />
    </button>
  </div>
</template>
