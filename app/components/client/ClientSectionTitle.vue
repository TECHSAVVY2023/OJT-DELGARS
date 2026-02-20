<script setup lang="ts">
defineProps<{
  highlightText: string;
  restText: string;
}>();
</script>

<template>
  <div class="flex items-center gap-2 sm:gap-3">
    <div class="w-1.5 sm:w-2 h-8 sm:h-10 bg-[#8B0101] rounded-md flex-shrink-0" />
    <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold">
      <span class="text-[#8B0101] mr-1">{{ highlightText }}</span>
      <span class="text-gray-900">{{ restText }}</span>
    </h2>
  </div>
</template>
