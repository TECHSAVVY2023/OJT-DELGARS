<script setup lang="ts">
import { useActivityLogsPage } from '~/composables/useActivityLogsPage';

const {
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
} = useActivityLogsPage();

const exportPdf = () => {
  // hook for future real export action
  console.info('Export to PDF triggered');
};

const exportExcel = () => {
  console.info('Export to Excel triggered');
};

const refreshPage = () => {
  console.info('Refresh triggered');
};
</script>

<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <AdminActivityLogsTopBar
          :searchQuery="searchQuery"
          :typeFilter="typeFilter"
          :entityFilter="entityFilter"
          :typeOptions="typeOptions"
          :entityOptions="entityOptions"
          @update:searchQuery="(value) => (searchQuery = value)"
          @update:typeFilter="(value) => (typeFilter = value)"
          @update:entityFilter="(value) => (entityFilter = value)"
          @exportPdf="exportPdf"
          @exportExcel="exportExcel"
          @refresh="refreshPage"
        />

        <div class="flex-1 overflow-auto px-8 py-6">
          <AdminActivityLogsTable
            :logs="paginatedLogs"
            :formatTimestamp="formatTimestamp"
            :typeBadgeClass="typeBadgeClass"
            :entityLabel="entityLabel"
          />
        </div>

        <AdminActivityLogsPagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          :rowsPerPage="rowsPerPage"
          :visiblePageNumbers="visiblePageNumbers"
          @update:currentPage="(page) => (currentPage = page)"
          @update:rowsPerPage="(rows) => (rowsPerPage = rows)"
        />
      </div>
    </main>
  </div>
</template>

