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
  editForm: ProductEditForm;
  stores: string[];
  categoryOptions: string[];
  brandOptions: string[];
  units: string[];
  sellingTypes: string[];
  barcodeSymbologies: string[];
}>();
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2 text-gray-700">
      <Icon name="mdi:information" class="w-5 h-5 text-amber-500" />
      <h3 class="font-semibold">Product Information</h3>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Store</label>
        <select v-model="props.editForm.store" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
          <option v-for="s in props.stores" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Storage</label>
        <select v-model="props.editForm.storage" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
          <option value="Cold Storage">Cold Storage</option>
          <option value="Dry Storage">Dry Storage</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Product Name <span class="text-red-500">*</span></label>
        <input v-model="props.editForm.productName" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Slug</label>
        <input v-model="props.editForm.slug" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0101] focus:border-transparent" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">SKU</label>
        <input :value="props.editForm.sku" type="text" readonly class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
        <p class="text-[10px] text-gray-400 mt-0.5">Cannot be changed</p>
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Selling Type</label>
        <select v-model="props.editForm.sellingType" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
          <option v-for="t in props.sellingTypes" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Category</label>
        <select v-model="props.editForm.category" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
          <option value="">Select</option>
          <option v-for="c in props.categoryOptions" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Brand</label>
        <select v-model="props.editForm.brand" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
          <option value="">Select</option>
          <option v-for="b in props.brandOptions" :key="b" :value="b">{{ b }}</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Unit</label>
        <select v-model="props.editForm.unit" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
          <option v-for="u in props.units" :key="u" :value="u">{{ u }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Item Code</label>
        <input :value="props.editForm.itemCode" type="text" readonly class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
        <p class="text-[10px] text-gray-400 mt-0.5">Cannot be changed</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Barcode Symbology</label>
        <select v-model="props.editForm.barcodeSymbology" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#8B0101] focus:border-transparent">
          <option v-for="sym in props.barcodeSymbologies" :key="sym" :value="sym">{{ sym }}</option>
        </select>
      </div>
      <div></div>
    </div>

    <div>
      <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
      <div class="border border-gray-300 rounded-lg overflow-hidden">
        <div class="bg-gray-50 border-b border-gray-300 p-2 flex items-center gap-1">
          <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:format-bold" class="w-5 h-5 text-gray-600" /></button>
          <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:format-italic" class="w-5 h-5 text-gray-600" /></button>
          <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:format-underline" class="w-5 h-5 text-gray-600" /></button>
          <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:format-strikethrough" class="w-5 h-5 text-gray-600" /></button>
          <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:link" class="w-5 h-5 text-gray-600" /></button>
          <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:format-list-bulleted" class="w-5 h-5 text-gray-600" /></button>
          <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:format-list-numbered" class="w-5 h-5 text-gray-600" /></button>
          <button type="button" class="p-1 hover:bg-gray-200 rounded"><Icon name="mdi:code-tags" class="w-5 h-5 text-gray-600" /></button>
        </div>
        <textarea v-model="props.editForm.description" placeholder="Type your message" class="w-full px-4 py-3 text-sm outline-none resize-none" rows="6"></textarea>
      </div>
      <p class="text-xs text-gray-500 mt-2">Maximum 60 Words</p>
      <div class="mt-2 flex gap-2 text-gray-600">
        <button type="button" class="p-1 hover:bg-gray-100 rounded"><Icon name="mdi:attachment" class="w-5 h-5" /></button>
        <button type="button" class="p-1 hover:bg-gray-100 rounded"><Icon name="mdi:emoticon" class="w-5 h-5" /></button>
        <button type="button" class="p-1 hover:bg-gray-100 rounded"><Icon name="mdi:trash-can" class="w-5 h-5" /></button>
      </div>
    </div>
  </div>
</template>