<script setup lang="ts">
import { usePageLoading } from "~/composables/usePageLoading";
import { useLandingData } from "~/composables/useLandingData";
import { useClientLoginModal } from "~/composables/useClientLoginModal";
import { useToast } from "~/composables/useToast";
import { ref } from "vue";

const { stopLoading } = usePageLoading();
const { hero, trust, browseCategories, catalog, about, contact } = useLandingData();
const { showLoginModal, closeLogin } = useClientLoginModal();
const { success, info: toastInfo } = useToast();

function underConstruction() {
  toastInfo("Under construction");
}

async function onLoginSuccess() {
  success("Login successful!");
  closeLogin();
  await navigateTo("/admin/adminsahboard");
}

function updateLoginModal(value: boolean) {
  showLoginModal.value = value;
}

const productQuantities = ref<Record<number, number>>({});
const productPriceType = ref<Record<number, "retail" | "wholesale">>({});

function getQuantity(productId: number) {
  return productQuantities.value[productId] ?? 0;
}

function setQuantity(productId: number, qty: number) {
  const product = catalog.value.products.find(
    (p: { id: number; stock: number }) => p.id === productId
  );
  const max = product ? product.stock : 999;
  const next = Math.max(0, Math.min(max, qty));
  productQuantities.value = { ...productQuantities.value, [productId]: next };
}

function setPriceType(productId: number, type: "retail" | "wholesale") {
  productPriceType.value = { ...productPriceType.value, [productId]: type };
}

onMounted(() => {
  setTimeout(() => {
    stopLoading();
  }, 300);
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <ClientHeader />

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
