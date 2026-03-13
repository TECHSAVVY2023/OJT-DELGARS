<script setup lang="ts">
const route = useRoute();
const { sidebarOpen } = useAdminSidebar();
const { success } = useToast();

const isDashboardPage = computed(() => route.path === "/admin/adminsahboard");
const isStockPage = computed(() => route.path === "/admin/stock");
const isCreatePage = computed(() => route.path === "/admin/create");
const isProductsPage = computed(() => route.path === "/admin/products");
const isCategoryPage = computed(() => route.path === "/admin/category");
const isActivityLogsPage = computed(() => route.path === "/admin/activity-logs");
const activeLinkClass = (isActive: boolean) =>
  isActive ? "font-medium text-[#8B0101] bg-red-50" : "text-gray-600 hover:bg-gray-50";

const handleLogout = async () => {
  success("Logged out successfully!");
  await navigateTo("/");
};
</script>

<template>
  <aside
    :class="[
      'bg-white border-r border-gray-200 transition-all duration-300 flex flex-col',
      sidebarOpen ? 'w-52' : 'w-20',
    ]"
  >
    <div class="p-6 border-b border-gray-200">
      <NuxtLink to="/admin/adminsahboard" class="flex items-center gap-3" :class="{ 'justify-center': !sidebarOpen }">
        <div class="w-10 h-10 shrink-0 bg-linear-to-br from-red-500 to-red-600 rounded-full overflow-hidden flex items-center justify-center text-white font-bold">
          <img src="/logo/delgar-logo.png" alt="Delgar" class="h-full w-full rounded-full object-cover" />
        </div>
        <div v-if="sidebarOpen" class="flex-1 min-w-0">
          <p class="text-sm font-bold text-[#8B0101]">Delgar</p>
          <p class="text-xs text-gray-500">Frozen Products</p>
        </div>
      </NuxtLink>
    </div>
    <nav class="flex-1 overflow-y-auto">
      <div v-if="sidebarOpen" class="px-4 py-6">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Main</p>
        <div class="space-y-2">
          <NuxtLink
            to="/admin/adminsahboard"
            :class="['flex items-center gap-3 px-4 py-3 text-sm rounded-lg', activeLinkClass(isDashboardPage)]"
          >
            <Icon name="mdi:chart-box" class="w-5 h-5" /><span>Dashboard</span>
            <span class="ml-auto"><Icon name="mdi:chevron-down" class="w-4 h-4" /></span>
          </NuxtLink>
          <NuxtLink to="/admin/super-admin" class="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
            <Icon name="mdi:account-circle" class="w-5 h-5" /><span>Super Admin</span>
            <span class="ml-auto text-gray-400">›</span>
          </NuxtLink>
        </div>
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-4">Inventory</p>
        <div class="space-y-2">
          <NuxtLink to="/admin/products" :class="['flex items-center gap-3 px-4 py-3 text-sm rounded-lg', activeLinkClass(isProductsPage)]">
            <Icon name="mdi:package-variant" class="w-5 h-5" /><span>Products</span>
          </NuxtLink>
          <NuxtLink to="/admin/create" :class="['flex items-center gap-3 px-4 py-3 text-sm rounded-lg', activeLinkClass(isCreatePage)]">
            <Icon name="mdi:plus-circle" class="w-5 h-5" /><span>Create Product</span>
          </NuxtLink>
          <NuxtLink to="/admin/category" :class="['flex items-center gap-3 px-4 py-3 text-sm rounded-lg', activeLinkClass(isCategoryPage)]">
            <Icon name="mdi:folder" class="w-5 h-5" /><span>Category</span>
          </NuxtLink>
        </div>
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-4">Stock</p>
        <div class="space-y-2">
          <NuxtLink
            to="/admin/stock"
            :class="['flex items-center gap-3 px-4 py-3 text-sm rounded-lg', activeLinkClass(isStockPage)]"
          >
            <Icon name="mdi:clipboard-list" class="w-5 h-5" /><span>Manage Stock</span>
          </NuxtLink>
        </div>
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-4">System</p>
        <div class="space-y-2">
          <NuxtLink
            to="/admin/activity-logs"
            :class="['flex items-center gap-3 px-4 py-3 text-sm rounded-lg', activeLinkClass(isActivityLogsPage)]"
          >
            <Icon name="mdi:history" class="w-5 h-5" /><span>Activity Logs</span>
          </NuxtLink>
        </div>
      </div>
      <div v-else class="px-2 py-6 space-y-2">
        <NuxtLink to="/admin/adminsahboard" class="flex items-center justify-center w-full p-3 rounded-lg transition" :class="isDashboardPage ? 'text-[#8B0101] bg-red-50' : 'text-gray-600 hover:bg-gray-100'" title="Dashboard"><Icon name="mdi:chart-box" class="w-5 h-5" /></NuxtLink>
        <NuxtLink to="/admin/super-admin" class="flex items-center justify-center w-full p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition" title="Super Admin"><Icon name="mdi:account-circle" class="w-5 h-5" /></NuxtLink>
        <NuxtLink to="/admin/products" class="flex items-center justify-center w-full p-3 rounded-lg transition" :class="isProductsPage ? 'text-[#8B0101] bg-red-50' : 'text-gray-600 hover:bg-gray-100'" title="Products"><Icon name="mdi:package-variant" class="w-5 h-5" /></NuxtLink>
        <NuxtLink to="/admin/create" class="flex items-center justify-center w-full p-3 rounded-lg transition" :class="isCreatePage ? 'text-[#8B0101] bg-red-50' : 'text-gray-600 hover:bg-gray-100'" title="Create Product"><Icon name="mdi:plus-circle" class="w-5 h-5" /></NuxtLink>
        <NuxtLink to="/admin/category" class="flex items-center justify-center w-full p-3 rounded-lg transition" :class="isCategoryPage ? 'text-[#8B0101] bg-red-50' : 'text-gray-600 hover:bg-gray-100'" title="Category"><Icon name="mdi:folder" class="w-5 h-5" /></NuxtLink>
        <NuxtLink to="/admin/stock" class="flex items-center justify-center w-full p-3 rounded-lg transition" :class="isStockPage ? 'text-[#8B0101] bg-red-50' : 'text-gray-600 hover:bg-gray-100'" title="Manage Stock"><Icon name="mdi:clipboard-list" class="w-5 h-5" /></NuxtLink>
        <NuxtLink to="/admin/activity-logs" class="flex items-center justify-center w-full p-3 rounded-lg transition" :class="isActivityLogsPage ? 'text-[#8B0101] bg-red-50' : 'text-gray-600 hover:bg-gray-100'" title="Activity Logs"><Icon name="mdi:history" class="w-5 h-5" /></NuxtLink>
      </div>
    </nav>
    <div class="p-4 border-t border-gray-200">
      <button
        @click="handleLogout"
        class="w-full px-4 py-2 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition flex items-center justify-center gap-2"
      >
        <Icon name="mdi:logout" class="w-5 h-5" />{{ sidebarOpen ? "Logout" : "" }}
      </button>
    </div>
  </aside>
</template>
