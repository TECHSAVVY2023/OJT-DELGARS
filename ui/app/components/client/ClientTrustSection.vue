<script setup lang="ts">
interface TrustReason {
  icon: string;
  title: string;
  description: string;
}

defineProps<{
  title: string;
  titleHighlight: string;
  subtitle: string;
  reasons: TrustReason[];
}>();
</script>

<template>
  <section class="bg-white py-16 md:py-20">
    <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="text-center mb-10 md:mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
          {{ title }} <span class="text-[#8B0101]">{{ titleHighlight }}</span>
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        <div
          v-for="reason in reasons"
          :key="reason.title"
          class="group cursor-pointer rounded-3xl border border-gray-100 bg-white/70 p-5 md:p-7 shadow-sm hover:shadow-lg transition"
        >
          <div class="flex items-start gap-4 md:flex-col md:items-center">
            <div class="shrink-0 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-linear-to-br from-[#8B0101] to-[#B20000] text-white shadow-md">
              <Icon :name="reason.icon" class="w-7 h-7 md:w-8 md:h-8" />
            </div>

            <div class="flex-1 text-left md:text-center">
              <h3 class="text-lg md:text-xl font-semibold text-gray-900">
                {{ reason.title }}
              </h3>
              <p class="mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
                {{ reason.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
