<script setup lang="ts">
import { useToast } from "~/composables/useToast";

defineProps<{
  product: {
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    daysLeft: number;
    hoursLeft: number;
    minutesLeft: number;
    secondsLeft: number;
  };
  brandLabel: string;
  addLabel: string;
}>();

const { info: toastInfo } = useToast();
function underConstruction() {
  toastInfo("Under construction");
}
</script>

<template>
  <div
    class="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100"
  >
    <div class="relative bg-gray-50 h-36 sm:h-44 lg:h-48">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-black/30 flex items-center justify-center"
      >
        <div class="flex gap-2">
          <div class="bg-white rounded px-3 py-2 text-center">
            <div class="text-lg font-bold text-[#8B0101]">{{ product.daysLeft }}</div>
            <div class="text-xs text-gray-600">Days</div>
          </div>
          <div class="bg-white rounded px-3 py-2 text-center">
            <div class="text-lg font-bold text-[#8B0101]">{{ product.hoursLeft }}</div>
            <div class="text-xs text-gray-600">Hours</div>
          </div>
          <div class="bg-white rounded px-3 py-2 text-center">
            <div class="text-lg font-bold text-[#8B0101]">{{ product.minutesLeft }}</div>
            <div class="text-xs text-gray-600">Mins</div>
          </div>
          <div class="bg-white rounded px-3 py-2 text-center">
            <div class="text-lg font-bold text-[#8B0101]">{{ product.secondsLeft }}</div>
            <div class="text-xs text-gray-600">Sec</div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-3 sm:p-4 space-y-2 sm:space-y-3">
      <h3 class="font-semibold text-sm sm:text-base text-gray-900">{{ product.name }}</h3>
      <p class="text-[10px] sm:text-xs text-gray-500">{{ brandLabel }}</p>
      <div class="flex items-center justify-between gap-2">
        <span class="text-base sm:text-lg font-bold text-[#8B0101]"
          >₱{{ product.price }}.00</span
        >
        <span class="text-xs sm:text-sm text-gray-500 line-through"
          >₱{{ product.originalPrice }}</span
        >
      </div>
      <button
        type="button"
        class="w-full px-2 py-1.5 sm:px-3 sm:py-2 bg-[#8B0101] text-white rounded text-xs sm:text-sm font-semibold hover:bg-[#6B0001] transition flex items-center justify-center gap-1.5 sm:gap-2"
        @click="underConstruction"
      >
        <Icon name="mdi:cart" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        {{ addLabel }}
      </button>
    </div>
  </div>
</template>
