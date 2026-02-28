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
const priceRange = ref<[number, number]>([195, 500]);
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

function onPriceRangeUpdate(v: [number, number]) {
  priceRange.value = [v[0], v[1]];
  clampPriceRange();
}

const priceRangeLow = computed(() => Math.min(priceRange.value[0] ?? 0, priceRange.value[1] ?? 0));
const priceRangeHigh = computed(() => Math.max(priceRange.value[0] ?? 0, priceRange.value[1] ?? 0));

watch(totalPages, (pages) => {
  if (currentPage.value > pages) {
    currentPage.value = Math.max(1, pages);
  }
});

watch(
  () => route.query.category as string | undefined,
  (category) => {
    selectedCategory.value = categoryFromQuery(category);
  }
);
</script>

<template>
  <div class="min-h-screen bg-white">
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

    <ClientNewsletterBanner
      :title="data.newsletter.title"
      :placeholder="data.newsletter.placeholder"
      :button-label="data.newsletter.buttonLabel"
      @subscribe="underConstruction"
    />

    <div class="max-w-384 w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-12 sm:pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <ClientCatalogFilters
          :mobile-open="mobileFiltersOpen"
          :categories="categories"
          :filters="filters"
          :weight-ranges="weightRanges"
          :cut-types="cutTypes"
          :new-products="newProducts"
          :image-section="imageSection"
          :selected-category="selectedCategory"
          :price-range="priceRange"
          :price-range-low="priceRangeLow"
          :price-range-high="priceRangeHigh"
          :selected-weight-ranges="selectedWeightRanges"
          :selected-cut-types="selectedCutTypes"
          @update:selected-category="selectedCategory = $event"
          @update:price-range="onPriceRangeUpdate"
          @toggle-weight-range="toggleWeightRange"
          @toggle-cut-type="toggleCutType"
          @close="mobileFiltersOpen = false"
          @apply="underConstruction"
        />

        <div class="lg:col-span-3 space-y-8">
          <ClientCatalogSearchSort
            :all-categories-option="searchSort.allCategoriesOption"
            :search-placeholder="searchSort.searchPlaceholder"
            :filters-label="searchSort.filtersLabel"
            :compare-label="searchSort.compareLabel"
            :search-query="searchQuery"
            @update:search-query="searchQuery = $event"
            @open-filters="mobileFiltersOpen = true"
            @compare="underConstruction"
            @search="underConstruction"
          />

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

          <ClientDealsSection
            :title-highlight="deals.titleHighlight"
            :title-rest="deals.titleRest"
            :all-deals-label="deals.allDealsLabel"
            :items="deals.items"
            :brand-label="data.brandLabel"
            :add-label="data.addLabel"
          />
        </div>
      </div>

      <ClientNewlyStockedSection
        :image-section="imageSection"
        :title-highlight="newlyStocked.titleHighlight"
        :title-rest="newlyStocked.titleRest"
        :category-filters="newlyStocked.categoryFilters"
        :items="newlyStocked.items"
        :quantity-map="newlyStockedQuantities"
        :price-type-map="newlyStockedPriceType"
        :labels="{
          brandLabel: data.brandLabel,
          retailLabel: data.retailLabel,
          wholesaleLabel: data.wholesaleLabel,
          addLabel: data.addLabel,
          inStockLabel: data.inStockLabel,
        }"
        :max-quantity="NEWLY_STOCKED_MAX_QTY"
        @update:quantity="(idx, val) => setQuantityNewly(idx, val)"
        @update:price-type="(idx, type) => setPriceTypeNewly(idx, type)"
        @open-info="openProductInfo($event)"
        @filter-click="underConstruction"
      />

      <ClientPromoBannersSection :banners="promoBanners" />
    </div>

    <ClientFooter />
    <ClientFab />
  </div>
</template>
