<script setup lang="ts">
interface Stat {
  value: string;
  label: string;
}

defineProps<{
  sectionLabel: string;
  title: string;
  paragraphs: string[];
  stats: Stat[];
}>();
</script>

<template>
  <section class="relative bg-linear-to-b from-white via-slate-50 to-white py-24 overflow-hidden">
    <div class="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#8B0101]/10 blur-3xl" />

    <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl ring-1 ring-slate-200 overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_65%)]" />
        <div class="relative p-12 md:p-16">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-2 h-10 bg-[#8B0101] rounded-md" />
            <span class="text-[#8B0101] font-semibold text-xl">{{ sectionLabel }}</span>
          </div>
          <h2 class="text-4xl font-bold text-slate-900 mb-10 max-w-2xl">
            {{ title }}
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2 space-y-6 text-slate-600 leading-relaxed">
              <p v-for="(para, i) in paragraphs" :key="i" class="text-base sm:text-lg">
                {{ para }}
              </p>
            </div>

            <div class="flex flex-col gap-6">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="flex-1 text-center lg:text-left p-6 rounded-2xl bg-linear-to-br from-white via-[#FFEAEA] to-white border border-white/60 shadow-lg"
              >
                <p class="text-3xl sm:text-4xl font-bold text-[#8B0101] mb-1">{{ stat.value }}</p>
                <p class="text-sm font-medium text-slate-600">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
