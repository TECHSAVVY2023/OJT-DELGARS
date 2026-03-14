<script setup lang="ts">
const props = defineProps<{
  products: Array<Record<string, any>>;
  isProductExpired: (expirationDate: string) => boolean;
}>();
const emit = defineEmits<{
  (event: "archive", productId: string): void;
  (event: "edit", productId: string): void;
  (event: "delete", productId: string): void;
}>();
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b border-gray-200 bg-gray-50">
          <th class="px-6 py-4 text-center"><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#8B0101] cursor-pointer" /></th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">SKU #</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Brand</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Unit</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Expiration Date</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Created By</th>
          <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="border-b border-gray-200 hover:bg-gray-50 transition">
          <td class="px-6 py-4 text-center"><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#8B0101] cursor-pointer" /></td>
          <td class="px-6 py-4 text-sm font-medium text-gray-900 text-center">{{ product.id }}</td>
          <td class="px-6 py-4 text-left">
            <div class="flex items-center justify-start gap-2">
              <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-gray-500"><Icon name="mdi:fish" class="w-4 h-4" /></div>
              <span class="text-sm font-medium text-gray-900">{{ product.name }}</span>
            </div>
          </td>
          <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ product.category }}</td>
          <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ product.brand }}</td>
          <td class="px-6 py-4 text-sm font-semibold text-gray-900 text-center">{{ product.price }}</td>
          <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ product.unit }}</td>
          <td class="px-6 py-4 text-sm text-gray-600 text-center">
            <span :class="props.isProductExpired(product.expirationDate) ? 'text-red-600 font-medium' : ''">{{ product.expirationDate }}</span>
          </td>
          <td class="px-6 py-4 text-center">
            <div class="flex items-center justify-center gap-2">
              <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                <img src="/logo/delgar-logo.png" alt="" class="w-full h-full object-cover" />
              </div>
              <span class="text-sm text-gray-600">{{ product.createdBy }}</span>
            </div>
          </td>
          <td class="px-6 py-4 text-center">
            <div class="flex items-center justify-center gap-2">
              <button @click="emit('archive', product.id)" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition" title="Archive"><Icon name="mdi:archive" class="w-5 h-5" /></button>
              <button @click="emit('edit', product.id)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition" title="Edit"><Icon name="mdi:pencil" class="w-5 h-5" /></button>
              <button @click="emit('delete', product.id)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition" title="Delete"><Icon name="mdi:trash-can" class="w-5 h-5" /></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
