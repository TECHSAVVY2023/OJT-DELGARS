<script setup lang="ts">
type ProductEditForm = {
  store: string;
  productName: string;
  sku: string;
  category: string;
  brand: string;
  itemCode: string;
  description: string;
  storage: string;
  slug: string;
  sellingType: string;
  unit: string;
  barcodeSymbology: string;
  productType: "single" | "variable";
  price: string;
  taxType: string;
  discountType: string;
  discountValue: string;
  quantityAlert: string;
  manufacturer: string;
  manufacturedDate: string;
  expiryOn: string;
};

const props = defineProps<{
  show: boolean;
  editForm: ProductEditForm;
  stores: string[];
  categoryOptions: string[];
  brandOptions: string[];
  units: string[];
  sellingTypes: string[];
  taxTypes: string[];
  discountTypes: string[];
  barcodeSymbologies: string[];
}>();
const emit = defineEmits<{
  (event: "close"): void;
  (event: "submit"): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="props.show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        style="font-family: 'Nunito Sans', sans-serif"
        @click.self="emit('close')"
      >
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col" @click.stop>
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
            <h2 class="text-lg font-semibold text-gray-900">Edit Product</h2>
            <button type="button" class="p-1 text-gray-400 hover:text-gray-600 rounded transition" @click="emit('close')">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="emit('submit')" class="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div class="p-6 space-y-6 overflow-y-auto">
              <AdminProductsEditProductInfo
                :edit-form="props.editForm"
                :stores="props.stores"
                :category-options="props.categoryOptions"
                :brand-options="props.brandOptions"
                :units="props.units"
                :selling-types="props.sellingTypes"
                :barcode-symbologies="props.barcodeSymbologies"
              />
              <AdminProductsEditPricingStocks
                :edit-form="props.editForm"
                :tax-types="props.taxTypes"
                :discount-types="props.discountTypes"
              />
              <AdminProductsEditCustomFields :edit-form="props.editForm" />
            </div>
            <AdminProductsEditActions @close="emit('close')" />
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
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