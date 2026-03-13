<script setup lang="ts">
const props = defineProps<{
  items: Array<{ label: string; to?: string; active?: boolean }>;
  title: string;
}>();
</script>

<template>
  <div class="bg-white border-b border-gray-200 px-8 py-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <template v-for="(item, index) in props.items" :key="item.label + index">
            <NuxtLink v-if="item.to" :to="item.to" class="hover:text-[#8B0101]">{{ item.label }}</NuxtLink>
            <span v-else :class="item.active ? 'text-gray-900 font-medium' : ''">{{ item.label }}</span>
            <span v-if="index < props.items.length - 1" class="text-gray-400">›</span>
          </template>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">{{ props.title }}</h1>
      </div>
      <slot name="actions" />
    </div>
  </div>
</template>
