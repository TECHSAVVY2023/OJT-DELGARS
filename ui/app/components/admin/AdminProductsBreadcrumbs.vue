<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: "Products" },
});
</script>

<template>
  <div class="bg-white border-b border-gray-200 px-8 py-6">
    <div class="mb-2">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <NuxtLink to="/admin/adminsahboard" class="hover:text-[#8B0101]">Dashboard</NuxtLink>
        <span class="text-gray-400">›</span>
        <span class="text-gray-900 font-medium">{{ title }}</span>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
      <div class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
