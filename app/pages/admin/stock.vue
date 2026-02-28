<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useToast } from "~/composables/useToast";
import { useRoute } from "vue-router";
import { useStockData } from "~/composables/useStockData";
import { useOptionsData } from "~/composables/useOptionsData";

const route = useRoute();
const { success, error, info } = useToast();
const { stockEntries, updateStockEntry } = useStockData();
const { options } = useOptionsData();

const searchQuery = ref("");
const selectedCategory = ref("All");
const stockFilter = ref<"all" | "low">("all");
const currentPage = ref(1);
const rowsPerPage = ref(10);

// Apply stock filter from query when coming from dashboard (e.g. ?stockFilter=low)
function syncStockFilterFromRoute() {
  const query = route.query.stockFilter as string;
  if (query === "low") stockFilter.value = "low";
}
onMounted(syncStockFilterFromRoute);
watch(() => route.query.stockFilter, syncStockFilterFromRoute);

const categories = computed(() => options.value.categories);
const categoryOptions = computed(() => options.value.categoryOptions);
const productOptions = computed(() => options.value.productOptions);

function isLowStock(entry: { qty: number; threshold: number }): boolean {
  return entry.qty < entry.threshold;
}

const filteredEntries = computed(() => {
  return stockEntries.value.filter((entry) => {
    const matchCategory = selectedCategory.value === "All" || entry.category === selectedCategory.value;
    const matchSearch =
      searchQuery.value === "" ||
      entry.productName.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStock =
      stockFilter.value === "all" || (stockFilter.value === "low" && isLowStock(entry));
    return matchCategory && matchSearch && matchStock;
  });
});

const paginatedEntries = computed(() => {
  const startIndex = (currentPage.value - 1) * rowsPerPage.value;
  return filteredEntries.value.slice(startIndex, startIndex + rowsPerPage.value);
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredEntries.value.length / rowsPerPage.value))
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

const showEditStockModal = ref(false);
const editingEntryId = ref<number | null>(null);
const editStockForm = ref({
  productName: "",
  date: "",
  person: "",
  qty: 0,
  threshold: 0,
});

const openEditStock = (entry: typeof stockEntries.value[0]) => {
  editingEntryId.value = entry.id;
  editStockForm.value = {
    productName: entry.productName,
    date: entry.date,
    person: entry.person,
    qty: entry.qty,
    threshold: entry.threshold,
  };
  showEditStockModal.value = true;
};

const closeEditStockModal = () => {
  showEditStockModal.value = false;
  editingEntryId.value = null;
};

const submitEditStock = () => {
  if (!editingEntryId.value) return;
  if (!editStockForm.value.productName?.trim()) {
    error("Product name is required.");
    return;
  }
  updateStockEntry(editingEntryId.value, {
    productName: editStockForm.value.productName.trim(),
    date: editStockForm.value.date,
    person: editStockForm.value.person,
    qty: editStockForm.value.qty,
    threshold: editStockForm.value.threshold,
  });
  success("Stock entry updated successfully!");
  closeEditStockModal();
};

const handleEdit = (entry: typeof stockEntries.value[0]) => { openEditStock(entry); };
</script>

<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <!-- Page header -->
        <div class="bg-white border-b border-gray-200 px-8 py-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <NuxtLink to="/admin/adminsahboard" class="hover:text-[#8B0101]">Dashboard</NuxtLink>
                <span class="text-gray-400">›</span>
                <span class="text-gray-900 font-medium">Manage Stock</span>
              </div>
              <h1 class="text-3xl font-bold text-gray-900">Manage Stock</h1>
            </div>
            <div class="flex items-center gap-3">
             
              <div class="flex items-center gap-1">
                <button class="p-2 hover:bg-gray-100 rounded-lg transition" title="Export to PDF"><Icon name="mdi:file-pdf" class="w-5 h-5 text-red-500" /></button>
                <button class="p-2 hover:bg-gray-100 rounded-lg transition" title="Export to Excel"><Icon name="mdi:file-excel" class="w-5 h-5 text-green-500" /></button>
                <button class="p-2 hover:bg-gray-100 rounded-lg transition" title="Print"><Icon name="mdi:printer" class="w-5 h-5 text-gray-600" /></button>
                <button class="p-2 hover:bg-gray-100 rounded-lg transition" title="Refresh"><Icon name="mdi:refresh" class="w-5 h-5 text-gray-600" /></button>
              </div>
            </div>
          </div>

          <!-- Search and filters -->
          <div class="flex items-center gap-4">
            <div class="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
              <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search"
                class="bg-transparent outline-none text-sm flex-1"
              />
            </div>
<div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Category</label>
              <select
                v-model="selectedCategory"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0 cursor-pointer transition"
              >
                <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Stock</label>
              <select
                v-model="stockFilter"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0 cursor-pointer transition"
              >
                <option value="all">All</option>
                <option value="low">Low stock only</option>
              </select>
            </div>
            </div>
          </div>
        </div>

        <!-- Table (same design as products page) -->
        <div class="flex-1 overflow-auto px-8 py-6">
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table class="w-full border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50">
                  <th class="px-6 py-4 text-center">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#8B0101] focus:ring-[#8B0101] cursor-pointer" />
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Date ⬆</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Person</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Qty</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Threshold</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="entry in paginatedEntries"
                  :key="entry.id"
                  class="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td class="px-6 py-4 text-center">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#8B0101] focus:ring-[#8B0101] cursor-pointer" />
                  </td>
                  <td class="px-6 py-4 text-left">
                    <div class="flex items-center justify-start gap-2">
                      <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
                        <Icon name="mdi:fish" class="w-4 h-4" />
                      </div>
                      <span class="text-sm font-medium text-gray-900">{{ entry.productName }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ entry.date }}</td>
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                        <img src="/logo/delgar-logo.png" alt="" class="w-full h-full object-cover" />
                      </div>
                      <span class="text-sm text-gray-600">{{ entry.person }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm font-medium text-gray-900 text-center">{{ entry.qty }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ entry.threshold }}</td>
                  <td class="px-6 py-4 text-center">
                    <span
                      :class="[
                        'inline-flex px-2 py-0.5 text-[10px] font-medium rounded border-2',
                        isLowStock(entry) ? 'border-red-600 bg-red-500 text-white' : 'border-green-600 bg-green-500 text-white',
                      ]"
                    >
                      {{ isLowStock(entry) ? 'Low' : 'OK' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <button
                        @click="handleEdit(entry)"
                        class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition"
                        title="Edit"
                      >
                        <Icon name="mdi:pencil" class="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination (same as products page) -->
        <div class="bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Row Per Page</label>
              <select
                v-model.number="rowsPerPage"
                class="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0 cursor-pointer transition"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <span class="text-sm text-gray-600">Entries</span>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-50"
              title="Previous page"
            >
              <Icon name="mdi:chevron-left" class="w-5 h-5 text-gray-600" />
            </button>
            <div class="flex items-center gap-1">
              <button
                v-for="page in visiblePageNumbers"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition',
                  currentPage === page ? 'bg-[#8B0101] text-white' : 'border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50',
                ]"
              >
                {{ page }}
              </button>
              <span v-if="totalPages > 5 && !visiblePageNumbers.includes(totalPages)" class="px-2 text-gray-600 text-sm">...</span>
              <button
                v-if="totalPages > 5 && !visiblePageNumbers.includes(totalPages)"
                @click="currentPage = totalPages"
                class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition"
              >
                {{ totalPages }}
              </button>
            </div>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-50"
              title="Next page"
            >
              <Icon name="mdi:chevron-right" class="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Edit Stock Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showEditStockModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          style="font-family: 'Nunito Sans', sans-serif"
          @click.self="closeEditStockModal"
        >
          <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]" @click.stop>
            <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
              <h2 class="text-lg font-semibold text-gray-900">Edit Stock</h2>
              <button type="button" class="p-1 text-gray-400 hover:text-gray-600 rounded transition" @click="closeEditStockModal">
                <Icon name="mdi:close" class="w-5 h-5" />
              </button>
            </div>
            <form @submit.prevent="submitEditStock" class="flex flex-col flex-1 min-h-0">
              <div class="p-6 space-y-4 overflow-y-auto">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Product Name</label>
                  <input :value="editStockForm.productName" type="text" readonly class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed" tabindex="-1" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Date</label>
                    <input :value="editStockForm.date" type="text" readonly class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed" tabindex="-1" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Person</label>
                    <input :value="editStockForm.person" type="text" readonly class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed" tabindex="-1" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Quantity <span class="text-red-500">*</span></label>
                    <input v-model.number="editStockForm.qty" type="number" min="0" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Threshold</label>
                    <input v-model.number="editStockForm.threshold" type="number" min="0" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
                  </div>
                </div>
              </div>
              <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 shrink-0">
                <button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition" @click="closeEditStockModal">
                  Cancel
                </button>
                <button type="submit" class="px-4 py-2 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition flex items-center gap-2">
                  <Icon name="mdi:content-save" class="w-4 h-4" />
                  Update Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
