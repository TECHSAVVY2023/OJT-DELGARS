<script setup lang="ts">
import type { Category } from "~/composables/useCategoriesData";

const props = defineProps<{
  items: Category[];
}>();

const emit = defineEmits(["edit", "archive", "delete"] as const);
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b border-gray-200 bg-gray-50">
          <th class="px-6 py-4 text-center"><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#8B0101]" /></th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Category Slug</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Created On</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.items" :key="item.id" class="border-b border-gray-200 hover:bg-gray-50 transition">
          <td class="px-6 py-4 text-center"><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#8B0101]" /></td>
          <td class="px-6 py-4 text-sm font-medium text-gray-900 text-center">{{ item.name }}</td>
          <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ item.slug }}</td>
          <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ item.createdOn }}</td>
          <td class="px-6 py-4 text-center">
            <span v-if="item.status === 'Active'" class="inline-flex px-2 py-0.5 text-[10px] font-medium rounded border-2 border-green-600 bg-green-500 text-white">Active</span>
            <span v-else class="inline-flex px-2 py-0.5 text-[10px] font-medium rounded border-2 border-gray-400 bg-gray-100 text-gray-700">Inactive</span>
          </td>
          <td class="px-6 py-4 text-center">
            <div class="flex items-center justify-center gap-2">
              <button @click="$emit('archive', item.id)" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition" title="Archive"><Icon name="mdi:archive" class="w-5 h-5" /></button>
              <button @click="$emit('edit', item.id)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition" title="Edit"><Icon name="mdi:pencil" class="w-5 h-5" /></button>
              <button @click="$emit('delete', item.id)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition" title="Delete"><Icon name="mdi:trash-can" class="w-5 h-5" /></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
