<template>
  <Transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-9999 flex items-center justify-center bg-[#FEFEFE]"
    >
      <div class="flex flex-col items-center gap-8">
        <div class="relative w-32 h-32 flex items-center justify-center">
          <svg
            class="absolute w-full h-full animate-spin"
            style="animation-duration: 2s;"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              stroke-width="2"
              class="text-[#B32134]"
              stroke-linecap="round"
              stroke-dasharray="80 160"
            />
          </svg>

          <svg
            class="absolute w-full h-full"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 30 40 Q 20 30, 15 15"
              stroke="currentColor"
              stroke-width="2.5"
              class="text-[#B32134]/40"
              stroke-linecap="round"
            />
            <path
              d="M 90 80 Q 100 90, 105 105"
              stroke="currentColor"
              stroke-width="2.5"
              class="text-[#B32134]/40"
              stroke-linecap="round"
            />
          </svg>

          <svg
            class="w-12 h-12 relative z-10 text-[#B32134]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 6 4 L 6 10 M 18 4 L 18 10 M 6 4 L 12 8 L 18 4 M 6 4 L 12 1 L 18 4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
            <path
              d="M 12 8 L 12 20 M 6 10 L 12 14 L 18 10 M 6 10 L 6 16 M 18 10 L 18 16"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
            <path
              d="M 6 4 L 12 8 L 18 4 L 12 1 Z"
              fill="currentColor"
              opacity="0.2"
            />
          </svg>
        </div>

        <div class="flex flex-col items-center gap-3">
          <h2 class="text-2xl font-semibold text-[#373737] tracking-tight">
            Loading<span class="inline-flex gap-1 ml-1"
              ><span class="animate-bounce" style="animation-delay: 0s;">.</span
              ><span class="animate-bounce" style="animation-delay: 0.1s;">.</span
              ><span class="animate-bounce" style="animation-delay: 0.2s;">.</span></span
            >
          </h2>
          <p class="text-sm text-[#373737] text-center max-w-xs leading-relaxed">
            {{ message }}
          </p>
        </div>

        <div class="flex gap-2 mt-4">
          <div class="w-2 h-2 rounded-full bg-[#B32134] animate-pulse" />
          <div class="w-2 h-2 rounded-full bg-[#B32134] animate-pulse" style="animation-delay: 0.1s;" />
          <div class="w-2 h-2 rounded-full bg-[#B32134] animate-pulse" style="animation-delay: 0.2s;" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  isLoading?: boolean;
  message?: string;
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
  message: "Please wait while the page is being loaded.",
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
