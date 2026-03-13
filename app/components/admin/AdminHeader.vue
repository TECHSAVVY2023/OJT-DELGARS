<script setup lang="ts">
const { toggleSidebar } = useAdminSidebar();
</script>

<template>
  <header class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <button @click="toggleSidebar" class="p-2 hover:bg-gray-100 rounded-lg transition">
        <Icon name="mdi:menu" class="w-6 h-6" />
      </button>
      <div class="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
        <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400" />
        <input type="text" placeholder="Search" class="bg-transparent outline-none text-sm w-32" />
        <span class="text-xs text-gray-400">⌘ K</span>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <button class="p-2 hover:bg-gray-100 rounded-lg transition"><Icon name="mdi:open-in-new" class="w-6 h-6 text-gray-600" /></button>
      <button class="p-2 relative hover:bg-gray-100 rounded-lg transition"><span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /><Icon name="mdi:bell" class="w-6 h-6 text-gray-600" /></button>
      <button class="p-2 hover:bg-gray-100 rounded-lg transition"><Icon name="mdi:cog" class="w-6 h-6 text-gray-600" /></button>
      <button class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center hover:bg-gray-300 transition">
        <img src="/logo/delgar-logo.png" alt="Profile" class="h-full w-full object-cover" />
      </button>
    </div>
  </header>
</template>
