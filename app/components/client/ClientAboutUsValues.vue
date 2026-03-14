<script setup lang="ts">
interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

defineProps<{
  sectionLabel: string;
  title: string;
  items: ValueItem[];
}>();
</script>

<template>
  <section class="relative bg-linear-to-br from-white via-slate-50 to-white py-24 overflow-hidden">
    <div class="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#8B0101]/10 blur-3xl" />

    <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-3 mb-2">
          <div class="w-2 h-10 bg-[#8B0101] rounded-md" />
          <span class="text-[#8B0101] font-semibold text-xl">{{ sectionLabel }}</span>
        </div>
        <h2 class="text-4xl font-bold text-slate-900 mb-4">{{ title }}</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="item in items"
          :key="item.title"
          class="group relative overflow-hidden rounded-3xl p-8 shadow-2xl border border-white/40 bg-white/70 backdrop-blur-xl hover:shadow-2xl transition"
        >
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_55%)]" />
          <div class="relative z-10">
            <div class="w-14 h-14 rounded-xl bg-linear-to-br from-[#8B0101] to-[#B20000] flex items-center justify-center mb-6 shadow-inner">
              <Icon :name="item.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">{{ item.title }}</h3>
            <p class="text-slate-600 leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
