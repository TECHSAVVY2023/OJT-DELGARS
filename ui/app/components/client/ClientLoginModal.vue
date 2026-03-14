<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { useToast } from "~/composables/useToast";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  success: [];
}>();

const { info: toastInfo } = useToast();
const email = ref("");
const password = ref("");

const close = () => {
  emit("update:modelValue", false);
};

const handleLogin = async () => {
  emit("success");
  emit("update:modelValue", false);
};

function underConstruction() {
  toastInfo("Under construction");
}

const handleSignup = () => {
  underConstruction();
  emit("update:modelValue", false);
};

const handleForgotPassword = () => {
  underConstruction();
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.modelValue) close();
};

watch(
  () => props.modelValue,
  (open) => {
    if (import.meta.client) {
      document.documentElement.style.overflow = open ? "hidden" : "";
      window.removeEventListener("keydown", onKeyDown);
      if (open) window.addEventListener("keydown", onKeyDown);
    }
  }
);

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.documentElement.style.overflow = "";
    window.removeEventListener("keydown", onKeyDown);
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-backdrop" appear>
      <div
        v-if="modelValue"
        class="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
        @click.self="close"
      >
        <Transition name="modal-panel" appear>
          <div
            v-if="modelValue"
            class="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-white"
            role="dialog"
            aria-modal="true"
            aria-label="Login"
          >
            <button
              type="button"
              class="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-700 backdrop-blur hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0101]"
              @click="close"
            >
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div class="flex flex-col bg-white md:flex-row">
              <div class="flex w-full flex-col justify-between bg-white p-5 sm:p-6 md:w-5/12 md:p-10">
                <div>
                  <div class="mb-6 sm:mb-8 md:mb-10 flex items-center justify-center">
                    <div
                      class="flex h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-lg"
                    >
                      <img
                        src="/logo/delgar-logo.png"
                        alt="Delgar Frozen Products logo"
                        class="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div class="mb-6 sm:mb-8 md:mb-10 text-center">
                    <h1 class="font-roboto-condensed mb-2 text-2xl sm:text-3xl md:text-4xl font-black text-[#8B0101]">
                      Delgar
                    </h1>
                    <h2 class="font-roboto-condensed text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
                      Frozen Products
                    </h2>
                  </div>

                  <div class="mx-auto w-full max-w-xs sm:max-w-sm">
                    <h3 class="mb-6 sm:mb-8 text-center text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                      Login into your account
                    </h3>

                    <div class="mb-5 sm:mb-6">
                      <label class="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-gray-700">Email Address</label>
                      <div class="flex items-center">
                        <input
                          v-model="email"
                          type="email"
                          placeholder="alex@email.com"
                          class="flex-1 rounded-l-lg bg-gray-100 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-700 placeholder-gray-500 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0101]"
                        />
                        <button
                          type="button"
                          class="flex items-center justify-center rounded-r-lg bg-[#8B0101] px-3 sm:px-4 py-2.5 sm:py-3 text-white transition hover:bg-[#6B0001]"
                        >
                          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="mb-2">
                      <label class="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-gray-700">Password</label>
                      <div class="flex items-center">
                        <input
                          v-model="password"
                          type="password"
                          placeholder="Enter your password"
                          class="flex-1 rounded-l-lg bg-gray-100 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-700 placeholder-gray-500 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0101]"
                        />
                        <button
                          type="button"
                          class="flex items-center justify-center rounded-r-lg bg-[#8B0101] px-3 sm:px-4 py-2.5 sm:py-3 text-white transition hover:bg-[#6B0001]"
                        >
                          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="mb-6 text-right">
                      <button
                        type="button"
                        @click="handleForgotPassword"
                        class="text-xs sm:text-sm font-medium text-gray-700 transition hover:text-[#8B0101]"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <button
                      type="button"
                      @click="handleLogin"
                      class="mb-5 sm:mb-6 w-full rounded-lg bg-[#8B0101] px-4 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-white shadow-md transition active:scale-95 hover:bg-[#6B0001] hover:shadow-lg"
                    >
                      Login Now
                    </button>

                    <div class="mb-6 flex items-center gap-4">
                      <div class="h-px flex-1 bg-gray-300" />
                      <span class="text-sm font-medium text-gray-400">OR</span>
                      <div class="h-px flex-1 bg-gray-300" />
                    </div>

                    <button
                      type="button"
                      @click="handleSignup"
                      class="w-full rounded-lg border-2 border-[#8B0101] px-4 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-[#8B0101] transition active:scale-95 hover:bg-[#8B0101] hover:text-white"
                    >
                      Signup Now
                    </button>
                  </div>
                </div>

                <div class="mt-6 sm:mt-8 text-center text-[10px] sm:text-xs text-gray-500 md:mt-0">
                  <p>&copy; 2024 Delgar Frozen Products. All rights reserved.</p>
                </div>
              </div>

              <div class="relative flex w-full items-center justify-center overflow-hidden bg-linear-to-br from-[#D4C5B9] via-[#DFD3C8] to-[#E8DCD0] p-6 sm:p-8 md:w-7/12 md:p-12">
                <div class="absolute inset-0 overflow-hidden pointer-events-none">
                  <div class="absolute top-10 left-10 w-20 h-20 bg-[#B32134]/10 rounded-full blur-2xl animate-pulse" />
                  <div class="absolute bottom-20 right-10 w-32 h-32 bg-[#B32134]/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 0.5s;" />
                  <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-300/10 rounded-full blur-2xl animate-pulse" style="animation-delay: 1s;" />
                </div>

                <div class="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
                  <div class="relative">
                    <div class="absolute -inset-4 bg-linear-to-r from-[#B32134]/20 to-transparent rounded-full blur-xl animate-pulse" />
                    <div
                      class="relative flex h-56 w-56 sm:h-64 sm:w-64 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-2xl md:h-80 md:w-80 hover:shadow-3xl transition-shadow duration-300"
                    >
                      <img
                        src="/logo/delgar-logo.png"
                        alt="Delgar Frozen Products logo"
                        class="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div class="relative flex gap-4">
                    <div class="w-3 h-3 rounded-full bg-[#B32134] animate-bounce" style="animation-delay: 0s;" />
                    <div class="w-3 h-3 rounded-full bg-[#B32134] animate-bounce" style="animation-delay: 0.2s;" />
                    <div class="w-3 h-3 rounded-full bg-[#B32134] animate-bounce" style="animation-delay: 0.4s;" />
                  </div>

                  <p class="text-center text-sm font-medium text-gray-600 max-w-xs">
                    Premium Frozen Products
                  </p>

                  <div class="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-96">
                    <div class="absolute inset-0 bg-linear-to-t from-[#B32134]/5 to-transparent rounded-full blur-3xl animate-pulse" style="animation-duration: 4s;" />
                  </div>

                  <svg class="absolute top-1/4 -left-12 w-24 h-24 text-[#B32134]/20 animate-float" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                  </svg>

                  <svg class="absolute bottom-1/3 -right-8 w-20 h-20 text-[#B32134]/15 animate-float" style="animation-delay: 1s;" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-panel-enter-active {
  transition:
    transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 0.28s ease;
}

.modal-panel-leave-active {
  transition:
    transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.22s ease;
}

.modal-panel-enter-from,
.modal-panel-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.985);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
