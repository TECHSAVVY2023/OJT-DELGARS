<script setup lang="ts">
import { computed } from "vue";
import { useLandingData } from "~/composables/useLandingData";
import { useToast } from "~/composables/useToast";

const route = useRoute();
const { footer } = useLandingData();
const { info: toastInfo } = useToast();
function underConstruction() {
  toastInfo("Under construction");
}
const isLandingPage = computed(() => route.path === "/client/landing" || route.path === "/");

/** Hash links (About, Contact) go to landing + hash when not on landing. */
function linkTo(link: { href: string }) {
  if (!link.href.startsWith("#")) return link.href;
  return isLandingPage.value ? link.href : `/client/landing${link.href}`;
}
</script>

<template>
  <footer class="bg-[#8B0101] text-white py-8 sm:py-12">
    <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-red-700">
        <!-- Contact -->
        <div>
          <h3 class="text-base sm:text-lg font-bold mb-3 sm:mb-4">{{ footer.reachTitle }}</h3>
          <div class="space-y-1 sm:space-y-2 text-gray-200 text-sm sm:text-base">
            <p class="flex items-center gap-2">
              <Icon name="mdi:phone" class="w-4 h-4 sm:w-5 sm:h-5 text-gray-200" />
              {{ footer.phone }}
            </p>
            <p>{{ footer.email }}</p>
            <p class="text-xs sm:text-sm">
              {{ footer.address }}
            </p>
          </div>
        </div>

        <!-- Company -->
        <div>
          <h3 class="text-base sm:text-lg font-bold mb-3 sm:mb-4">{{ footer.companyTitle }}</h3>
          <ul class="space-y-1 sm:space-y-2 text-gray-200 text-sm sm:text-base">
            <li v-for="link in footer.companyLinks" :key="link.href">
              <NuxtLink
                :to="linkTo(link)"
                class="hover:text-white transition"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="bg-gray-900 p-3 sm:p-4 rounded-lg">
          <h3 class="text-base sm:text-lg font-bold mb-2 sm:mb-3">{{ footer.newsletterTitle }}</h3>
          <input
            type="email"
            :placeholder="footer.newsletterPlaceholder"
            class="w-full px-3 py-2 bg-gray-800 rounded text-white placeholder-gray-500 mb-3 outline-none focus:bg-gray-700 transition text-sm sm:text-base"
          />
          <button
            type="button"
            class="w-full py-2 bg-blue-500 hover:bg-blue-600 transition rounded font-semibold text-sm sm:text-base"
            @click="underConstruction"
          >
            {{ footer.newsletterButton }}
          </button>
          <p class="text-xs text-gray-400 mt-2">
            {{ footer.newsletterNote }}
          </p>
        </div>
      </div>

      <div class="text-center text-gray-200 text-xs sm:text-sm">
        <p>{{ footer.copyright }}</p>
      </div>
    </div>
  </footer>
</template>