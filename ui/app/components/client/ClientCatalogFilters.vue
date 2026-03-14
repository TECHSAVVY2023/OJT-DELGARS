<script setup lang="ts">
interface CategoryItem {
  name: string;
  count: number;
  icon: string;
}

interface FilterLabels {
  categoryTitle: string;
  priceTitle: string;
  fromLabel: string;
  toLabel: string;
  weightTitle: string;
  cutTypeTitle: string;
  applyLabel: string;
  newProductsTitle: string;
  availableSoonTitle: string;
}

interface NewProduct {
  name: string;
  price: number;
  image: string;
}

interface ImageSection {
  mainImage: string;
}

const props = defineProps<{
  mobileOpen: boolean;
  categories: CategoryItem[];
  filters: FilterLabels;
  weightRanges: string[];
  cutTypes: string[];
  newProducts: NewProduct[];
  imageSection: ImageSection;
  selectedCategory: string;
  priceRange: [number, number];
  priceRangeLow: number;
  priceRangeHigh: number;
  selectedWeightRanges: string[];
  selectedCutTypes: string[];
}>();

const emit = defineEmits<{
  "update:selectedCategory": [value: string];
  "update:priceRange": [value: [number, number]];
  "toggleWeightRange": [range: string];
  "toggleCutType": [type: string];
  close: [];
  apply: [];
}>();

function clampPriceRange() {
  const [a, b] = props.priceRange;
  if (a != null && b != null && a > b) {
    emit("update:priceRange", [b, a]);
  }
}
</script>

<template>
  <div
    :class="[
      'lg:col-span-1',
      mobileOpen ? 'fixed inset-0 z-40 overflow-y-auto bg-white' : 'hidden lg:block',
    ]"
  >
    <button
      v-if="mobileOpen"
      type="button"
      aria-label="Close filters"
      class="lg:hidden fixed top-4 right-4 z-50 p-2 text-gray-900 hover:bg-gray-100 rounded-lg"
      @click="emit('close')"
    >
      <Icon name="mdi:close" class="w-6 h-6" />
    </button>

    <div class="space-y-8 p-4 lg:p-0 pt-12 lg:pt-0">
      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <h3
          class="text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[#8B0101] inline-block"
        >
          {{ filters.categoryTitle }}
        </h3>
        <div class="space-y-3 mt-4">
          <button
            v-for="category in categories"
            :key="category.name"
            type="button"
            :class="[
              'w-full flex items-center justify-between p-3 rounded-lg transition',
              selectedCategory === category.name
                ? 'bg-gray-100 border-l-4 border-[#8B0101]'
                : 'hover:bg-gray-50',
            ]"
            @click="emit('update:selectedCategory', category.name); emit('close')"
          >
            <span class="flex items-center gap-2">
              <Icon :name="category.icon" class="w-5 h-5 text-[#8B0101]" />
              <span class="font-medium text-gray-700">{{ category.name }}</span>
            </span>
            <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {{ category.count }}
            </span>
          </button>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <h3
          class="text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[#8B0101] inline-block"
        >
          {{ filters.priceTitle }}
        </h3>
        <div class="mt-4 space-y-4">
          <div class="relative flex items-center h-8">
            <div
              class="absolute inset-0 flex items-center pointer-events-none"
              aria-hidden="true"
            >
              <div
                class="h-2 w-full rounded-full"
                :style="{
                  background: `linear-gradient(to right, #d1d5db 0%, #d1d5db ${priceRangeLow / 10}%, #8B0101 ${priceRangeLow / 10}%, #8B0101 ${priceRangeHigh / 10}%, #d1d5db ${priceRangeHigh / 10}%, #d1d5db 100%)`,
                }"
              />
            </div>
            <input
              :value="priceRange[0]"
              type="range"
              min="0"
              max="1000"
              class="price-range-input absolute w-full h-8 appearance-none bg-transparent cursor-pointer z-10"
              @input="
                emit('update:priceRange', [Number(($event.target as HTMLInputElement)?.value), priceRange[1]]);
                clampPriceRange();
              "
            />
            <input
              :value="priceRange[1]"
              type="range"
              min="0"
              max="1000"
              class="price-range-input absolute w-full h-8 appearance-none bg-transparent cursor-pointer z-10"
              @input="
                emit('update:priceRange', [priceRange[0], Number(($event.target as HTMLInputElement)?.value)]);
                clampPriceRange();
              "
            />
          </div>
          <div class="flex justify-between text-sm">
            <span class="font-semibold text-[#8B0101]"
              >{{ filters.fromLabel }}: ₱{{ priceRangeLow }}.00</span
            >
            <span class="font-semibold text-[#8B0101]"
              >{{ filters.toLabel }}: ₱{{ priceRangeHigh }}.00</span
            >
          </div>
          <div class="mt-6 space-y-3">
            <h4 class="font-semibold text-gray-700 text-sm">{{ filters.weightTitle }}</h4>
            <label
              v-for="range in weightRanges"
              :key="range"
              class="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                :checked="selectedWeightRanges.includes(range)"
                class="w-4 h-4 rounded border-gray-300 text-[#8B0101]"
                @change="emit('toggleWeightRange', range)"
              />
              <span class="text-sm text-gray-700">{{ range }}</span>
            </label>
          </div>
          <div class="mt-6 space-y-3">
            <h4 class="font-semibold text-gray-700 text-sm">{{ filters.cutTypeTitle }}</h4>
            <label
              v-for="type in cutTypes"
              :key="type"
              class="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                :checked="selectedCutTypes.includes(type)"
                class="w-4 h-4 rounded border-gray-300 text-[#8B0101]"
                @change="emit('toggleCutType', type)"
              />
              <span class="text-sm text-gray-700">{{ type }}</span>
            </label>
          </div>
          <button
            type="button"
            class="w-full mt-6 px-6 py-2 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition flex items-center justify-center gap-2"
            @click="emit('apply')"
          >
            <Icon name="mdi:arrow-right" class="w-4 h-4" />
            {{ filters.applyLabel }}
          </button>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <h3
          class="text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[#8B0101] inline-block"
        >
          {{ filters.newProductsTitle }}
        </h3>
        <div class="space-y-4 mt-4">
          <div
            v-for="product in newProducts"
            :key="product.name"
            class="flex gap-3 cursor-pointer hover:opacity-80 transition"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-16 h-16 rounded-lg object-cover"
            />
            <div class="flex-1">
              <p class="font-semibold text-gray-900 text-sm">{{ product.name }}</p>
              <p class="text-[#8B0101] font-bold">₱{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-8 bg-[#8B0101]" />
          <h3 class="text-lg font-bold text-gray-900">{{ filters.availableSoonTitle }}</h3>
        </div>
        <div class="space-y-4">
          <div
            v-for="i in 6"
            :key="i"
            class="flex gap-3 cursor-pointer hover:opacity-80 transition"
          >
            <img
              :src="imageSection.mainImage"
              alt="Product"
              class="w-16 h-16 rounded-lg object-cover"
            />
            <div class="flex-1">
              <p class="font-semibold text-gray-900 text-sm">Sample Product {{ i }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price-range-input {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  height: 2rem;
}

.price-range-input::-webkit-slider-runnable-track {
  background: transparent;
  height: 0.5rem;
}

.price-range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  margin-top: -6px;
  border-radius: 50%;
  background: #8b0101;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.price-range-input::-moz-range-track {
  background: transparent;
  height: 0.5rem;
}

.price-range-input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #8b0101;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
