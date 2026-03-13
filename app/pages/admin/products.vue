

<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <AdminProductsBreadcrumbs title="Products">
          <template #actions>
            <AdminProductsActions
              @add-product="handleAddProduct"
              @export-pdf="handleExportPDF"
              @export-excel="handleExportExcel"
              @print="handlePrint"
              @refresh="handleRefresh"
            />
          </template>
        </AdminProductsBreadcrumbs>
        <div class="p-8">
          <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 mb-4">
            <AdminProductsSearchBar v-model="searchQuery" />
            <AdminProductsFilters
              :selectedCategory="selectedCategory"
              :selectedBrand="selectedBrand"
              :expiredFilter="expiredFilter"
              :categories="categories"
              :brands="brands"
              @update:selectedCategory="(value) => (selectedCategory = value)"
              @update:selectedBrand="(value) => (selectedBrand = value)"
              @update:expiredFilter="(value) => (expiredFilter = value)"
            />
          </div>

          <AdminProductsTable
            :products="paginatedProducts"
            :isProductExpired="isProductExpired"
            @archive="handleArchiveProduct"
            @edit="handleEditProduct"
            @delete="handleDeleteProduct"
          />

          <AdminProductsPagination
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

    <!-- Edit Product Modal -->
    <AdminProductsEditModal
      :show="showEditProductModal"
      :edit-form="editForm"
      :stores="stores"
      :category-options="categoryOptions"
      :brand-options="brandOptions"
      :units="units"
      :selling-types="sellingTypes"
      :tax-types="taxTypes"
      :discount-types="discountTypes"
      :barcode-symbologies="barcodeSymbologies"
      @close="closeEditProductModal"
      @submit="handleSubmitEditProduct"
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
import { useToast } from "~/composables/useToast";
import { useProductsPage } from "~/composables/useProductsPage";

const { success, error, info } = useToast();

const {
  products,
  categories,
  brands,
  stores,
  categoryOptions,
  brandOptions,
  units,
  sellingTypes,
  taxTypes,
  discountTypes,
  barcodeSymbologies,
  selectedCategory,
  selectedBrand,
  expiredFilter,
  searchQuery,
  currentPage,
  rowsPerPage,
  showEditProductModal,
  editForm,
  filteredProducts,
  paginatedProducts,
  totalPages,
  visiblePageNumbers,
  isProductExpired,
  openEditProduct,
  closeEditProductModal,
  submitEditProduct,
  archiveProduct,
  deleteProductAction,
} = useProductsPage();

// Keep these page-specific events here
const handleAddProduct = () => {
  navigateTo("/admin/create");
};

const handleExportPDF = () => {
  info("Export to PDF triggered");
};

const handleExportExcel = () => {
  info("Export to Excel triggered");
};

const handlePrint = () => {
  info("Print triggered");
};

const handleRefresh = () => {
  info("Refresh triggered");
};

const handleEditProduct = (productId: string) => {
  const product = products.value.find((p) => p.id === productId);
  if (product) openEditProduct(product);
};

const handleArchiveProduct = (productId: string) => {
  archiveProduct(productId, info);
};

const handleDeleteProduct = (productId: string) => {
  deleteProductAction(productId, error);
};

const handleSubmitEditProduct = () => {
  submitEditProduct({ success, error });
};
</script>