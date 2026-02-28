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
  <section class="bg-gray-50 py-20">
    <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">{{ title }}</h2>
        <p class="text-gray-600 max-w-md mx-auto">{{ subtitle }}</p>
      </div>
      <div class="flex justify-center gap-4 mb-12">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-300 transition shadow-sm"
          :aria-label="social.name"
        >
          <Icon :name="social.icon" class="w-6 h-6" />
        </a>
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink
          :to="backToHomeHref"
          class="inline-flex items-center gap-2 px-8 py-3 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition"
        >
          <Icon name="mdi:home" class="w-5 h-5" />
          {{ backToHomeLabel }}
        </NuxtLink>
        <NuxtLink
          :to="contactHref"
          class="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
        >
          <Icon name="mdi:email-outline" class="w-5 h-5" />
          {{ contactLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
