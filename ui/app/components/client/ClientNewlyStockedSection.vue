<script setup lang="ts">
import { getCategoryClass } from "~/composables/useCategoryStyle";
import type { ProductInfoWithContext } from "~/types/client";

interface NewlyItem {
  name: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
}

defineProps<{
  imageSection: {
    mainTitle: string;
    mainSubtitle: string;
    mainImage: string;
  };
  titleHighlight: string;
  titleRest: string;
  categoryFilters: string[];
  items: NewlyItem[];
  quantityMap: Record<number, number>;
  priceTypeMap: Record<number, "retail" | "wholesale">;
  labels: {
    brandLabel: string;
    retailLabel: string;
    wholesaleLabel: string;
    addLabel: string;
    inStockLabel: string;
  };
  maxQuantity: number;
}>();

const emit = defineEmits<{
  "update:quantity": [index: number, value: number];
  "update:priceType": [index: number, value: "retail" | "wholesale"];
  "open-info": [product: ProductInfoWithContext];
  "filter-click": [category: string];
}>();
</script>

<template>
  <section class="py-12">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div
        class="lg:col-span-1 relative min-h-80 sm:min-h-112 h-112 sm:h-140 rounded-xl overflow-hidden shadow-lg order-2 lg:order-1"
      >
        <div
          class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4 sm:p-6"
        >
          <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
            {{ imageSection.mainTitle }}
          </h3>
          <p class="text-xs sm:text-sm">{{ imageSection.mainSubtitle }}</p>
        </div>
        <img
          :src="imageSection.mainImage"
          alt="Fresh meats"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="lg:col-span-2 order-1 lg:order-2">
        <div class="flex items-center justify-between mb-4 sm:mb-8 flex-wrap gap-2 sm:gap-4">
          <ClientSectionTitle
            :highlight-text="titleHighlight"
            :rest-text="titleRest"
          />
          <div class="flex gap-1.5 sm:gap-2 flex-wrap">
            <button
              v-for="cat in categoryFilters"
              :key="cat"
              type="button"
              class="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-full text-xs sm:text-sm font-medium hover:border-[#8B0101] hover:text-[#8B0101] transition"
              @click="emit('filter-click', cat)"
            >
              {{ cat }}
            </button>
          </div>
        </div>
        <div
          class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          <ClientProductCard
            v-for="(product, idx) in items"
            :key="`${product.name}-${idx}`"
            :product="{
              name: product.name,
              category: product.category,
              price: product.price,
              image: product.image,
              badge: product.category,
              categoryClass: getCategoryClass(product.category),
              inStock: product.inStock,
              stock: maxQuantity,
            }"
            :quantity="quantityMap[idx] ?? 0"
            :max-quantity="maxQuantity"
            :price-type="(priceTypeMap[idx] ?? 'retail')"
            :labels="labels"
            @update:quantity="emit('update:quantity', idx, $event)"
            @update:price-type="emit('update:priceType', idx, $event)"
            @open-info="emit('open-info', { ...product, stock: maxQuantity, _newlyIndex: idx })"
          />
        </div>
      </div>
    </div>
  </section>
</template>
