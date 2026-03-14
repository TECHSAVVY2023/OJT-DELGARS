<script setup lang="ts">
import type { StockEntry } from '~/composables/useStockData';

export interface ActivityLog {
  id: number;
  timestamp: string;
  action: string;
  user: string;
  entity: string;
  details: string;
  type: string;
}

const props = defineProps<{
  logs: ActivityLog[];
  formatTimestamp: (iso: string) => string;
  typeBadgeClass: (type: string) => string;
  entityLabel: (entity: string) => string;
}>();
</script>

<template>
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
            v-for="log in props.logs"
            :key="log.id"
            class="border-b border-gray-100 hover:bg-gray-50/80 transition"
          >
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{{ props.formatTimestamp(log.timestamp) }}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ log.action }}</td>
            <td class="px-6 py-4 text-sm text-gray-600"><span class="font-mono text-xs">{{ log.user }}</span></td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ props.entityLabel(log.entity) }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" :title="log.details">{{ log.details }}</td>
            <td class="px-6 py-4">
              <span :class="['inline-flex px-2 py-0.5 text-[10px] font-medium rounded border', props.typeBadgeClass(log.type)]">{{ log.type }}</span>
            </td>
          </tr>
          <tr v-if="props.logs.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-sm text-gray-500">No activity logs match your filters.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
