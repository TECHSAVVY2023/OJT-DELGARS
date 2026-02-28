<script setup lang="ts">
interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

defineProps<{
  title: string;
  paragraphs: string[];
  socialLinks: SocialLink[];
  ctaLabel: string;
  /** When set, the CTA is a link to this path instead of a button that emits. */
  ctaHref?: string;
}>();

const emit = defineEmits<{ cta: [] }>();
</script>

<template>
  <section id="about" class="bg-gray-50 py-20">
    <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="flex items-center justify-center">
          <img
            src="/logo/delgar-logo.png"
            alt="About Delgar"
            class="w-full max-w-md rounded-lg shadow-lg object-cover"
          />
        </div>

        <div>
          <h2 class="text-4xl font-bold text-[#8B0101] mb-6">{{ title }}</h2>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p v-for="(para, i) in paragraphs" :key="i">
              {{ para }}
            </p>
          </div>
          <div class="mt-8 flex items-center gap-4">
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
          <NuxtLink
            v-if="ctaHref"
            :to="ctaHref"
            class="mt-8 inline-block px-8 py-3 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition"
          >
            {{ ctaLabel }}
          </NuxtLink>
          <button
            v-else
            type="button"
            class="mt-8 px-8 py-3 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition"
            @click="emit('cta')"
          >
            {{ ctaLabel }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
