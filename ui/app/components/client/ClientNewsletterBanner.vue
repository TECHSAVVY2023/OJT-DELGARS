<script setup lang="ts">
defineProps<{
  title: string;
  placeholder: string;
  buttonLabel: string;
}>();

const emit = defineEmits<{ subscribe: [] }>();
</script>

<template>
  <section
    class="relative bg-linear-to-r from-gray-100 to-gray-50 py-8 sm:py-12 lg:py-16 mb-6 sm:mb-8 overflow-hidden"
  >
    <div
      class="absolute inset-0 opacity-15 pointer-events-none flex flex-wrap justify-center items-center gap-2 sm:gap-4 p-4 sm:p-8"
      aria-hidden="true"
    >
      <span v-for="i in 80" :key="i" class="text-xl sm:text-3xl md:text-4xl">🦐</span>
    </div>
    <div class="max-w-384 w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
        <div class="space-y-2 sm:space-y-4">
          <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {{ title }}
          </h2>
        </div>
        <div class="flex gap-2 sm:gap-3 flex-col sm:flex-row">
          <input
            type="email"
            :placeholder="placeholder"
            class="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0101]"
          />
          <button
            type="button"
            class="px-6 py-2 sm:px-8 sm:py-3 bg-[#8B0101] text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-[#6B0001] transition whitespace-nowrap"
            @click="emit('subscribe')"
          >
            {{ buttonLabel }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
