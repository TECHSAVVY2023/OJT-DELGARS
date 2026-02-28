<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}>();
</script>

<template>
  <section
    class="relative min-h-[60vh] md:min-h-[70vh] flex flex-col md:flex-row overflow-hidden w-full"
  >
    <!-- Left: cream panel (same as landing hero) -->
    <div
      class="hero-left flex-1 flex items-center bg-[#FAF9F6] py-16 md:py-20 pr-5 sm:pr-6 lg:pr-8 xl:pr-12 pl-[max(1.25rem,calc((100vw-96rem)/2+1.25rem))] sm:pl-[max(1.5rem,calc((100vw-96rem)/2+1.5rem))] lg:pl-[max(2rem,calc((100vw-96rem)/2+2rem))] xl:pl-[max(3rem,calc((100vw-96rem)/2+3rem))]"
    >
      <div class="max-w-xl space-y-6 text-left">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-2 h-10 bg-[#8B0101] rounded-md" />
          <span class="text-[#8B0101] font-semibold text-sm uppercase tracking-wider">Who we are</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
          {{ title }}
        </h1>
        <p class="text-base sm:text-lg text-gray-600 leading-relaxed">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <!-- Right: red panel with image (same as landing hero right) -->
    <div
      class="hero-right relative flex-1 min-h-[40vh] md:min-h-0 bg-[#8B0101] flex items-center justify-center md:justify-end overflow-hidden pl-5 sm:pl-6 lg:pl-8 xl:pl-12 pr-[max(1.25rem,calc((100vw-96rem)/2+1.25rem))] sm:pr-[max(1.5rem,calc((100vw-96rem)/2+1.5rem))] lg:pr-[max(2rem,calc((100vw-96rem)/2+2rem))] xl:pr-[max(3rem,calc((100vw-96rem)/2+3rem))]"
    >
      <div
        class="hero-circle-wrapper relative z-10 flex items-center justify-center w-full max-w-[min(58vw,220px)] aspect-square md:max-w-[min(48vw,380px)] md:-ml-10 lg:-ml-14"
      >
        <div
          class="hero-circle-outer w-full h-full rounded-full border-8 md:border-[14px] border-white bg-[#ADD8E6]/95 shadow-2xl flex items-center justify-center p-4 md:p-6"
        >
          <img
            :src="image"
            :alt="imageAlt"
            class="w-full h-full object-contain rounded-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>
