<script setup lang="ts">
import { usePageLoading } from "~/composables/usePageLoading";
import { useAboutUsData } from "~/composables/useAboutUsData";

const { stopLoading } = usePageLoading();
const { hero, story, values, connect } = useAboutUsData();

onMounted(() => {
  setTimeout(() => stopLoading(), 200);
});
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-white via-slate-50 to-slate-100 text-slate-900 antialiased">
    <ClientHeader />

    <ClientAboutUsHero
      :title="hero.title"
      :subtitle="hero.subtitle"
      :image="hero.image"
      :image-alt="hero.imageAlt"
    />

    <ClientAboutUsStory
      :section-label="story.sectionLabel"
      :title="story.title"
      :paragraphs="story.paragraphs"
      :stats="story.stats"
    />

    <ClientAboutUsValues
      :section-label="values.sectionLabel"
      :title="values.title"
      :items="values.items"
    />

    <ClientAboutUsConnect
      :title="connect.title"
      :subtitle="connect.subtitle"
      :social-links="connect.socialLinks"
      :back-to-home-label="connect.backToHomeLabel"
      :back-to-home-href="connect.backToHomeHref"
      :contact-label="connect.contactLabel"
      :contact-href="connect.contactHref"
    />

    <ClientFooter />
    <ClientFab />
  </div>
</template>
