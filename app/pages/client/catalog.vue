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
        inStockLabel: data.inStockLabel,
      }"
      @update:model-value="productInfoModalOpen = $event"
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

          <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
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
              @add-to-cart="(qty: number) => addItem({ id: product.id, name: product.name, image: product.image, price: product.price }, qty)"
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

<script setup lang="ts">
import { useCatalogPage } from "~/composables/useCatalogPage";

const {
  data,
  categories,
  weightRanges,
  cutTypes,
  filters,
  searchSort,
  newProducts,
  deals,
  promoBanners,
  newlyStocked,
  imageSection,
  selectedCategory,
  priceRange,
  selectedWeightRanges,
  selectedCutTypes,
  searchQuery,
  currentPage,
  mobileFiltersOpen,
  productQuantities,
  newlyStockedQuantities,
  productPriceType,
  newlyStockedPriceType,
  productInfoModalOpen,
  productInfoModalProduct,
  addItem,
  NEWLY_STOCKED_MAX_QTY,
  getCategoryClass,
  underConstruction,
  openProductInfo,
  onProductInfoAddToCart,
  getQuantity,
  setQuantity,
  getQuantityNewly,
  setQuantityNewly,
  getPriceType,
  setPriceType,
  getPriceTypeNewly,
  setPriceTypeNewly,
  filteredProducts,
  paginatedProducts,
  totalPages,
  toggleWeightRange,
  toggleCutType,
  onPriceRangeUpdate,
  priceRangeLow,
  priceRangeHigh,
} = useCatalogPage();
</script>