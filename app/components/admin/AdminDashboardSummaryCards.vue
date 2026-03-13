<script setup lang="ts">
import { computed } from "vue";
import { useDashboardData } from "~/composables/useDashboardData";
import { useLowStocksData } from "~/composables/useLowStocksData";

const { dashboard } = useDashboardData();
const { lowStockItems } = useLowStocksData();

const lowStockProducts = computed(() =>
  lowStockItems.value.map((item) => ({
    name: item.name,
    id: item.id,
    instock: String(item.currentStock),
    img: "🦐",
  }))
);

const expiringSoonProducts = computed(() => dashboard.value.expiringSoonProducts);
const outOfStockProducts = computed(() => dashboard.value.outOfStockProducts);
const productOverview = computed(() => dashboard.value.productOverview);
</script>

<template>
  <div class="grid grid-cols-4 gap-6">
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-semibold text-gray-900 flex items-center gap-2">
          <Icon name="mdi:alert-circle" class="w-5 h-5 text-orange-500" />
          Low Stock Products
        </h3>
        <NuxtLink to="/admin/stock?stockFilter=low" class="text-sm text-[#8B0101] hover:underline font-medium">View All</NuxtLink>
      </div>
      <div class="space-y-4">
        <NuxtLink
          v-for="product in lowStockProducts.slice(0, 2)"
          :key="product.id"
          to="/admin/stock?stockFilter=low"
          class="flex items-center gap-3 rounded-lg p-2 -m-2 hover:bg-gray-50 transition"
        >
          <span class="text-3xl">{{ product.img }}</span>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
            <p class="text-xs text-gray-500">ID: {{ product.id }}</p>
          </div>
          <p class="text-sm font-semibold text-orange-600">{{ product.instock }}</p>
          <p class="text-xs text-gray-500">Instock</p>
        </NuxtLink>
      </div>
    </div>

    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-semibold text-gray-900 flex items-center gap-2">
          <Icon name="mdi:clock-alert" class="w-5 h-5 text-blue-500" />
          Expiring Soon
        </h3>
        <NuxtLink to="/admin/products?expiredFilter=expired" class="text-sm text-[#8B0101] hover:underline font-medium">View All</NuxtLink>
      </div>
      <div class="space-y-4">
        <NuxtLink
          v-for="product in expiringSoonProducts.slice(0, 2)"
          :key="product.id"
          to="/admin/products?expiredFilter=expired"
          class="flex items-center gap-3 rounded-lg p-2 -m-2 hover:bg-gray-50 transition"
        >
          <span class="text-3xl">{{ product.img }}</span>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
            <p class="text-xs text-gray-500">ID: {{ product.id }}</p>
          </div>
          <p class="text-sm font-semibold text-orange-600">{{ product.quantity }}</p>
          <p class="text-xs text-gray-500">Quantity</p>
        </NuxtLink>
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
        <NuxtLink
          v-for="product in outOfStockProducts.slice(0, 2)"
          :key="product.id"
          to="/admin/products"
          class="flex items-center gap-3 rounded-lg p-2 -m-2 hover:bg-gray-50 transition"
        >
          <span class="text-3xl">{{ product.img }}</span>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
            <p class="text-xs text-gray-500">ID: {{ product.id }}</p>
          </div>
        </NuxtLink>
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
        <NuxtLink
          v-for="product in productOverview.slice(0, 2)"
          :key="product.id"
          to="/admin/products"
          class="flex items-center gap-3 rounded-lg p-2 -m-2 hover:bg-gray-50 transition"
        >
          <span class="text-3xl">{{ product.img }}</span>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
            <p class="text-xs text-gray-500">ID: {{ product.id }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
