<script setup lang="ts">
import { ref, computed } from "vue";
import { useActivityLogsData } from "~/composables/useActivityLogsData";

const { logs } = useActivityLogsData();

const searchQuery = ref("");
const typeFilter = ref("All");
const entityFilter = ref("All");
const currentPage = ref(1);
const rowsPerPage = ref(10);

const typeOptions = computed(() => {
  const types = [...new Set(logs.value.map((l) => l.type))].sort();
  return ["All", ...types];
});

const entityOptions = computed(() => {
  const entities = [...new Set(logs.value.map((l) => l.entity))].sort();
  return ["All", ...entities];
});

const filteredLogs = computed(() => {
  return logs.value.filter((log) => {
    const matchSearch =
      searchQuery.value === "" ||
      log.action.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchType = typeFilter.value === "All" || log.type === typeFilter.value;
    const matchEntity = entityFilter.value === "All" || log.entity === entityFilter.value;
    return matchSearch && matchType && matchEntity;
  });
});

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  return filteredLogs.value.slice(start, start + rowsPerPage.value);
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredLogs.value.length / rowsPerPage.value))
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

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function typeBadgeClass(type: string): string {
  const map: Record<string, string> = {
    create: "bg-emerald-100 text-emerald-800 border-emerald-300",
    update: "bg-blue-100 text-blue-800 border-blue-300",
    delete: "bg-red-100 text-red-800 border-red-300",
    archive: "bg-amber-100 text-amber-800 border-amber-300",
    restore: "bg-teal-100 text-teal-800 border-teal-300",
    login: "bg-gray-100 text-gray-700 border-gray-300",
    login_failed: "bg-red-50 text-red-700 border-red-200",
    alert: "bg-orange-100 text-orange-800 border-orange-300",
    import: "bg-indigo-100 text-indigo-800 border-indigo-300",
    export: "bg-slate-100 text-slate-700 border-slate-300",
  };
  return map[type] ?? "bg-gray-100 text-gray-700 border-gray-300";
}

function entityLabel(entity: string): string {
  return entity.charAt(0).toUpperCase() + entity.slice(1);
}
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
                <span class="text-gray-900 font-medium">Activity Logs</span>
              </div>
              <h1 class="text-3xl font-bold text-gray-900">Activity Logs</h1>
              <p class="text-sm text-gray-500 mt-1">View and filter system activity</p>
            </div>
            <div class="flex items-center gap-2 border-l border-gray-200 pl-3">
              <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Export to PDF"><Icon name="mdi:file-pdf" class="w-7 h-7 text-red-500" /></button>
              <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Export to Excel"><Icon name="mdi:file-excel" class="w-7 h-7 text-green-600" /></button>
              <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Refresh"><Icon name="mdi:refresh" class="w-7 h-7 text-gray-600" /></button>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex-1 min-w-[200px] flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
              <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400 shrink-0" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search action, user or details..."
                class="bg-transparent outline-none text-sm flex-1 min-w-0"
              />
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Type</label>
              <select
                v-model="typeFilter"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0"
              >
                <option v-for="opt in typeOptions" :key="opt" :value="opt">{{ opt === "All" ? "All" : opt }}</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Entity</label>
              <select
                v-model="entityFilter"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0"
              >
                <option v-for="opt in entityOptions" :key="opt" :value="opt">{{ opt === "All" ? "All" : entityLabel(opt) }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-auto px-8 py-6">
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="border-b border-gray-200 bg-gray-50">
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Time</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Entity</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Details</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="log in paginatedLogs"
                    :key="log.id"
                    class="border-b border-gray-100 hover:bg-gray-50/80 transition"
                  >
                    <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {{ formatTimestamp(log.timestamp) }}
                    </td>
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                      {{ log.action }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      <span class="font-mono text-xs">{{ log.user }}</span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      {{ entityLabel(log.entity) }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" :title="log.details">
                      {{ log.details }}
                    </td>
                    <td class="px-6 py-4">
                      <span
                        :class="['inline-flex px-2 py-0.5 text-[10px] font-medium rounded border', typeBadgeClass(log.type)]"
                      >
                        {{ log.type }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="paginatedLogs.length === 0">
                    <td colspan="6" class="px-6 py-12 text-center text-sm text-gray-500">
                      No activity logs match your filters.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Rows per page</label>
              <select
                v-model.number="rowsPerPage"
                class="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0"
              >
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="15">15</option>
                <option :value="20">20</option>
              </select>
            </div>
            <span class="text-sm text-gray-600">
              Showing {{ (currentPage - 1) * rowsPerPage + 1 }}–{{ Math.min(currentPage * rowsPerPage, filteredLogs.length) }} of {{ filteredLogs.length }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-50"
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
                  currentPage === page ? 'bg-[#8B0101] text-white' : 'border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
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
            >
              <Icon name="mdi:chevron-right" class="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
