<script setup lang="ts">
import { usePageLoading } from "~/composables/usePageLoading";
import { useLandingData } from "~/composables/useLandingData";
import { useClientLoginModal } from "~/composables/useClientLoginModal";
import { useToast } from "~/composables/useToast";
import { ref } from "vue";

const { stopLoading } = usePageLoading();
const { hero, trust, browseCategories, catalog, about, contact } = useLandingData();
const { showLoginModal, closeLogin } = useClientLoginModal();
const { success, info: toastInfo } = useToast();
function underConstruction() {
  toastInfo("Under construction");
}

/** Link to catalog with optional category (Browse by Category). */
function catalogCategoryUrl(cat: { name: string }) {
  if (cat.name === "All Products") return "/client/catalog";
  return `/client/catalog?category=${encodeURIComponent(cat.name)}`;
}

async function onLoginSuccess() {
  success("Login successful!");
  closeLogin();
  await navigateTo("/admin/adminsahboard");
}

function updateLoginModal(value: boolean) {
  showLoginModal.value = value;
}

const productQuantities = ref<Record<number, number>>({});
const productPriceType = ref<Record<number, "retail" | "wholesale">>({});

function getQuantity(productId: number) {
  return productQuantities.value[productId] ?? 0;
}

function setQuantity(productId: number, qty: number) {
  const product = catalog.value.products.find((p: { id: number; stock: number }) => p.id === productId);
  const max = product ? product.stock : 999;
  const next = Math.max(0, Math.min(max, qty));
  productQuantities.value = { ...productQuantities.value, [productId]: next };
}

function setPriceType(productId: number, type: "retail" | "wholesale") {
  productPriceType.value = { ...productPriceType.value, [productId]: type };
}

function getPriceType(productId: number): "retail" | "wholesale" {
  return productPriceType.value[productId] ?? "retail";
}

onMounted(() => {
  setTimeout(() => {
    stopLoading();
  }, 300);
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <ClientHeader />

    <!-- Hero Section - containers span full width; only content padding aligns with header -->
    <section id="home" class="relative min-h-[80vh] md:min-h-[85vh] flex flex-col md:flex-row overflow-hidden w-full">
      <!-- Left: off-white/beige container spans full; content inset to match header -->
      <div
        class="hero-left flex-1 flex items-center bg-[#FAF9F6] py-16 md:py-20 pr-5 sm:pr-6 lg:pr-8 xl:pr-12 pl-[max(1.25rem,calc((100vw-96rem)/2+1.25rem))] sm:pl-[max(1.5rem,calc((100vw-96rem)/2+1.5rem))] lg:pl-[max(2rem,calc((100vw-96rem)/2+2rem))] xl:pl-[max(3rem,calc((100vw-96rem)/2+3rem))]"
      >
        <div class="max-w-xl space-y-6 text-left animate-fade-in-left">
            <h1 class="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
              <span class="inline-block animate-slide-in-down mr-1" :style="{ color: hero.titleParts?.[0]?.color }">{{ hero.titleParts?.[0]?.text }}</span><span class="inline-block animate-slide-in-down animation-delay-100" :style="{ color: hero.titleParts?.[1]?.color }">{{ hero.titleParts?.[1]?.text }}</span>
              <br />
              <span class="inline-block animate-slide-in-down animation-delay-200" :style="{ color: hero.titleParts?.[2]?.color }">{{ hero.titleParts?.[2]?.text }}</span>
            </h1>
            <p class="hero-intro text-base sm:text-lg text-gray-600 leading-relaxed animate-fade-in" style="animation-delay: 0.3s">
              {{ hero.intro }}
            </p>
            <NuxtLink to="/client/catalog" class="px-8 py-3 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition inline-block animate-fade-in-up" style="animation-delay: 0.4s">
              {{ hero.ctaLabel }}
            </NuxtLink>
          </div>
      </div>

      <!-- Right: red container spans full; content inset to match header -->
      <div
        class="hero-right relative flex-1 min-h-[50vh] md:min-h-0 bg-[#8B0101] flex items-center justify-center md:justify-end overflow-hidden pl-5 sm:pl-6 lg:pl-8 xl:pl-12 pr-[max(1.25rem,calc((100vw-96rem)/2+1.25rem))] sm:pr-[max(1.5rem,calc((100vw-96rem)/2+1.5rem))] lg:pr-[max(2rem,calc((100vw-96rem)/2+2rem))] xl:pr-[max(3rem,calc((100vw-96rem)/2+3rem))]"
      >
          <!-- Vertical FRESHNESS - inside red container, white text, much bigger -->
          <div
            class="hero-freshness-strip absolute left-0 top-0 bottom-0 w-32 md:w-40 flex items-center justify-center bg-transparent animate-float"
            aria-hidden="true"
          >
            <span class="hero-freshness-text text-white font-bold tracking-[0.2em] select-none">FRESHNESS</span>
          </div>

          <!-- Large circular element: white ring, light blue inner, logo (overlaps strip) -->
          <div class="hero-circle-wrapper relative z-10 flex items-center justify-center w-full max-w-[min(58vw,220px)] aspect-square md:max-w-[min(48vw,440px)] md:-ml-10 lg:-ml-14 animate-bounce-slow">
            <div class="hero-circle-outer w-full h-full rounded-full border-10 md:border-[14px] border-white bg-[#ADD8E6]/95 shadow-2xl flex items-center justify-center p-4 md:p-6 animate-pulse-glow">
              <img
                src="/logo/delgar-logo.png"
                alt="Delgar Frozen Products"
                class="w-full h-full object-contain rounded-full"
              />
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="bg-white py-20">
      <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            {{ trust.title }} <span class="text-[#8B0101]">{{ trust.titleHighlight }}</span>
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            {{ trust.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div v-for="reason in trust.reasons" :key="reason.title" class="flex flex-col items-center text-center group cursor-pointer">
            <div class="mb-6 p-8 bg-blue-400 rounded-2xl group-hover:bg-blue-600 group-hover:scale-125 transition-all duration-300 shadow-lg">
              <Icon :name="reason.icon" class="w-16 h-16 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ reason.title }}</h3>
            <p class="text-gray-600">
              {{ reason.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="bg-gray-50 py-20">
      <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-2 h-10 bg-[#8B0101] rounded-md"></div>
            <span class="text-[#8B0101] font-semibold text-xl">{{ browseCategories.label }}</span>
          </div>
          <h2 class="text-4xl font-bold text-gray-900">{{ browseCategories.sectionTitle }}</h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <NuxtLink
            v-for="cat in browseCategories.items"
            :key="cat.id"
            :to="catalogCategoryUrl(cat)"
            class="group h-64 cursor-pointer perspective block"
          >
            <div class="relative w-full h-full transition-transform duration-500 transform-gpu hover:transform-[rotateY(180deg)]" style="transform-style: preserve-3d;">
              <div class="absolute w-full h-full bg-cover bg-center rounded-2xl overflow-hidden" style="backface-visibility: hidden;">
                <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/20"></div>
              </div>
              <div class="absolute w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center" style="backface-visibility: hidden; transform: rotateY(180deg);">
                <div class="text-center text-white">
                  <p class="text-sm font-semibold text-gray-300">{{ cat.backTitle }}</p>
                  <p class="text-xs text-gray-400">{{ cat.backSubtitle }}</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="catalog" class="py-20 bg-white">
      <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-2 h-10 bg-[#8B0101] rounded-md"></div>
            <span class="text-[#8B0101] font-semibold text-xl">{{ catalog.productsLabel }}</span>
          </div>
          <h2 class="text-4xl font-bold text-gray-900 mb-6">{{ catalog.sectionTitle }}</h2>

          <!-- Search Bar -->
          <div class="flex gap-4 max-w-lg">
            <input
              type="text"
              :placeholder="catalog.searchPlaceholder"
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0101]"
            />
            <button type="button" class="px-6 py-3 bg-[#8B0101] text-white rounded-lg hover:bg-[#6B0001] transition" @click="underConstruction">
              <Icon name="mdi:magnify" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <ClientProductCard
            v-for="product in catalog.products"
            :key="product.id"
            :product="{
              name: product.name,
              category: product.category,
              subcategory: product.subcategory,
              price: product.price,
              image: product.image,
              badge: product.category,
              categoryClass: product.categoryClass,
              inStock: true,
              stock: product.stock,
            }"
            :quantity="getQuantity(product.id)"
            :max-quantity="product.stock"
            :price-type="getPriceType(product.id)"
            :labels="{
              brandLabel: 'By Delgar',
              retailLabel: 'RETAIL',
              wholesaleLabel: 'WHOLESALE',
              addLabel: 'Add',
              inStockLabel: '1 in stock',
            }"
            @update:quantity="setQuantity(product.id, $event)"
            @update:price-type="setPriceType(product.id, $event)"
          />
        </div>

        <div class="text-center mt-12">
          <NuxtLink
            to="/client/catalog"
            class="inline-block px-8 py-3 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition shadow-md hover:shadow-lg"
          >
            {{ catalog.exploreMoreLabel }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="bg-gray-50 py-20">
      <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Logo Image -->
          <div class="flex items-center justify-center">
            <img src="/logo/delgar-logo.png" alt="About Delgar" class="w-full max-w-md rounded-lg shadow-lg object-cover" />
          </div>

          <!-- Content -->
          <div>
            <h2 class="text-4xl font-bold text-[#8B0101] mb-6">{{ about.title }}</h2>
            <div class="space-y-4 text-gray-700 leading-relaxed">
              <p v-for="(para, i) in about.paragraphs" :key="i">
                {{ para }}
              </p>
            </div>
            <div class="mt-8 flex items-center gap-4">
              <a v-for="social in about.socialLinks" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-300 transition shadow-sm" :aria-label="social.name">
                <Icon :name="social.icon" class="w-6 h-6" />
              </a>
            </div>
            <button type="button" class="mt-8 px-8 py-3 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition" @click="underConstruction">
              {{ about.ctaLabel }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="bg-white py-20">
      <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Left Side -->
          <div>
            <h2 class="text-4xl font-bold text-gray-900 mb-4">{{ contact.leftTitle }}</h2>
            <p class="text-gray-600 mb-8">{{ contact.leftSubtitle }}</p>
            <iframe
              :src="`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=17&output=embed`"
              width="100%"
              height="400"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Delgar Frozen Products - Ozamiz City location"
            ></iframe>
          </div>

          <!-- Right Side -->
          <div>
            <h2 class="text-4xl font-bold text-[#8B0101] mb-4">{{ contact.rightTitle }}</h2>
            <p class="text-gray-600 mb-8">{{ contact.rightSubtitle }}</p>
            <form class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <input type="text" :placeholder="contact.formPlaceholders.firstName" class="px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B0101] outline-none" />
                <input type="text" :placeholder="contact.formPlaceholders.lastName" class="px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B0101] outline-none" />
              </div>
              <input type="email" :placeholder="contact.formPlaceholders.email" class="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B0101] outline-none" />
              <input type="tel" :placeholder="contact.formPlaceholders.phone" class="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B0101] outline-none" />

              <div>
                <p class="text-gray-700 font-semibold mb-3">{{ contact.subjectLabel }}</p>
                <div class="flex flex-wrap gap-3">
                  <label v-for="(subj, idx) in contact.subjects" :key="subj" class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="subject" class="w-4 h-4" :checked="idx === 0" />
                    <span class="text-gray-700">{{ subj }}</span>
                  </label>
                </div>
              </div>

              <textarea :placeholder="contact.formPlaceholders.message" rows="5" class="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B0101] outline-none resize-none"></textarea>

              <button type="button" class="w-full py-3 bg-[#8B0101] text-white font-semibold rounded-lg hover:bg-[#6B0001] transition" @click="underConstruction">
                {{ contact.sendButtonLabel }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <ClientFooter />

    <ClientFab />

    <ClientLoginModal :model-value="showLoginModal" @update:model-value="updateLoginModal" @success="onLoginSuccess" />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700;800&display=swap");

/* Smooth scrolling for anchor links */
:global(html) {
  scroll-behavior: smooth;
}

/* 3D flip effect for category cards */
.perspective {
  perspective: 1000px;
}

/* Ensure 3D transforms work properly */
[style*="transform-style: preserve-3d"] {
  transform-style: preserve-3d;
}

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hero: main title - Roboto Condensed, big and bold */
.hero-title {
  font-family: "Roboto Condensed", sans-serif;
}

/* Hero: intro paragraph - Poppins */
.hero-intro {
  font-family: "Poppins", sans-serif;
}

/* Hero: vertical FRESHNESS text - Roboto Condensed, inside red, white, a lot bigger */
.hero-freshness-text {
  font-family: "Roboto Condensed", sans-serif;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  white-space: nowrap;
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  letter-spacing: 0.15em;
}

/* ===== HERO ANIMATIONS ===== */

/* Fade in from left */
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

/* Slide in from top */
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

/* Animation delays */
.animation-delay-100 {
  animation-delay: 0.1s !important;
}

.animation-delay-200 {
  animation-delay: 0.2s !important;
}

/* Fade in and up */
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

/* Float animation for FRESHNESS text */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* Bounce slow animation for circle */
@keyframes bounceSlowly {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bounce-slow {
  animation: bounceSlowly 3s ease-in-out infinite;
}

/* Pulse glow animation for circle */
@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(173, 216, 230, 0.6), 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  50% {
    box-shadow: 0 0 30px rgba(173, 216, 230, 0.9), 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
}

.animate-pulse-glow {
  animation: pulseGlow 2s ease-in-out infinite;
}

/* Slow spin animation for logo */
@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spinSlow 8s linear infinite;
}
</style>