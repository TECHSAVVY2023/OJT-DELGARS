import { ref, computed } from 'vue';
import { useActivityLogsData } from '~/composables/useActivityLogsData';

type ActivityLog = {
  id: number;
  timestamp: string;
  action: string;
  user: string;
  entity: string;
  details: string;
  type: string;
};

export function useActivityLogsPage() {
  const { logs } = useActivityLogsData();

  const searchQuery = ref('');
  const typeFilter = ref('All');
  const entityFilter = ref('All');
  const currentPage = ref(1);
  const rowsPerPage = ref(10);

  const typeOptions = computed(() => {
    const types = [...new Set(logs.value.map((l) => l.type))].sort();
    return ['All', ...types];
  });

  const entityOptions = computed(() => {
    const entities = [...new Set(logs.value.map((l) => l.entity))].sort();
    return ['All', ...entities];
  });

  const filteredLogs = computed(() => {
    return logs.value.filter((log) => {
      const matchSearch =
        searchQuery.value === '' ||
        log.action.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchType = typeFilter.value === 'All' || log.type === typeFilter.value;
      const matchEntity = entityFilter.value === 'All' || log.entity === entityFilter.value;
      return matchSearch && matchType && matchEntity;
    });
  });

  const paginatedLogs = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    return filteredLogs.value.slice(start, start + rowsPerPage.value);
  });

  const totalPages = computed(() => Math.max(1, Math.ceil(filteredLogs.value.length / rowsPerPage.value)));

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

  const formatTimestamp = (iso: string): string => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const typeBadgeClass = (type: string): string => {
    const map: Record<string, string> = {
      create: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      update: 'bg-blue-100 text-blue-800 border-blue-300',
      delete: 'bg-red-100 text-red-800 border-red-300',
      archive: 'bg-amber-100 text-amber-800 border-amber-300',
      restore: 'bg-teal-100 text-teal-800 border-teal-300',
      login: 'bg-gray-100 text-gray-700 border-gray-300',
      login_failed: 'bg-red-50 text-red-700 border-red-200',
      alert: 'bg-orange-100 text-orange-800 border-orange-300',
      import: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      export: 'bg-slate-100 text-slate-700 border-slate-300',
    };
    return map[type] ?? 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const entityLabel = (entity: string): string => entity.charAt(0).toUpperCase() + entity.slice(1);

  return {
    searchQuery,
    typeFilter,
    entityFilter,
    currentPage,
    rowsPerPage,
    typeOptions,
    entityOptions,
    filteredLogs,
    paginatedLogs,
    totalPages,
    visiblePageNumbers,
    formatTimestamp,
    typeBadgeClass,
    entityLabel,
  };
}
