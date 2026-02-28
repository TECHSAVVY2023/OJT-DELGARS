<script setup lang="ts">
interface DealItem {
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  secondsLeft: number;
}

defineProps<{
  titleHighlight: string;
  titleRest: string;
  allDealsLabel: string;
  items: DealItem[];
  brandLabel: string;
  addLabel: string;
}>();
</script>

<template>
  <section class="py-8 sm:py-12">
    <div class="flex items-center justify-between mb-4 sm:mb-8 flex-wrap gap-2">
      <ClientSectionTitle
        :highlight-text="titleHighlight"
        :rest-text="titleRest"
      />
      <NuxtLink
        to="/client/catalog"
        class="text-[#8B0101] font-semibold hover:opacity-80 transition"
      >
        {{ allDealsLabel }}
      </NuxtLink>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      <ClientDealCard
        v-for="(product, index) in items"
        :key="index"
        :product="product"
        :brand-label="brandLabel"
        :add-label="addLabel"
      />
    </div>
  </section>
</template>
