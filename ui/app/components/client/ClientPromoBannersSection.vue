<script setup lang="ts">
interface PromoBanner {
  title: string;
  ctaLabel: string;
  image: string;
}

defineProps<{
  banners: PromoBanner[];
}>();
</script>

<template>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 py-6 sm:py-8"
  >
    <ClientPromoBannerCard
      v-for="(banner, i) in banners"
      :key="i"
      :title="banner.title"
      :cta-label="banner.ctaLabel"
      :image="banner.image"
    />
  </section>
</template>
