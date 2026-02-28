<script setup lang="ts">
interface TitlePart {
  text: string;
  color: string;
}

defineProps<{
  titleParts: TitlePart[] | undefined;
  intro: string;
  ctaLabel: string;
}>();
</script>

<template>
  <section
    id="home"
    class="relative min-h-[80vh] md:min-h-[85vh] flex flex-col md:flex-row overflow-hidden w-full"
  >
    <div
      class="hero-left flex-1 flex items-center bg-[#FAF9F6] py-16 md:py-20 pr-5 sm:pr-6 lg:pr-8 xl:pr-12 pl-[max(1.25rem,calc((100vw-96rem)/2+1.25rem))] sm:pl-[max(1.5rem,calc((100vw-96rem)/2+1.5rem))] lg:pl-[max(2rem,calc((100vw-96rem)/2+2rem))] xl:pl-[max(3rem,calc((100vw-96rem)/2+3rem))]"
    >
      <div class="max-w-xl space-y-6 text-left animate-fade-in-left">
        <h1
          class="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight"
        >
          <span
            class="inline-block animate-slide-in-down mr-1"
            :style="{ color: titleParts?.[0]?.color }"
          >
            {{ titleParts?.[0]?.text }}
          </span>
          <span
            class="inline-block animate-slide-in-down animation-delay-100"
            :style="{ color: titleParts?.[1]?.color }"
          >
            {{ titleParts?.[1]?.text }}
          </span>
          <br />
          <span
            class="inline-block animate-slide-in-down animation-delay-200"
            :style="{ color: titleParts?.[2]?.color }"
          >
            {{ titleParts?.[2]?.text }}
          </span>
        </h1>
        <p
          class="hero-intro text-base sm:text-lg text-gray-600 leading-relaxed animate-fade-in"
          style="animation-delay: 0.3s"
        >
          {{ intro }}
        </p>
        <NuxtLink
          to="/client/catalog"
          class="px-8 py-3 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition inline-block animate-fade-in-up"
          style="animation-delay: 0.4s"
        >
          {{ ctaLabel }}
        </NuxtLink>
      </div>
    </div>

    <div
      class="hero-right relative flex-1 min-h-[50vh] md:min-h-0 bg-[#8B0101] flex items-center justify-center md:justify-end overflow-hidden pl-5 sm:pl-6 lg:pl-8 xl:pl-12 pr-[max(1.25rem,calc((100vw-96rem)/2+1.25rem))] sm:pr-[max(1.5rem,calc((100vw-96rem)/2+1.5rem))] lg:pr-[max(2rem,calc((100vw-96rem)/2+2rem))] xl:pr-[max(3rem,calc((100vw-96rem)/2+3rem))]"
    >
      <div
        class="hero-freshness-strip absolute left-0 top-0 bottom-0 w-32 md:w-40 flex items-center justify-center bg-transparent animate-float"
        aria-hidden="true"
      >
        <span class="hero-freshness-text text-white font-bold tracking-[0.2em] select-none">
          FRESHNESS
        </span>
      </div>

      <div
        class="hero-circle-wrapper relative z-10 flex items-center justify-center w-full max-w-[min(58vw,220px)] aspect-square md:max-w-[min(48vw,440px)] md:-ml-10 lg:-ml-14 animate-bounce-slow"
      >
        <div
          class="hero-circle-outer w-full h-full rounded-full border-10 md:border-[14px] border-white bg-[#ADD8E6]/95 shadow-2xl flex items-center justify-center p-4 md:p-6 animate-pulse-glow"
        >
          <img
            src="/logo/delgar-logo.png"
            alt="Delgar Frozen Products"
            class="w-full h-full object-contain rounded-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700;800&display=swap");

.hero-title {
  font-family: "Roboto Condensed", sans-serif;
}

.hero-intro {
  font-family: "Poppins", sans-serif;
}

.hero-freshness-text {
  font-family: "Roboto Condensed", sans-serif;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  white-space: nowrap;
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  letter-spacing: 0.15em;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out forwards;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-down {
  animation: slideInDown 0.6s ease-out forwards;
  opacity: 0;
}

.animation-delay-100 {
  animation-delay: 0.1s !important;
}

.animation-delay-200 {
  animation-delay: 0.2s !important;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

@keyframes bounceSlowly {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bounce-slow {
  animation: bounceSlowly 3s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(173, 216, 230, 0.6), 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  50% {
    box-shadow: 0 0 30px rgba(173, 216, 230, 0.9), 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
}

.animate-pulse-glow {
  animation: pulseGlow 2s ease-in-out infinite;
}
</style>
