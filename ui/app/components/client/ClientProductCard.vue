<script setup lang="ts">
import { useToast } from "~/composables/useToast";

const { info: toastInfo } = useToast();

defineProps<{
  product: {
    name: string;
    category: string;
    subcategory?: string;
    price: number | string;
    image: string;
    badge?: string;
    categoryClass: string;
    inStock?: boolean;
    stock?: number;
  };
  quantity: number;
  maxQuantity: number;
  priceType: "retail" | "wholesale";
  labels: {
    brandLabel: string;
    retailLabel: string;
    wholesaleLabel: string;
    addLabel: string;
    inStockLabel: string;
  };
}>();

const emit = defineEmits<{
  "update:quantity": [value: number];
  "update:priceType": [value: "retail" | "wholesale"];
  openInfo: [];
}>();
</script>

<template>
  <div
    class="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100 flex flex-col"
  >
    <div
      class="relative shrink-0 cursor-pointer"
      role="button"
      tabindex="0"
      aria-label="View product details"
      @click="emit('openInfo')"
      @keydown.enter="emit('openInfo')"
      @keydown.space.prevent="emit('openInfo')"
    >
      <span
        :class="[
          'absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold',
          product.categoryClass,
        ]"
      >
        {{ product.badge ?? product.category }}
      </span>
      <span
        v-if="product.inStock !== false"
        class="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500 text-white px-1.5 py-0.5 sm:px-2 rounded-full text-[10px] sm:text-xs font-medium"
      >
        {{ product.stock ?? 1 }} in stock
      </span>
      <span
        v-else
        class="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#8B0101] text-white px-1.5 py-0.5 sm:px-2 rounded-full text-[10px] sm:text-xs font-medium"
      >
        {{ labels.inStockLabel }}
      </span>
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-28 sm:h-40 lg:h-48 object-cover"
      />
    </div>
    <div class="p-2 sm:p-4 flex flex-col flex-1 min-h-0">
      <p class="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
        {{ product.subcategory ?? product.category }}
      </p>
      <h3
        class="font-semibold text-xs sm:text-base text-gray-900 mb-1.5 sm:mb-3 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer hover:text-[#8B0101] transition"
        :title="product.name"
        @click="emit('openInfo')"
      >
        {{ product.name }}
      </h3>
      <p class="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-4">{{ labels.brandLabel }}</p>

      <div class="flex gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <button
          type="button"
          :class="[
            'flex-1 px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded transition border',
            priceType === 'retail'
              ? 'bg-[#8B0101] text-white border-[#8B0101]'
              : 'border-[#8B0101] text-[#8B0101] hover:bg-red-50',
          ]"
          :aria-pressed="priceType === 'retail'"
          aria-label="Retail price"
          @click="emit('update:priceType', 'retail')"
        >
          {{ labels.retailLabel }}
        </button>
        <button
          type="button"
          :class="[
            'flex-1 px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded transition border',
            priceType === 'wholesale'
              ? 'bg-[#8B0101] text-white border-[#8B0101]'
              : 'border-[#8B0101] text-[#8B0101] hover:bg-red-50',
          ]"
          :aria-pressed="priceType === 'wholesale'"
          aria-label="Wholesale price"
          @click="emit('update:priceType', 'wholesale')"
        >
          {{ labels.wholesaleLabel }}
        </button>
      </div>

      <div class="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3" role="group" aria-label="Quantity">
        <button
          type="button"
          class="w-7 h-7 sm:w-8 sm:h-8 bg-blue-400 text-white rounded hover:bg-blue-500 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="quantity <= 1"
          aria-label="Decrease quantity"
          @click="emit('update:quantity', quantity - 1)"
        >
          <Icon name="mdi:minus" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <span class="flex-1 text-center text-gray-700 font-medium min-w-5 sm:min-w-6 text-sm" aria-live="polite">
          {{ quantity }}
        </span>
        <button
          type="button"
          class="w-7 h-7 sm:w-8 sm:h-8 bg-blue-400 text-white rounded hover:bg-blue-500 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="quantity >= maxQuantity"
          aria-label="Increase quantity"
          @click="emit('update:quantity', quantity + 1)"
        >
          <Icon name="mdi:plus" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      <div class="flex items-center justify-between mt-auto gap-2">
        <span class="text-base sm:text-lg font-bold text-[#8B0101]">
          ₱{{ typeof product.price === 'number' ? `${product.price}.00` : product.price }}
        </span>
      </div>
    </div>
  </div>
</template>
