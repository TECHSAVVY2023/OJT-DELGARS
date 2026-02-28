<script setup lang="ts">
interface BrowseCategory {
  id: number;
  name: string;
  image: string;
  backTitle: string;
  backSubtitle: string;
}

defineProps<{
  label: string;
  sectionTitle: string;
  items: BrowseCategory[];
}>();

/** Link to catalog with optional category. */
function catalogCategoryUrl(cat: { name: string }) {
  if (cat.name === "All Products") return "/client/catalog";
  return `/client/catalog?category=${encodeURIComponent(cat.name)}`;
}
</script>

<template>
  <section class="bg-gray-50 py-20">
    <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-2 h-10 bg-[#8B0101] rounded-md" />
          <span class="text-[#8B0101] font-semibold text-xl">{{ label }}</span>
        </div>
        <h2 class="text-4xl font-bold text-gray-900">{{ sectionTitle }}</h2>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <NuxtLink
          v-for="cat in items"
          :key="cat.id"
          :to="catalogCategoryUrl(cat)"
          class="group h-64 cursor-pointer perspective block"
        >
          <div
            class="relative w-full h-full transition-transform duration-500 transform-gpu hover:transform-[rotateY(180deg)]"
            style="transform-style: preserve-3d"
          >
            <div
              class="absolute w-full h-full bg-cover bg-center rounded-2xl overflow-hidden"
              style="backface-visibility: hidden"
            >
              <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/20" />
            </div>
            <div
              class="absolute w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center"
              style="backface-visibility: hidden; transform: rotateY(180deg)"
            >
              <div class="text-center text-white">
                <p class="text-sm font-semibold text-gray-300">{{ cat.backTitle }}</p>
                <p class="text-xs text-gray-400">{{ cat.backSubtitle }}</p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}
</style>
