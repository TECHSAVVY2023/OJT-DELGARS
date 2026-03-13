<script setup lang="ts">
import { ref, computed } from "vue";
import { useDashboardData } from "~/composables/useDashboardData";

const selectedTimeframe = ref("1Y");
const { dashboard } = useDashboardData();

const timeframes = computed(() => dashboard.value.timeframes);
const yAxisLabels = computed(() => dashboard.value.yAxisLabels);
const maxStock = computed(() => dashboard.value.maxStock);

const currentStocks = computed(() => {
  return (
    dashboard.value.stockChartData[selectedTimeframe.value] ||
    dashboard.value.stockChartData["1Y"]
  );
});

const barHeight = (value: number) => {
  const clamped = Math.min(value, maxStock.value);
  return `${(clamped / maxStock.value) * 100}%`;
};
</script>

<template>
  <div class="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Icon name="mdi:chart-line" class="w-5 h-5" />
        Stocks Status Overview
      </h2>
      <div class="flex gap-2">
        <button
          v-for="tf in timeframes"
          :key="tf"
          @click="selectedTimeframe = tf"
          :class="[
            'px-3 py-1 rounded text-sm font-medium transition',
            selectedTimeframe === tf
              ? 'bg-[#8B0101] text-white'
              : 'text-gray-600 hover:bg-gray-100',
          ]"
        >
          {{ tf }}
        </button>
      </div>
    </div>

    <div class="h-96 flex gap-4 px-4">
      <div class="flex flex-col justify-between text-xs text-gray-400 pb-8">
        <span v-for="label in yAxisLabels" :key="label">{{ label }}</span>
      </div>
      <div class="flex-1 flex items-end justify-between gap-2">
        <div
          v-for="(value, index) in currentStocks"
          :key="index"
          class="flex-1 flex flex-col items-center"
        >
          <div class="w-full flex items-end justify-center h-80">
            <div
              :style="{ height: barHeight(value) }"
              class="w-3 sm:w-4 rounded-t-md bg-[#8B0101] transition-all duration-300"
            />
          </div>
          <p class="text-xs text-gray-500 mt-2">P{{ index + 1 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
