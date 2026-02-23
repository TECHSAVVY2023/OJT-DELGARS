<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "~/composables/useToast";

const route = useRoute();
const { success } = useToast();

const pageTitle = computed(() => {
  const path = (route.params.path as string[]) || [];
  if (path.length === 0) return "Under Construction";
  const last = path[path.length - 1];
  if (!last) return "Under Construction";
  const titles: Record<string, string> = {
    "super-admin": "Super Admin",
    adjustment: "Stock Adjustment",
    transfer: "Stock Transfer",
  };
  return titles[last] || last.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
});

</script>

<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <UnderConstruction :title="pageTitle" />
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>
