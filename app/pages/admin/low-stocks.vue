<script setup lang="ts">
import { ref, computed } from "vue";
import { useToast } from "~/composables/useToast";
import { useRoute } from "vue-router";
import { useLowStocksData } from "~/composables/useLowStocksData";

const route = useRoute();
const { success, error, info } = useToast();
const { lowStockItems } = useLowStocksData();

const searchQuery = ref("");
const currentPage = ref(1);
const rowsPerPage = ref(10);

const filteredItems = computed(() => {
  return lowStockItems.value.filter((item) => {
    const matchSearch =
      searchQuery.value === "" ||
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchSearch;
  });
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  return filteredItems.value.slice(start, start + rowsPerPage.value);
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredItems.value.length / rowsPerPage.value))
);

const visiblePageNumbers = computed(() => {
  const total = totalPages.value;
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: number[] = [];
  let start = Math.max(1, currentPage.value - 2);
  let end = Math.min(total, start + 4);
  if (end - start < 4) start = Math.max(1, end - 4);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

const handleEdit = (id: string) => { success(`Editing: ${id}`); };
const handleDelete = (id: string) => { error(`Deleted: ${id}`); };
</script>

<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <div class="bg-white border-b border-gray-200 px-8 py-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <NuxtLink to="/admin/adminsahboard" class="hover:text-[#8B0101]">Dashboard</NuxtLink>
                <span class="text-gray-400">›</span>
                <span class="text-gray-900 font-medium">Low Stocks</span>
              </div>
              <h1 class="text-3xl font-bold text-gray-900">Low Stocks</h1>
            </div>
            <div class="flex items-center gap-2 border-l border-gray-200 pl-3">
              <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Export to PDF"><Icon name="mdi:file-pdf" class="w-7 h-7 text-red-500" /></button>
              <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Export to Excel"><Icon name="mdi:file-excel" class="w-7 h-7 text-green-600" /></button>
              <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Print"><Icon name="mdi:printer" class="w-7 h-7 text-gray-600" /></button>
              <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Refresh"><Icon name="mdi:refresh" class="w-7 h-7 text-gray-600" /></button>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
              <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400" />
              <input v-model="searchQuery" type="text" placeholder="Search" class="bg-transparent outline-none text-sm flex-1" />
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-auto px-8 py-6">
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table class="w-full border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50">
                  <th class="px-6 py-4 text-center"><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#8B0101] focus:ring-[#8B0101] cursor-pointer" /></th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">SKU #</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Current Stock</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Threshold</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in paginatedItems" :key="item.id" class="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td class="px-6 py-4 text-center"><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#8B0101] focus:ring-[#8B0101] cursor-pointer" /></td>
                  <td class="px-6 py-4 text-sm font-medium text-gray-900 text-center">{{ item.id }}</td>
                  <td class="px-6 py-4 text-left">
                    <div class="flex items-center justify-start gap-2">
                      <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
                        <Icon name="mdi:fish" class="w-4 h-4" />
                      </div>
                      <span class="text-sm font-medium text-gray-900">{{ item.name }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm font-medium text-gray-900 text-center">{{ item.currentStock }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ item.threshold }}</td>
                  <td class="px-6 py-4 text-center">
                    <span class="inline-flex px-2 py-0.5 text-[10px] font-medium rounded border-2 border-red-600 bg-red-500 text-white">Low</span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <button @click="handleEdit(item.id)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition" title="Edit"><Icon name="mdi:pencil" class="w-5 h-5" /></button>
                      <button @click="handleDelete(item.id)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition" title="Delete"><Icon name="mdi:trash-can" class="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Row Per Page</label>
              <select v-model.number="rowsPerPage" class="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0">
                <option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option>
              </select>
            </div>
            <span class="text-sm text-gray-600">Entries</span>
          </div>
          <div class="flex items-center gap-2">
            <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1" class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-50"><Icon name="mdi:chevron-left" class="w-5 h-5 text-gray-600" /></button>
            <div class="flex items-center gap-1">
              <button v-for="page in visiblePageNumbers" :key="page" @click="currentPage = page" :class="['w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition', currentPage === page ? 'bg-[#8B0101] text-white' : 'border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50']">{{ page }}</button>
              <span v-if="totalPages > 5 && !visiblePageNumbers.includes(totalPages)" class="px-2 text-gray-600 text-sm">...</span>
              <button v-if="totalPages > 5 && !visiblePageNumbers.includes(totalPages)" @click="currentPage = totalPages" class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition">{{ totalPages }}</button>
            </div>
            <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages" class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-50"><Icon name="mdi:chevron-right" class="w-5 h-5 text-gray-600" /></button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;800&display=swap");
</style>
