<script setup lang="ts">
import type { Ref } from 'vue';

type EditStockForm = {
  productName: string;
  date: string;
  person: string;
  qty: number;
  threshold: number;
};

const props = defineProps<{
  show: boolean;
  editStockForm: EditStockForm;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'submit'): void;
  (event: 'update:qty', value: number): void;
  (event: 'update:threshold', value: number): void;
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
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]" @click.stop>
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
            <h2 class="text-lg font-semibold text-gray-900">Edit Stock</h2>
            <button type="button" class="p-1 text-gray-400 hover:text-gray-600 rounded transition" @click="emit('close')">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="emit('submit')" class="flex flex-col flex-1 min-h-0">
            <div class="p-6 space-y-4 overflow-y-auto">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Product Name</label>
                <input :value="props.editStockForm.productName" type="text" readonly class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed" tabindex="-1" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Date</label>
                  <input :value="props.editStockForm.date" type="text" readonly class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed" tabindex="-1" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Person</label>
                  <input :value="props.editStockForm.person" type="text" readonly class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed" tabindex="-1" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Quantity <span class="text-red-500">*</span></label>
                  <input
                    :value="props.editStockForm.qty"
                    type="number"
                    min="0"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent"
                    @input="(e: Event) => emit('update:qty', Number((e.target as HTMLInputElement).value))"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Threshold</label>
                  <input
                    :value="props.editStockForm.threshold"
                    type="number"
                    min="0"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent"
                    @input="(e: Event) => emit('update:threshold', Number((e.target as HTMLInputElement).value))"
                  />
                </div>
              </div>
            </div>
            <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 shrink-0">
              <button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition" @click="emit('close')">Cancel</button>
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
</template>
