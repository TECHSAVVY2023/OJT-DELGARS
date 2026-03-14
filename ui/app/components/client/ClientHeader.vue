<script setup lang="ts">
import { ref, computed } from "vue";
import { useLandingData } from "~/composables/useLandingData";
import { useClientLoginModal } from "~/composables/useClientLoginModal";

const route = useRoute();
const { site, nav, browseCategories } = useLandingData();
const { openLogin } = useClientLoginModal();

const mobileMenuOpen = ref(false);
const isLandingPage = computed(() => route.path === "/client/landing" || route.path === "/");

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

function scrollToSection(href: string) {
  if (typeof href !== "string" || !href.startsWith("#")) return;
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  mobileMenuOpen.value = false;
}

/** For hash links (Contact, About): go to landing + hash when not on landing, else scroll in place. */
function linkTo(link: { href: string }) {
  if (!link.href.startsWith("#")) return link.href;
  return isLandingPage.value ? link.href : `/client/landing${link.href}`;
}

function onNavLinkClick(link: { href: string }, e: MouseEvent) {
  if (link.href.startsWith("#") && isLandingPage.value) {
    e.preventDefault();
    scrollToSection(link.href);
  }
}
</script>

<template>
  <!-- Navigation Bar - wider span, more spacing -->
  <nav class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-384 w-full mx-auto px-5 sm:px-6 lg:px-8 xl:px-12">
      <div class="flex items-center justify-between h-16">
        <!-- Logo - always links to landing -->
        <NuxtLink to="/client/landing" class="flex items-center gap-3">
          <img src="/logo/delgar-logo.png" :alt="site.logoAlt" class="h-10 w-10 rounded-full object-cover" />
          <div>
            <h1 class="text-lg font-bold text-gray-900">{{ site.brandName }}</h1>
            <p class="text-xs text-gray-500">{{ site.tagline }}</p>
          </div>
        </NuxtLink>

        <!-- Menu Items - Hidden on Mobile -->
        <div class="hidden md:flex items-center gap-10 xl:gap-12">
          <!-- First two links (Home, Catalog) -->
          <template v-for="link in nav.mainLinks.slice(0, 2)" :key="link.href">
            <NuxtLink
              :to="linkTo(link)"
              class="text-gray-700 hover:text-[#8B0101] font-medium transition"
              @click="onNavLinkClick(link, $event)"
            >
              {{ link.label }}
            </NuxtLink>
          </template>

          <!-- Categories Dropdown -->
          <div class="relative group">
            <button class="text-gray-700 hover:text-[#8B0101] font-medium transition flex items-center gap-1">
              {{ browseCategories.label }}
              <Icon name="mdi:chevron-down" class="w-4 h-4 group-hover:rotate-180 transition" />
            </button>
            <div
              class="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2"
            >
              <NuxtLink
                v-for="(cat, idx) in nav.categoryLinks"
                :key="cat.label"
                :to="cat.href"
                :class="[
                  'block px-4 py-2 text-gray-700 hover:bg-gray-50',
                  idx === 0 ? 'first:rounded-t-lg' : '',
                  idx === nav.categoryLinks.length - 1 ? 'last:rounded-b-lg' : '',
                ]"
              >
                {{ cat.label }}
              </NuxtLink>
            </div>
          </div>

          <!-- Remaining links (Contact, About) - from catalog go to home and scroll to section -->
          <template v-for="link in nav.mainLinks.slice(2)" :key="link.href">
            <NuxtLink
              :to="linkTo(link)"
              class="text-gray-700 hover:text-[#8B0101] font-medium transition"
              @click="onNavLinkClick(link, $event)"
            >
              {{ link.label }}
            </NuxtLink>
          </template>
        </div>

        <!-- Hamburger Menu - Visible on Mobile -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden flex flex-col gap-1.5 w-8 h-8 relative focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            :class="[
              'h-0.5 w-full bg-gray-900 transition-all duration-300',
              mobileMenuOpen ? 'rotate-45 translate-y-2' : '',
            ]"
          />
          <span
            :class="[
              'h-0.5 w-full bg-gray-900 transition-all duration-300',
              mobileMenuOpen ? 'opacity-0' : '',
            ]"
          />
          <span
            :class="[
              'h-0.5 w-full bg-gray-900 transition-all duration-300',
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : '',
            ]"
          />
        </button>

        <!-- Login Button -->
        <button type="button" class="hidden sm:block px-6 py-2 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition" @click="openLogin">
          {{ nav.loginLabel }}
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition-all duration-300"
        leave-active-class="transition-all duration-300"
        enter-from-class="opacity-0 -translate-y-2"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="md:hidden pb-4 space-y-2">
          <template v-for="link in nav.mainLinks" :key="link.href">
            <NuxtLink
              :to="linkTo(link)"
              class="block px-4 py-2 text-gray-700 hover:text-[#8B0101] hover:bg-gray-50 rounded transition"
              @click="onNavLinkClick(link, $event); mobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </template>
          <div class="border-t border-gray-200 pt-2 mt-2">
            <p class="px-4 py-1 text-xs text-gray-500 font-semibold">
              {{ browseCategories.label }}
            </p>
            <NuxtLink
              v-for="cat in nav.categoryLinks"
              :key="cat.label"
              :to="cat.href"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded transition text-sm"
              @click="mobileMenuOpen = false"
            >
              {{ cat.label }}
            </NuxtLink>
          </div>
          <div class="border-t border-gray-200 pt-2 mt-2 px-4">
            <button type="button" class="w-full px-6 py-2 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition" @click="openLogin">
              {{ nav.loginLabel }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

