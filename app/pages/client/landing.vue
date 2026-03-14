
<template>
  <div class="min-h-screen bg-white">
    <ClientHeader />

    <ClientProductInfoModal
      :model-value="productInfoModalOpen"
      :product="productInfoModalProduct"
      :max-quantity="productInfoModalProduct ? (Number(productInfoModalProduct.stock) || 999) : 999"
      :labels="{
        brandLabel: 'By Delgar',
        retailLabel: 'RETAIL',
        wholesaleLabel: 'WHOLESALE',
        inStockLabel: '1 in stock',
      }"
      @update:model-value="productInfoModalOpen = $event"
    />

    <ClientLandingHero
      :title-parts="hero.titleParts"
      :intro="hero.intro"
      :cta-label="hero.ctaLabel"
    />

    <ClientTrustSection
      :title="trust.title"
      :title-highlight="trust.titleHighlight"
      :subtitle="trust.subtitle"
      :reasons="trust.reasons"
    />

    <ClientBrowseCategories
      :label="browseCategories.label"
      :section-title="browseCategories.sectionTitle"
      :items="browseCategories.items"
    />

    <ClientLandingProducts
      :products-label="catalog.productsLabel"
      :section-title="catalog.sectionTitle"
      :search-placeholder="catalog.searchPlaceholder"
      :explore-more-label="catalog.exploreMoreLabel"
      :products="catalog.products"
      :quantity-map="productQuantities"
      :price-type-map="productPriceType"
      :labels="{
        brandLabel: 'By Delgar',
        retailLabel: 'RETAIL',
        wholesaleLabel: 'WHOLESALE',
        addLabel: 'Add',
        inStockLabel: '1 in stock',
      }"
      @update:quantity="(id, value) => setQuantity(id, value)"
      @update:price-type="(id, type) => setPriceType(id, type)"
      @search="underConstruction"
      @add-to-cart="handleAddToCart"
      @open-info="openProductInfo"
    />

    <ClientAboutSection
      :title="about.title"
      :paragraphs="about.paragraphs"
      :social-links="about.socialLinks"
      :cta-label="about.ctaLabel"
      cta-href="/client/about-us"
    />

    <ClientContactSection
      :left-title="contact.leftTitle"
      :left-subtitle="contact.leftSubtitle"
      :map-query="contact.mapQuery"
      :right-title="contact.rightTitle"
      :right-subtitle="contact.rightSubtitle"
      :form-placeholders="contact.formPlaceholders"
      :subject-label="contact.subjectLabel"
      :subjects="contact.subjects"
      :send-button-label="contact.sendButtonLabel"
      @send="underConstruction"
    />

    <ClientFooter />
    <ClientFab />

    <ClientLoginModal
      :model-value="showLoginModal"
      @update:model-value="updateLoginModal"
      @success="onLoginSuccess"
    />
  </div>
</template>

<style scoped>
:global(html) {
  scroll-behavior: smooth;
}
</style>

<script setup lang="ts">
import { useLandingPage } from '~/composables/useLandingPage';

const {
  hero,
  trust,
  browseCategories,
  catalog,
  about,
  contact,
  showLoginModal,
  updateLoginModal,
  onLoginSuccess,
  productQuantities,
  productPriceType,
  productInfoModalOpen,
  productInfoModalProduct,
  setQuantity,
  setPriceType,
  handleAddToCart,
  openProductInfo,
  onProductInfoAddToCart,
  underConstruction,
} = useLandingPage();
</script>
