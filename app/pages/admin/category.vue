<script setup lang="ts">
import { useCategoryPage } from "~/composables/useCategoryPage";

const {
  searchQuery,
  statusFilter,
  currentPage,
  rowsPerPage,
  paginatedItems,
  totalPages,
  visiblePageNumbers,
  showAddCategoryModal,
  newCategory,
  handleAddCategory,
  handleEdit,
  handleArchive,
  handleDelete,
  closeAddCategoryModal,
  submitAddCategory,
} = useCategoryPage();
</script>

<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <AdminBreadcrumbs
        :items="[
          { label: 'Dashboard', to: '/admin/adminsahboard' },
          { label: 'Category', active: true },
        ]"
        title="Category"
      >
        <template #actions>
          <div class="flex items-center gap-2">
            <button
              @click="handleAddCategory"
              class="px-4 py-2 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition flex items-center gap-2"
            >
              <Icon name="mdi:plus" class="w-5 h-5" />
              Add Category
            </button>
            <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Export to PDF"><Icon name="mdi:file-pdf" class="w-7 h-7 text-red-500" /></button>
            <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Export to Excel"><Icon name="mdi:file-excel" class="w-7 h-7 text-green-600" /></button>
            <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Print"><Icon name="mdi:printer" class="w-7 h-7 text-gray-600" /></button>
            <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Refresh"><Icon name="mdi:refresh" class="w-7 h-7 text-gray-600" /></button>
            <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="More"><Icon name="mdi:chevron-down" class="w-7 h-7 text-gray-600" /></button>
          </div>
        </template>
      </AdminBreadcrumbs>

      <div class="p-8">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 mb-4">
          <AdminCategoryTopBar
            :searchQuery="searchQuery"
            :statusFilter="statusFilter"
            @update:searchQuery="(value) => (searchQuery = value)"
            @update:statusFilter="(value) => (statusFilter = value)"
          />
        </div>

        <div class="flex-1 overflow-auto">
          <AdminCategoryTable
            :items="paginatedItems"
            @edit="handleEdit"
            @archive="handleArchive"
            @delete="handleDelete"
          />
        </div>

        <AdminCategoryPagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          :rowsPerPage="rowsPerPage"
          :visiblePageNumbers="visiblePageNumbers"
          @update:currentPage="(page) => (currentPage = page)"
          @update:rowsPerPage="(rows) => (rowsPerPage = rows)"
        />
      </div>
      </div>
    </main>

    <AdminCategoryModal
      :show="showAddCategoryModal"
      :newCategory="newCategory"
      @close="closeAddCategoryModal"
      @submit="submitAddCategory"
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
