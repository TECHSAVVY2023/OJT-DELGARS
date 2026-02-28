<script setup lang="ts">
interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

defineProps<{
  sectionLabel: string;
  title: string;
  items: ValueItem[];
}>();
</script>

<template>
  <section class="bg-white py-20">
    <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-3 mb-2">
          <div class="w-2 h-10 bg-[#8B0101] rounded-md" />
          <span class="text-[#8B0101] font-semibold text-xl">{{ sectionLabel }}</span>
        </div>
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          {{ title }}
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="item in items"
          :key="item.title"
          class="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#8B0101]/20 transition-all duration-300"
        >
          <div class="w-14 h-14 rounded-xl bg-[#8B0101] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Icon :name="item.icon" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">{{ item.title }}</h3>
          <p class="text-gray-600 leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
