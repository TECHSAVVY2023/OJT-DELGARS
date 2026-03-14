<script setup lang="ts">
interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

defineProps<{
  title: string;
  subtitle: string;
  socialLinks: SocialLink[];
  backToHomeLabel: string;
  backToHomeHref: string;
  contactLabel: string;
  contactHref: string;
}>();
</script>

<template>
  <section class="relative bg-slate-900 py-24 overflow-hidden">
    <div class="absolute inset-0 opacity-30">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.4),transparent_50%)]" />
    </div>

    <div class="relative max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="text-center mb-14">
        <h2 class="text-4xl font-bold text-white mb-4">{{ title }}</h2>
        <p class="text-slate-200 max-w-md mx-auto">{{ subtitle }}</p>
      </div>

      <div class="flex justify-center gap-4 mb-12">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition shadow-md"
          :aria-label="social.name"
        >
          <Icon :name="social.icon" class="w-6 h-6" />
        </a>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink
          :to="backToHomeHref"
          class="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-[#8B0101] to-[#B20000] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition"
        >
          <Icon name="mdi:home" class="w-5 h-5" />
          {{ backToHomeLabel }}
        </NuxtLink>
        <NuxtLink
          :to="contactHref"
          class="inline-flex items-center gap-2 px-8 py-3 bg-white/10 text-white border border-white/30 rounded-full font-semibold hover:bg-white/15 transition"
        >
          <Icon name="mdi:email-outline" class="w-5 h-5" />
          {{ contactLabel }}
        </NuxtLink>
      </div>

      <div class="mt-12 text-center text-sm text-slate-300">
        <p>Looking for something else? Reach out any time — we’d love to chat.</p>
      </div>
    </div>
  </section>
</template>
