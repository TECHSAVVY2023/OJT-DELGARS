<script setup lang="ts">
interface Stat {
  value: string;
  label: string;
}

defineProps<{
  sectionLabel: string;
  title: string;
  paragraphs: string[];
  stats: Stat[];
}>();
</script>

<template>
  <section class="bg-gray-50 py-20">
    <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-2 h-10 bg-[#8B0101] rounded-md" />
        <span class="text-[#8B0101] font-semibold text-xl">{{ sectionLabel }}</span>
      </div>
      <h2 class="text-4xl font-bold text-gray-900 mb-10 max-w-2xl">
        {{ title }}
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="lg:col-span-2 space-y-6 text-gray-600 leading-relaxed">
          <p v-for="(para, i) in paragraphs" :key="i" class="text-base sm:text-lg">
            {{ para }}
          </p>
        </div>
        <div class="flex flex-row lg:flex-col gap-6 lg:gap-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex-1 lg:flex-none text-center lg:text-left p-6 rounded-xl bg-white border border-gray-100 shadow-sm"
          >
            <p class="text-3xl sm:text-4xl font-bold text-[#8B0101] mb-1">{{ stat.value }}</p>
            <p class="text-sm font-medium text-gray-600">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
