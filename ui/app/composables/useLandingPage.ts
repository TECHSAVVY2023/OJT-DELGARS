import { ref, onMounted } from 'vue';
import { usePageLoading } from '~/composables/usePageLoading';
import { useLandingData } from '~/composables/useLandingData';
import { useClientLoginModal } from '~/composables/useClientLoginModal';
import { useToast } from '~/composables/useToast';
import { useCart } from '~/composables/useCart';
import type { ProductInfo } from '~/types/client';

export function useLandingPage() {
  const { stopLoading } = usePageLoading();
  const { hero, trust, browseCategories, catalog, about, contact } = useLandingData();
  const { showLoginModal, closeLogin } = useClientLoginModal();
  const { success, info: toastInfo } = useToast();
  const { addItem, totalCount } = useCart();

  const productQuantities = ref<Record<number, number>>({});
  const productPriceType = ref<Record<number, 'retail' | 'wholesale'>>({});
  const productInfoModalOpen = ref(false);
  const productInfoModalProduct = ref<ProductInfo | null>(null);

  function underConstruction() {
    toastInfo('Under construction');
  }

  async function onLoginSuccess() {
    success('Login successful!');
    closeLogin();
    await navigateTo('/admin/adminsahboard');
  }

  function updateLoginModal(value: boolean) {
    showLoginModal.value = value;
  }

  function getQuantity(productId: number) {
    return productQuantities.value[productId] ?? 0;
  }

  function setQuantity(productId: number, qty: number) {
    const product = catalog.value.products.find((p: { id: number; stock: number }) => p.id === productId);
    const max = product ? product.stock : 999;
    const next = Math.max(1, Math.min(max, qty));
    productQuantities.value = { ...productQuantities.value, [productId]: next };
  }

  function setPriceType(productId: number, type: 'retail' | 'wholesale') {
    productPriceType.value = { ...productPriceType.value, [productId]: type };
  }

  function handleAddToCart(
    product: { id: number; name: string; image: string; price: string },
    quantity: number,
  ) {
    addItem(product, quantity);
  }

  function openProductInfo(product: ProductInfo) {
    productInfoModalProduct.value = product;
    productInfoModalOpen.value = true;
  }

  function onProductInfoAddToCart(quantity: number) {
    const product = productInfoModalProduct.value;
    if (!product || product.id == null) return;

    addItem(
      {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price as string,
      },
      quantity,
    );

    // Keep local quantity in sync for landing UI
    setQuantity(product.id, getQuantity(product.id) + quantity);
    productInfoModalOpen.value = false;
  }

  onMounted(() => {
    if (catalog.value?.products) {
      const initial: Record<number, number> = {};
      for (const p of catalog.value.products as Array<{ id: number }>) {
        initial[p.id] = 1;
      }
      productQuantities.value = initial;
    }

    setTimeout(stopLoading, 300);
  });

  return {
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
    getQuantity,
    setQuantity,
    setPriceType,
    handleAddToCart,
    openProductInfo,
    onProductInfoAddToCart,
    totalCount,
    underConstruction,
  };
}
