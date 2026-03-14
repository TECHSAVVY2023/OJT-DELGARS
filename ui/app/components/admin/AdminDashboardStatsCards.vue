<script setup lang="ts">
import { computed } from "vue";
import { useDashboardData } from "~/composables/useDashboardData";
import { useLowStocksData } from "~/composables/useLowStocksData";

const { dashboard } = useDashboardData();
const { lowStockItems } = useLowStocksData();

const lowStockCount = computed(() => lowStockItems.value.length);

const stats = computed(() => {
  const base = dashboard.value.stats;
  return base.map((s) =>
    s.label === "Low Stock Items"
      ? { ...s, value: String(lowStockCount.value) }
      : s
  );
});

const statLink = (label: string) => {
  if (label === "Total Products") return "/admin/products";
  if (label === "Total Stock Quantity") return "/admin/stock";
  if (label === "Low Stock Items") return "/admin/stock?stockFilter=low";
  if (label === "Expiring Soon") return "/admin/products?expiredFilter=expired";
  return "#";
};
</script>

<template>
  <div class="grid grid-cols-4 gap-6 mb-8">
    <NuxtLink
      v-for="stat in stats"
      :key="stat.label"
      :to="statLink(stat.label)"
      :class="['rounded-xl p-6 text-white block transition hover:opacity-95', `bg-linear-to-br ${stat.color}`]"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm opacity-90 mb-2">{{ stat.label }}</p>
          <p class="text-4xl font-bold">{{ stat.value }}</p>
        </div>
        <Icon :name="stat.icon" class="w-8 h-8" />
      </div>
    </NuxtLink>
  </div>
</template>
