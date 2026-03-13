import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from '~/composables/useToast';
import { useStockData, type StockEntry } from '~/composables/useStockData';
import { useOptionsData } from '~/composables/useOptionsData';

type StockFilter = 'all' | 'low';

type EditStockForm = {
  productName: string;
  date: string;
  person: string;
  qty: number;
  threshold: number;
};

export function useStockPage() {
  const route = useRoute();
  const { success, error, info } = useToast();
  const { stockEntries, updateStockEntry } = useStockData();
  const { options } = useOptionsData();

  const searchQuery = ref('');
  const selectedCategory = ref('All');
  const stockFilter = ref<StockFilter>('all');
  const currentPage = ref(1);
  const rowsPerPage = ref(10);

  const showEditStockModal = ref(false);
  const editingEntryId = ref<number | null>(null);
  const editStockForm = ref<EditStockForm>({
    productName: '',
    date: '',
    person: '',
    qty: 0,
    threshold: 0,
  });

  function isLowStock(entry: StockEntry) {
    return entry.qty < entry.threshold;
  }

  function syncStockFilterFromRoute() {
    const query = route.query.stockFilter as string;
    if (query === 'low') stockFilter.value = 'low';
  }

  onMounted(syncStockFilterFromRoute);
  watch(() => route.query.stockFilter, syncStockFilterFromRoute);

  const categories = computed(() => options.value.categories ?? []);

  const filteredEntries = computed(() => {
    return stockEntries.value.filter((entry: StockEntry) => {
      const matchCategory = selectedCategory.value === 'All' || entry.category === selectedCategory.value;
      const matchSearch =
        searchQuery.value === '' ||
        entry.productName.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchStock =
        stockFilter.value === 'all' || (stockFilter.value === 'low' && isLowStock(entry));
      return matchCategory && matchSearch && matchStock;
    });
  });

  const paginatedEntries = computed(() => {
    const startIndex = (currentPage.value - 1) * rowsPerPage.value;
    return filteredEntries.value.slice(startIndex, startIndex + rowsPerPage.value);
  });

  const totalPages = computed(() => Math.max(1, Math.ceil(filteredEntries.value.length / rowsPerPage.value)));

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

  const openEditStock = (entry: StockEntry) => {
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
      error('Product name is required.');
      return;
    }

    updateStockEntry(editingEntryId.value, {
      productName: editStockForm.value.productName.trim(),
      date: editStockForm.value.date,
      person: editStockForm.value.person,
      qty: editStockForm.value.qty,
      threshold: editStockForm.value.threshold,
    });

    success('Stock entry updated successfully!');
    closeEditStockModal();
  };

  const handleEdit = (entry: StockEntry) => openEditStock(entry);

  return {
    searchQuery,
    selectedCategory,
    stockFilter,
    currentPage,
    rowsPerPage,
    showEditStockModal,
    editStockForm,
    categories,
    isLowStock,
    paginatedEntries,
    totalPages,
    visiblePageNumbers,
    openEditStock,
    closeEditStockModal,
    submitEditStock,
    handleEdit,
    stockEntries,
    filteredEntries,
    stockFilterOptions: computed<StockFilter[]>(() => ['all', 'low']),
    syncStockFilterFromRoute,
  };
}
