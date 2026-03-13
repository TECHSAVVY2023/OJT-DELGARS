<script setup lang="ts">
interface Category {
  name: string;
  slug: string;
  status: string;
}

const props = defineProps<{
  show: boolean;
  newCategory: Category;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'submit'): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="props.show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        style="font-family: 'Nunito Sans', sans-serif"
        @click.self="$emit('close')"
      >
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-xs overflow-hidden transform transition" @click.stop>
          <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-white">
            <h2 class="text-base font-semibold text-gray-900">Add Category</h2>
            <button type="button" class="p-1 text-gray-400 hover:text-gray-600 rounded transition" @click="$emit('close')">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="$emit('submit')" class="p-6 space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Category Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="props.newCategory.name"
                type="text"
                placeholder="e.g. Seafood"
                class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent hover:border-gray-400 transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Slug <span class="text-gray-500 font-normal text-xs">(optional)</span>
              </label>
              <input
                v-model="props.newCategory.slug"
                type="text"
                placeholder="e.g. seafood"
                class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent hover:border-gray-400 transition"
              />
              <p class="text-xs text-gray-500 mt-1.5">Auto-generated from name if left empty</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Status <span class="text-red-500">*</span>
              </label>
              <select
                v-model="props.newCategory.status"
                class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent hover:border-gray-400 transition bg-white cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div class="flex items-center gap-3 justify-end pt-2">
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition flex items-center gap-2"
              >
                <Icon name="mdi:plus" class="w-4 h-4" />
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
