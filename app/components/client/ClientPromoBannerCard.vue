<script setup lang="ts">
import { useToast } from "~/composables/useToast";

defineProps<{
  title: string;
  ctaLabel: string;
  image: string;
}>();

const { info: toastInfo } = useToast();
function underConstruction() {
  toastInfo("Under construction");
}
</script>

<template>
  <div
    class="bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-100 overflow-hidden relative"
  >
    <div class="relative z-10">
      <h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
        {{ title }}
      </h3>
      <button
        type="button"
        class="px-4 py-1.5 sm:px-6 sm:py-2 bg-[#8B0101] text-white rounded-full text-sm sm:text-base font-semibold hover:bg-[#6B0001] transition"
        @click="underConstruction"
      >
        {{ ctaLabel }}
      </button>
    </div>
    <div class="absolute right-0 top-0 opacity-20">
      <img :src="image" alt="" class="h-24 sm:h-32 lg:h-40 object-cover" />
    </div>
  </div>
</template>
