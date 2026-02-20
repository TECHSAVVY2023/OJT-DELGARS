<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center flex-1 min-h-[60vh] px-8 py-12 text-center">
    <div class="w-24 h-24 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center mb-6">
      <Icon name="mdi:hammer-wrench" class="w-12 h-12 text-amber-600" />
    </div>
    <h2 class="text-2xl font-bold text-gray-900 mb-2">
      {{ title || 'Under Construction' }}
    </h2>
    <p class="text-gray-600 max-w-md mb-8">
      This page is not ready yet. We're working on it and will have it available soon.
    </p>
    <NuxtLink
      to="/admin/adminsahboard"
      class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition"
    >
      <Icon name="mdi:arrow-left" class="w-5 h-5" />
      Back to Dashboard
    </NuxtLink>
  </div>
</template>
