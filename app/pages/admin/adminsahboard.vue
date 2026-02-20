<script setup lang="ts">
import { ref, computed } from "vue";
import { useToast } from "~/composables/useToast";
import { useDashboardData } from "~/composables/useDashboardData";

const selectedTimeframe = ref("1Y");

const { success, info } = useToast();
const { dashboard } = useDashboardData();

const stats = computed(() => dashboard.value.stats);
const timeframes = computed(() => dashboard.value.timeframes);
const yAxisLabels = computed(() => dashboard.value.yAxisLabels);
const stockChartData = computed(() => dashboard.value.stockChartData);
const maxStock = computed(() => dashboard.value.maxStock);
const lowStockProducts = computed(() => dashboard.value.lowStockProducts);
const expiringSoonProducts = computed(() => dashboard.value.expiringSoonProducts);
const outOfStockProducts = computed(() => dashboard.value.outOfStockProducts);
const productOverview = computed(() => dashboard.value.productOverview);

const currentStocks = computed(() => {
  return stockChartData.value[selectedTimeframe.value] || stockChartData.value["1Y"];
});

const barHeight = (value: number) => {
  const clamped = Math.min(value, maxStock.value);
  return `${(clamped / maxStock.value) * 100}%`;
};

</script>

<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 overflow-auto">
        <div class="p-8">
          <div class="flex items-start justify-between mb-8">
            <div>
              <h1 class="text-4xl font-bold text-gray-900 mb-2">Welcome, Admin</h1>
              <p class="text-gray-600">
                You have <span class="font-semibold">200+</span> Orders, Today
              </p>
            </div>
            <div class="text-right flex items-center gap-2 text-sm text-gray-600">
              <Icon name="mdi:calendar-blank" class="w-4 h-4" />
              <p>01 Jan 2024 · 07 Jan 2024</p>
            </div>
          </div>

          <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start justify-between">
            <div class="flex items-start gap-3">
              <Icon name="mdi:alert-circle" class="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <p class="text-sm text-gray-900">
                  Your product boneless bangus is running low, already below 5 Pcs.
                  <span class="text-red-600 font-semibold cursor-pointer hover:underline">
                    Add Stock
                  </span>
                </p>
              </div>
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <div class="grid grid-cols-4 gap-6 mb-8">
            <div
              v-for="stat in stats"
              :key="stat.label"
              :class="['rounded-xl p-6 text-white', `bg-linear-to-br ${stat.color}`]"
            >
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-sm opacity-90 mb-2">{{ stat.label }}</p>
                  <p class="text-4xl font-bold">{{ stat.value }}</p>
                </div>
                <Icon :name="stat.icon" class="w-8 h-8" />
              </div>
            </div>
          </div>

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
                <span v-for="label in yAxisLabels" :key="label">
                  {{ label }}
                </span>
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
                  <p class="text-xs text-gray-500 mt-2">
                    P{{ index + 1 }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div class="flex items-center justify-between mb-6">
                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                  <Icon name="mdi:alert-circle" class="w-5 h-5 text-orange-500" />
                  Low Stock Products
                </h3>
                <NuxtLink to="/admin/low-stocks" class="text-sm text-[#8B0101] hover:underline font-medium">View All</NuxtLink>
              </div>
              <div class="space-y-4">
                <div v-for="product in lowStockProducts" :key="product.id" class="flex items-center gap-3">
                  <span class="text-3xl">{{ product.img }}</span>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                    <p class="text-xs text-gray-500">ID: {{ product.id }}</p>
                  </div>
                  <p class="text-sm font-semibold text-orange-600">{{ product.instock }}</p>
                  <p class="text-xs text-gray-500">Instock</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div class="flex items-center justify-between mb-6">
                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                  <Icon name="mdi:clock-alert" class="w-5 h-5 text-blue-500" />
                  Expiring Soon
                </h3>
                <NuxtLink to="/admin/expired" class="text-sm text-[#8B0101] hover:underline font-medium">View All</NuxtLink>
              </div>
              <div class="space-y-4">
                <div v-for="product in expiringSoonProducts" :key="product.id" class="flex items-center gap-3">
                  <span class="text-3xl">{{ product.img }}</span>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                    <p class="text-xs text-gray-500">ID: {{ product.id }}</p>
                  </div>
                  <p class="text-sm font-semibold text-orange-600">{{ product.quantity }}</p>
                  <p class="text-xs text-gray-500">Quantity</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div class="flex items-center justify-between mb-6">
                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                  <Icon name="mdi:close-circle" class="w-5 h-5 text-red-500" />
                  Out of Stock
                </h3>
                <NuxtLink to="/admin/products" class="text-sm text-[#8B0101] hover:underline font-medium">View All</NuxtLink>
              </div>
              <div class="space-y-4">
                <div v-for="product in outOfStockProducts" :key="product.id" class="flex items-center gap-3">
                  <span class="text-3xl">{{ product.img }}</span>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                    <p class="text-xs text-gray-500">ID: {{ product.id }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div class="flex items-center justify-between mb-6">
                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                  <Icon name="mdi:format-list-bulleted" class="w-5 h-5 text-amber-500" />
                  Product Overview
                </h3>
                <NuxtLink to="/admin/products" class="text-sm text-[#8B0101] hover:underline font-medium">View All</NuxtLink>
              </div>
              <div class="space-y-4">
                <div v-for="product in productOverview" :key="product.id" class="flex items-center gap-3">
                  <span class="text-3xl">{{ product.img }}</span>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                    <p class="text-xs text-gray-500">ID: {{ product.id }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;800&display=swap");
</style>