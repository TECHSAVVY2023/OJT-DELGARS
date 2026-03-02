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
  <section class="bg-white py-20">
    <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
          {{ title }} <span class="text-[#8B0101]">{{ titleHighlight }}</span>
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        <div
          v-for="reason in reasons"
          :key="reason.title"
          class="flex flex-col items-center text-center group cursor-pointer"
        >
          <div
            class="mb-6 p-8 bg-blue-400 rounded-2xl group-hover:bg-blue-600 group-hover:scale-125 transition-all duration-300 shadow-lg"
          >
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
</template>
