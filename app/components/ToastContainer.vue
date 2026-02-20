<script setup lang="ts">
import { useToast } from "~/composables/useToast";

const { toasts, removeToast } = useToast();
</script>

<template>
  <div class="fixed top-6 right-6 z-9999 space-y-3 pointer-events-none">
    <TransitionGroup name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'pointer-events-auto flex items-center gap-4 rounded-xl px-6 py-5 shadow-lg backdrop-blur-sm border animate-slide-in w-88 max-w-[calc(100vw-3rem)]',
          {
            'bg-green-50 border-green-200 text-green-900': toast.type === 'success',
            'bg-red-50 border-red-200 text-red-900': toast.type === 'error',
            'bg-blue-50 border-blue-200 text-blue-900': toast.type === 'info',
            'bg-yellow-50 border-yellow-200 text-yellow-900': toast.type === 'warning',
          },
        ]"
      >
        <div class="flex items-center gap-3 flex-1">
          <div
            :class="[
              'shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm',
              {
                'bg-green-500 text-white': toast.type === 'success',
                'bg-red-500 text-white': toast.type === 'error',
                'bg-blue-500 text-white': toast.type === 'info',
                'bg-yellow-500 text-white': toast.type === 'warning',
              },
            ]"
          >
            <svg
              v-if="toast.type === 'success'"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else-if="toast.type === 'error'"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else-if="toast.type === 'info'"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else-if="toast.type === 'warning'"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div class="flex flex-col gap-1">
            <p class="font-semibold text-base leading-snug">
              {{ toast.message }}
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="removeToast(toast.id)"
          class="shrink-0 w-7 h-7 rounded-full hover:bg-black/10 flex items-center justify-center transition"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.toast-move {
  transition: transform 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}
</style>

