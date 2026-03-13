
<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <AdminStockTopBar
          :searchQuery="searchQuery"
          :selectedCategory="selectedCategory"
          :stockFilter="stockFilter"
          :categories="categories"
          @update:searchQuery="(value) => (searchQuery = value)"
          @update:selectedCategory="(value) => (selectedCategory = value)"
          @update:stockFilter="(value) => (stockFilter = value)"
          @exportPdf="exportPdf"
          @exportExcel="exportExcel"
          @print="printPage"
          @refresh="refreshPage"
        />

        <div class="flex-1 overflow-auto px-8 py-6">
          <AdminStockTable
            :entries="paginatedEntries"
            :isLowStock="isLowStock"
            @edit="handleEdit"
          />
        </div>

        <AdminStockPagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          :rowsPerPage="rowsPerPage"
          :visiblePageNumbers="visiblePageNumbers"
          @update:currentPage="(page) => (currentPage = page)"
          @update:rowsPerPage="(rows) => (rowsPerPage = rows)"
        />



      </div>
    </main>

    <AdminStockEditModal
      :show="showEditStockModal"
      :editStockForm="editStockForm"
      @close="closeEditStockModal"
      @submit="submitEditStock"
      @update:qty="(value) => (editStockForm.qty = value)"
      @update:threshold="(value) => (editStockForm.threshold = value)"
    />
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

<script setup lang="ts">
import { useToast } from '~/composables/useToast';
import { useStockPage } from '~/composables/useStockPage';

const { info } = useToast();
const {
  searchQuery,
  selectedCategory,
  stockFilter,
  currentPage,
  rowsPerPage,
  categories,
  isLowStock,
  paginatedEntries,
  totalPages,
  visiblePageNumbers,
  showEditStockModal,
  editStockForm,
  handleEdit,
  closeEditStockModal,
  submitEditStock,
} = useStockPage();

const exportPdf = () => info('Export to PDF triggered');
const exportExcel = () => info('Export to Excel triggered');
const printPage = () => info('Print triggered');
const refreshPage = () => info('Refresh triggered');
</script>
