<script setup lang="ts">
import { ref } from "vue";
import { useLandingData } from "~/composables/useLandingData";
import { useToast } from "~/composables/useToast";


const { fab } = useLandingData();
const { info: toastInfo } = useToast();
const fabOpen = ref(false);

const toggleFab = () => {
  fabOpen.value = !fabOpen.value;
};


function underConstruction() {
  toastInfo("Under construction");
}

const handleLogout = () => {
  underConstruction();
};
</script>

<template>
  <!-- Floating Action Button (FAB) -->
  <div class="fixed bottom-6 right-6 z-40">
    <!-- FAB Main Button -->
    <button
      @click="toggleFab"
      class="w-16 h-16 bg-[#8B0101] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 relative group"
    >
      <Icon name="mdi:plus" :class="['w-6 h-6 transition-transform duration-300', fabOpen ? 'rotate-45' : '']" />
    </button>

    <!-- FAB Icons - Appear when open -->
    <transition
      enter-active-class="transition-all duration-300"
      leave-active-class="transition-all duration-300"
      enter-from-class="opacity-0 scale-0"
      leave-to-class="opacity-0 scale-0"
    >
      <div v-if="fabOpen" class="absolute bottom-20 right-0 flex flex-col gap-3">

        <!-- Profile Icon -->
        <button
          type="button"
          class="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center hover:scale-110 transform origin-bottom-right"
          :title="fab.profileTitle"
          @click="underConstruction"
        >
          <Icon name="mdi:account" class="w-6 h-6" />
        </button>

        <!-- Logout Icon -->
        <button
          type="button"
          class="w-14 h-14 bg-gray-400 text-white rounded-full shadow-lg transition-all duration-200 flex items-center justify-center hover:bg-gray-500 hover:scale-110 transform origin-bottom-right"
          :title="fab.logoutTitle"
          @click="handleLogout"
        >
          <Icon name="mdi:logout" class="w-6 h-6" />
        </button>
      </div>
    </transition>
  </div>
</template>

