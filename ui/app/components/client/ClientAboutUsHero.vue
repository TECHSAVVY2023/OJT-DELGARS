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
    class="relative min-h-[70vh] md:min-h-[75vh] flex flex-col md:flex-row overflow-hidden w-full"
  >
    <!-- decorative gradients -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-20 -left-24 w-72 h-72 rounded-full bg-[#8B0101]/20 blur-3xl" />
      <div class="absolute -bottom-24 -right-28 w-96 h-96 rounded-full bg-[#8B0101]/10 blur-3xl" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_65%)]" />
    </div>

    <!-- Left: premium panel -->
    <div
      class="relative hero-left flex-1 flex items-center bg-linear-to-br from-white via-[#FAF9F6] to-white py-20 md:py-24 pr-5 sm:pr-6 lg:pr-8 xl:pr-12 pl-[max(1.25rem,calc((100vw-96rem)/2+1.25rem))] sm:pl-[max(1.5rem,calc((100vw-96rem)/2+1.5rem))] lg:pl-[max(2rem,calc((100vw-96rem)/2+2rem))] xl:pl-[max(3rem,calc((100vw-96rem)/2+3rem))]"
    >
      <div class="max-w-xl space-y-6 text-left">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-2 h-10 bg-[#8B0101] rounded-md" />
          <span class="text-[#8B0101] font-semibold text-sm uppercase tracking-widest">Who we are</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
          {{ title }}
        </h1>
        <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
          {{ subtitle }}
        </p>
        <div class="flex flex-wrap gap-4 pt-6">
          <NuxtLink
            to="/client/landing"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-[#8B0101] to-[#B20000] text-white font-semibold shadow-lg hover:shadow-xl transition"
          >
            Explore products
            <span aria-hidden="true">→</span>
          </NuxtLink>
          <NuxtLink
            to="/client/landing#contact"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#8B0101] text-[#8B0101] font-semibold hover:bg-[#8B0101]/10 transition"
          >
            Contact us
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Right: marble-like image panel -->
    <div
      class="hero-right relative flex-1 min-h-[44vh] md:min-h-0 bg-[#8B0101] flex items-center justify-center md:justify-end overflow-hidden pl-5 sm:pl-6 lg:pl-8 xl:pl-12 pr-[max(1.25rem,calc((100vw-96rem)/2+1.25rem))] sm:pr-[max(1.5rem,calc((100vw-96rem)/2+1.5rem))] lg:pr-[max(2rem,calc((100vw-96rem)/2+2rem))] xl:pr-[max(3rem,calc((100vw-96rem)/2+3rem))]"
    >
      <div class="absolute inset-0 opacity-30">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_70%)]" />
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.18),transparent_75%)]" />
      </div>

      <div
        class="hero-circle-wrapper relative z-10 flex items-center justify-center w-full max-w-[min(58vw,260px)] aspect-square md:max-w-[min(48vw,420px)] md:-ml-10 lg:-ml-14"
      >
        <div
          class="hero-circle-outer w-full h-full rounded-full border-8 md:border-14 border-white/70 bg-white/20 backdrop-blur-xl shadow-2xl flex items-center justify-center p-4 md:p-6"
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
