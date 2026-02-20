<script setup lang="ts">
import { ref, computed, watch } from "vue";
import catalogData from "~/data/catalog.json";
import { useToast } from "~/composables/useToast";
import { getCategoryClass, categoryFromQuery } from "~/composables/useCategoryStyle";
import type { ProductInfoWithContext } from "~/types/client";

const data = catalogData as typeof catalogData;
const route = useRoute();
const { info: toastInfo } = useToast();

function underConstruction() {
  toastInfo("Under construction");
}

const selectedCategory = ref(categoryFromQuery(route.query.category as string));
const priceRange = ref([195, 500]);
const selectedWeightRanges = ref<string[]>([]);
const selectedCutTypes = ref<string[]>([]);
const searchQuery = ref("");
const currentPage = ref(1);
const mobileFiltersOpen = ref(false);

const categories = data.categories;
const weightRanges = data.weightRanges;
const cutTypes = data.cutTypes;
const filters = data.filters;
const searchSort = data.searchSort;
const allProducts = data.products;
const newProducts = data.newProducts;
const deals = data.deals;
const promoBanners = data.promoBanners;
const newlyStocked = data.newlyStocked;
const imageSection = data.imageSection;

const productQuantities = ref<Record<number, number>>({});
const newlyStockedQuantities = ref<Record<number, number>>({});
const productPriceType = ref<Record<number, "retail" | "wholesale">>({});
const newlyStockedPriceType = ref<Record<number, "retail" | "wholesale">>({});

const productInfoModalOpen = ref(false);
const productInfoModalProduct = ref<ProductInfoWithContext | null>(null);

function openProductInfo(product: ProductInfoWithContext) {
  productInfoModalProduct.value = product;
  productInfoModalOpen.value = true;
}

function onProductInfoAddToCart(quantity: number) {
  const p = productInfoModalProduct.value;
  if (!p) return;
  if (p._newlyIndex !== undefined) {
    setQuantityNewly(p._newlyIndex, getQuantityNewly(p._newlyIndex) + quantity);
  } else if (p.id != null) {
    setQuantity(p.id, getQuantity(p.id) + quantity);
  }
  productInfoModalOpen.value = false;
}

function getQuantity(productId: number) {
  return productQuantities.value[productId] ?? 0;
}

function setQuantity(productId: number, qty: number) {
  const product = allProducts.find(
    (p: { id: number; stock?: number }) => p.id === productId
  );
  const max = product != null && typeof product.stock === "number" ? Number(product.stock) : 999;
  const next = Math.max(0, Math.min(max, qty));
  productQuantities.value = { ...productQuantities.value, [productId]: next };
}

const NEWLY_STOCKED_MAX_QTY = 99;
function getQuantityNewly(index: number) {
  return newlyStockedQuantities.value[index] ?? 0;
}
function setQuantityNewly(index: number, qty: number) {
  const next = Math.max(0, Math.min(NEWLY_STOCKED_MAX_QTY, qty));
  newlyStockedQuantities.value = { ...newlyStockedQuantities.value, [index]: next };
}
function getPriceTypeNewly(index: number): "retail" | "wholesale" {
  return newlyStockedPriceType.value[index] ?? "retail";
}
function setPriceTypeNewly(index: number, type: "retail" | "wholesale") {
  newlyStockedPriceType.value = { ...newlyStockedPriceType.value, [index]: type };
}

function getPriceType(productId: number): "retail" | "wholesale" {
  return productPriceType.value[productId] ?? "retail";
}

function setPriceType(productId: number, type: "retail" | "wholesale") {
  productPriceType.value = { ...productPriceType.value, [productId]: type };
}

const filteredProducts = computed(() => {
  const low = priceRangeLow.value;
  const high = priceRangeHigh.value;
  return allProducts.filter((product: { category: string; name: string; price: number }) => {
    const categoryMatch =
      selectedCategory.value === "All" || product.category === selectedCategory.value;
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const priceMatch = product.price >= low && product.price <= high;
    return categoryMatch && searchMatch && priceMatch;
  });
});

const itemsPerPage = 8;
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage) || 1;
});

function toggleWeightRange(range: string) {
  const index = selectedWeightRanges.value.indexOf(range);
  if (index > -1) {
    selectedWeightRanges.value.splice(index, 1);
  } else {
    selectedWeightRanges.value.push(range);
  }
}

function toggleCutType(type: string) {
  const index = selectedCutTypes.value.indexOf(type);
  if (index > -1) {
    selectedCutTypes.value.splice(index, 1);
  } else {
    selectedCutTypes.value.push(type);
  }
}

function clampPriceRange() {
  const [a, b] = priceRange.value;
  if (a != null && b != null && a > b) {
    priceRange.value = [b, a];
  }
}

const priceRangeLow = computed(() => Math.min(priceRange.value[0] ?? 0, priceRange.value[1] ?? 0));
const priceRangeHigh = computed(() => Math.max(priceRange.value[0] ?? 0, priceRange.value[1] ?? 0));

watch(totalPages, (pages) => {
  if (currentPage.value > pages) {
    currentPage.value = Math.max(1, pages);
  }
});

// Sync category with route query (e.g. header Categories → catalog?category=Pork)
watch(
  () => route.query.category as string | undefined,
  (category) => {
    selectedCategory.value = categoryFromQuery(category);
  }
);
</script>

<template>
  <div class="min-h-screen bg-white" style="font-family: 'Poppins', sans-serif">
    <ClientHeader />

    <ClientProductInfoModal
      :model-value="productInfoModalOpen"
      :product="productInfoModalProduct"
      :max-quantity="productInfoModalProduct && productInfoModalProduct._newlyIndex !== undefined ? NEWLY_STOCKED_MAX_QTY : (productInfoModalProduct ? (Number(productInfoModalProduct.stock) || 999) : 999)"
      :labels="{
        brandLabel: data.brandLabel,
        retailLabel: data.retailLabel,
        wholesaleLabel: data.wholesaleLabel,
        addLabel: data.addLabel,
        inStockLabel: data.inStockLabel,
      }"
      @update:model-value="productInfoModalOpen = $event"
      @add-to-cart="onProductInfoAddToCart"
    />

    <!-- Newsletter Banner - temporary shrimp icons background; smaller on phone -->
    <section class="relative bg-linear-to-r from-gray-100 to-gray-50 py-8 sm:py-12 lg:py-16 mb-6 sm:mb-8 overflow-hidden">
      <div class="absolute inset-0 opacity-15 pointer-events-none flex flex-wrap justify-center items-center gap-2 sm:gap-4 p-4 sm:p-8" aria-hidden="true">
        <span v-for="i in 80" :key="i" class="text-xl sm:text-3xl md:text-4xl">🦐</span>
      </div>
      <div class="max-w-384 w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          <div class="space-y-2 sm:space-y-4">
            <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {{ data.newsletter.title }}
            </h2>
          </div>
          <div class="flex gap-2 sm:gap-3 flex-col sm:flex-row">
            <input
              type="email"
              :placeholder="data.newsletter.placeholder"
              class="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0101]"
            />
            <button
              type="button"
              class="px-6 py-2 sm:px-8 sm:py-3 bg-[#8B0101] text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-[#6B0001] transition whitespace-nowrap"
              @click="underConstruction"
            >
              {{ data.newsletter.buttonLabel }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content - same margins as landing (align with nav); tighter on phone -->
    <div class="max-w-384 w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-12 sm:pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div
          :class="[
            'lg:col-span-1',
            mobileFiltersOpen
              ? 'fixed inset-0 z-40 overflow-y-auto bg-white'
              : 'hidden lg:block',
          ]"
        >
          <button
            v-if="mobileFiltersOpen"
            type="button"
            aria-label="Close filters"
            class="lg:hidden fixed top-4 right-4 z-50 p-2 text-gray-900 hover:bg-gray-100 rounded-lg"
            @click="mobileFiltersOpen = false"
          >
            <Icon name="mdi:close" class="w-6 h-6" />
          </button>

          <div class="space-y-8 p-4 lg:p-0 pt-12 lg:pt-0">
            <!-- Category Filter -->
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
                  @click="selectedCategory = category.name; mobileFiltersOpen = false"
                >
                  <span class="flex items-center gap-2">
                    <Icon :name="category.icon" class="w-5 h-5 text-[#8B0101]" />
                    <span class="font-medium text-gray-700">{{ category.name }}</span>
                  </span>
                  <span
                    class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                  >
                    {{ category.count }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Price Filter - dynamic track (red between thumbs) -->
            <div class="bg-white border border-gray-200 rounded-xl p-6">
              <h3
                class="text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[#8B0101] inline-block"
              >
                {{ filters.priceTitle }}
              </h3>
              <div class="mt-4 space-y-4">
                <div class="relative flex items-center h-8">
                  <!-- Dynamic track: red between min and max -->
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
                    v-model.number="priceRange[0]"
                    type="range"
                    min="0"
                    max="1000"
                    class="price-range-input absolute w-full h-8 appearance-none bg-transparent cursor-pointer z-10"
                    @input="clampPriceRange"
                  />
                  <input
                    v-model.number="priceRange[1]"
                    type="range"
                    min="0"
                    max="1000"
                    class="price-range-input absolute w-full h-8 appearance-none bg-transparent cursor-pointer z-10"
                    @input="clampPriceRange"
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
                    @change="toggleWeightRange(range)"
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
                    @change="toggleCutType(type)"
                  />
                  <span class="text-sm text-gray-700">{{ type }}</span>
                </label>
              </div>
              <button
                type="button"
                class="w-full mt-6 px-6 py-2 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition flex items-center justify-center gap-2"
                @click="underConstruction"
              >
                <Icon name="mdi:arrow-right" class="w-4 h-4" />
                {{ filters.applyLabel }}
              </button>
            </div>

            <!-- New Products -->
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

            <!-- Available Soon -->
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

        <!-- Main Content -->
        <div class="lg:col-span-3 space-y-8">
          <!-- Search and Sort Bar -->
          <div
            class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
          >
            <button
              type="button"
              class="lg:hidden px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition flex items-center gap-2"
              @click="mobileFiltersOpen = true"
            >
              <Icon name="mdi:filter-menu" class="w-5 h-5" />
              {{ searchSort.filtersLabel }}
            </button>
            <div class="flex-1 relative w-full sm:w-auto">
              <div class="flex gap-2">
                <select
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0101]"
                >
                  <option>{{ searchSort.allCategoriesOption }}</option>
                  <option>Pork</option>
                  <option>Chicken</option>
                  <option>Beef</option>
                  <option>Seafood</option>
                </select>
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="searchSort.searchPlaceholder"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0101]"
                />
                <button
                  type="button"
                  class="px-4 py-2 bg-[#8B0101] text-white rounded-lg hover:bg-[#6B0001] transition"
                  @click="underConstruction"
                >
                  <Icon name="mdi:magnify" class="w-5 h-5" />
                </button>
              </div>
            </div>
            <button
              type="button"
              class="flex items-center gap-2 text-[#8B0101] font-medium hover:opacity-80 transition whitespace-nowrap"
              @click="underConstruction"
            >
              <Icon name="mdi:compare" class="w-5 h-5" />
              {{ searchSort.compareLabel }}
            </button>
          </div>

          <!-- Products Grid - 4 per line, landing-style cards; smaller on phone -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <ClientProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="{
                name: product.name,
                category: product.category,
                price: product.price,
                image: product.image,
                badge: product.badge,
                categoryClass: getCategoryClass(product.category),
                inStock: product.inStock,
                stock: product.stock,
              }"
              :quantity="getQuantity(product.id)"
              :max-quantity="Number(product.stock) || 999"
              :price-type="getPriceType(product.id)"
              :labels="{
                brandLabel: data.brandLabel,
                retailLabel: data.retailLabel,
                wholesaleLabel: data.wholesaleLabel,
                addLabel: data.addLabel,
                inStockLabel: data.inStockLabel,
              }"
              @update:quantity="setQuantity(product.id, $event)"
              @update:price-type="setPriceType(product.id, $event)"
              @open-info="openProductInfo(product)"
            />
          </div>

          <ClientPagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @update:current-page="currentPage = $event"
          />

          <!-- Deals of the Day; smaller on phone -->
          <section class="py-8 sm:py-12">
            <div class="flex items-center justify-between mb-4 sm:mb-8 flex-wrap gap-2">
              <ClientSectionTitle
                :highlight-text="deals.titleHighlight"
                :rest-text="deals.titleRest"
              />
              <NuxtLink
                to="/client/catalog"
                class="text-[#8B0101] font-semibold hover:opacity-80 transition"
              >
                {{ deals.allDealsLabel }}
              </NuxtLink>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              <ClientDealCard
                v-for="(product, index) in deals.items"
                :key="index"
                :product="product"
                :brand-label="data.brandLabel"
                :add-label="data.addLabel"
              />
            </div>
          </section>
        </div>
      </div>

      <!-- Bring fresh meats + Newly stocked: same left margin as Available soon -->
      <section class="py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-1 relative min-h-80 sm:min-h-112 h-112 sm:h-140 rounded-xl overflow-hidden shadow-lg order-2 lg:order-1">
            <div
              class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4 sm:p-6"
            >
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">{{ imageSection.mainTitle }}</h3>
              <p class="text-xs sm:text-sm">{{ imageSection.mainSubtitle }}</p>
            </div>
            <img
              :src="imageSection.mainImage"
              alt="Fresh meats"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="lg:col-span-2 order-1 lg:order-2">
            <div class="flex items-center justify-between mb-4 sm:mb-8 flex-wrap gap-2 sm:gap-4">
              <ClientSectionTitle
                :highlight-text="newlyStocked.titleHighlight"
                :rest-text="newlyStocked.titleRest"
              />
              <div class="flex gap-1.5 sm:gap-2 flex-wrap">
                <button
                  v-for="cat in newlyStocked.categoryFilters"
                  :key="cat"
                  type="button"
                  class="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-full text-xs sm:text-sm font-medium hover:border-[#8B0101] hover:text-[#8B0101] transition"
                  @click="underConstruction"
                >
                  {{ cat }}
                </button>
              </div>
            </div>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
            >
              <ClientProductCard
                v-for="(product, idx) in newlyStocked.items"
                :key="`${product.name}-${idx}`"
                :product="{
                  name: product.name,
                  category: product.category,
                  price: product.price,
                  image: product.image,
                  badge: product.category,
                  categoryClass: getCategoryClass(product.category),
                  inStock: product.inStock,
                  stock: 99,
                }"
                :quantity="getQuantityNewly(idx)"
                :max-quantity="NEWLY_STOCKED_MAX_QTY"
                :price-type="getPriceTypeNewly(idx)"
                :labels="{
                  brandLabel: data.brandLabel,
                  retailLabel: data.retailLabel,
                  wholesaleLabel: data.wholesaleLabel,
                  addLabel: data.addLabel,
                  inStockLabel: data.inStockLabel,
                }"
                @update:quantity="setQuantityNewly(idx, $event)"
                @update:price-type="setPriceTypeNewly(idx, $event)"
                @open-info="openProductInfo({ ...product, stock: 99, _newlyIndex: idx })"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Promotional Banners: full-width row; smaller on phone -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 py-6 sm:py-8">
        <ClientPromoBannerCard
          v-for="(banner, i) in promoBanners"
          :key="i"
          :title="banner.title"
          :cta-label="banner.ctaLabel"
          :image="banner.image"
        />
      </section>
    </div>

    <ClientFooter />
    <ClientFab />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap");

html {
  scroll-behavior: smooth;
}

/* Fill by price: transparent track, only thumbs visible; track color is the div behind */
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
