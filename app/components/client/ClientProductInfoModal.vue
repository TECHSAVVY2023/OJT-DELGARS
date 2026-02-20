<script setup lang="ts">
import { ref, watch, onBeforeUnmount, computed } from "vue";
import { getCategoryClass } from "~/composables/useCategoryStyle";
import type { ProductInfo } from "~/types/client";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    product: ProductInfo | null;
    maxQuantity?: number;
    labels?: {
      brandLabel: string;
      retailLabel: string;
      wholesaleLabel: string;
      addLabel: string;
      inStockLabel: string;
    };
  }>(),
  {
    maxQuantity: 999,
    labels: () => ({
      brandLabel: "By Delgar",
      retailLabel: "RETAIL",
      wholesaleLabel: "WHOLESALE",
      addLabel: "Add",
      inStockLabel: "1 in stock",
    }),
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "add-to-cart": [quantity: number];
}>();

const activeTab = ref<"description" | "additional" | "vendor">("description");
const selectedWeight = ref("60g");
const modalQuantity = ref(0);

const weightOptions = ["50g", "60g", "80g", "100g", "150g"];

// Thumbnails: use product image or logo (same as main for now)
const galleryImages = computed(() => {
  const img = props.product?.image ?? "/logo/delgar-logo.png";
  return [img, img, img, img];
});

const selectedImage = ref(0);

const displayPrice = computed(() => {
  const p = props.product?.price;
  return typeof p === "number" ? `₱${p}.00` : `₱${p ?? "0"}`;
});

const stockText = computed(() => {
  const s = props.product?.stock ?? 0;
  return `${s} Items In Stock`;
});

const sku = computed(() => {
  const id = props.product?.id ?? 0;
  return `FWM${id}VKT`;
});

const close = () => {
  emit("update:modelValue", false);
};

const onAddToCart = () => {
  if (modalQuantity.value > 0) {
    emit("add-to-cart", modalQuantity.value);
    modalQuantity.value = 0;
    close();
  }
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.modelValue) close();
};

watch(
  () => props.modelValue,
  (open) => {
    if (import.meta.client) {
      document.documentElement.style.overflow = open ? "hidden" : "";
      window.removeEventListener("keydown", onKeyDown);
      if (open) {
        window.addEventListener("keydown", onKeyDown);
        activeTab.value = "description";
        selectedImage.value = 0;
        modalQuantity.value = 0;
      }
    }
  }
);

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.documentElement.style.overflow = "";
    window.removeEventListener("keydown", onKeyDown);
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-backdrop" appear>
      <div
        v-if="modelValue && product"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 overflow-hidden"
        @click.self="close"
      >
        <Transition name="modal-panel" appear>
          <div
            v-if="modelValue && product"
            class="relative w-full max-w-7xl max-h-[90vh] my-4 flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Product information"
          >
            <button
              type="button"
              class="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-700 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0101]"
              aria-label="Close"
              @click="close"
            >
              <Icon name="mdi:close" class="h-5 w-5" />
            </button>

            <!-- Scrollable content: two columns + tabs -->
            <div class="flex-1 min-h-0 overflow-y-auto">
            <!-- Top: Two columns - Image gallery | Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
              <!-- Left: Product images -->
              <div class="space-y-3">
                <div class="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  <img
                    :src="galleryImages[selectedImage]"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                  <span class="absolute top-3 right-3 rounded-full bg-white/80 p-2 text-gray-600" aria-hidden="true">
                    <Icon name="mdi:magnify" class="w-5 h-5" />
                  </span>
                </div>
                <div class="flex gap-2">
                  <button
                    v-for="(img, i) in galleryImages"
                    :key="i"
                    type="button"
                    :class="[
                      'flex-1 aspect-square rounded-lg overflow-hidden border-2 object-cover transition',
                      selectedImage === i ? 'border-[#8B0101]' : 'border-gray-200 hover:border-gray-300',
                    ]"
                    @click="selectedImage = i"
                  >
                    <img :src="img" :alt="`${product.name} view ${i + 1}`" class="w-full h-full object-cover" />
                  </button>
                </div>
              </div>

              <!-- Right: Product details -->
              <div class="flex flex-col">
                <span
                  :class="[
                    'inline-flex px-3 py-1 rounded-full text-sm font-semibold text-white w-fit',
                    getCategoryClass(product.category),
                  ]"
                >
                  {{ product.badge ?? product.category }}
                </span>
                <h2 class="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
                  {{ product.name }}
                </h2>
                <p class="mt-1 text-xl font-bold text-[#8B0101]">
                  {{ displayPrice }}
                </p>
                <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <!-- Size / Weight -->
                <p class="mt-4 text-sm font-semibold text-gray-700">Size / Weight:</p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <button
                    v-for="w in weightOptions"
                    :key="w"
                    type="button"
                    :class="[
                      'px-4 py-2 rounded text-sm font-medium transition',
                      selectedWeight === w
                        ? 'bg-[#8B0101] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    ]"
                    @click="selectedWeight = w"
                  >
                    {{ w }}
                  </button>
                </div>

                <!-- Quantity + Add to cart -->
                <div class="mt-6 flex flex-wrap items-center gap-3">
                  <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden" role="group" aria-label="Quantity">
                    <button
                      type="button"
                      class="w-10 h-10 flex items-center justify-center bg-blue-400 text-white hover:bg-blue-500 transition disabled:opacity-50"
                      :disabled="modalQuantity <= 0"
                      aria-label="Decrease quantity"
                      @click="modalQuantity = Math.max(0, modalQuantity - 1)"
                    >
                      <Icon name="mdi:minus" class="w-5 h-5" />
                    </button>
                    <input
                      v-model.number="modalQuantity"
                      type="number"
                      min="0"
                      :max="maxQuantity"
                      aria-label="Quantity to add"
                      class="w-14 h-10 text-center text-gray-900 border-0 border-x border-gray-200 focus:outline-none focus:ring-0"
                    />
                    <button
                      type="button"
                      class="w-10 h-10 flex items-center justify-center bg-blue-400 text-white hover:bg-blue-500 transition disabled:opacity-50"
                      :disabled="modalQuantity >= maxQuantity"
                      aria-label="Increase quantity"
                      @click="modalQuantity = Math.min(maxQuantity, modalQuantity + 1)"
                    >
                      <Icon name="mdi:plus" class="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition"
                    :aria-label="`Add ${modalQuantity} to cart`"
                    @click="onAddToCart"
                  >
                    <Icon name="mdi:cart" class="w-5 h-5" />
                    Add to cart
                  </button>
                </div>

                <!-- Meta -->
                <div class="mt-6 pt-4 border-t border-gray-200 space-y-1 text-sm text-gray-600">
                  <p>Type: {{ product.category }}</p>
                  <p>SKU: {{ sku }}</p>
                  <p>Tags: {{ product.category }}</p>
                  <p>
                    Stock: <span class="text-[#8B0101] font-semibold">{{ stockText }}</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Tabs: Description, Additional info, Vendor -->
            <div class="border-t border-gray-200 bg-gray-50" role="tablist" aria-label="Product details">
              <div class="flex border-b border-gray-200 px-6 sm:px-8">
                <button
                  type="button"
                  role="tab"
                  :aria-selected="activeTab === 'description'"
                  :class="[
                    'py-4 px-4 mr-6 text-sm font-semibold transition border-b-2 -mb-px',
                    activeTab === 'description'
                      ? 'text-[#8B0101] border-[#8B0101]'
                      : 'text-gray-500 border-transparent hover:text-gray-700',
                  ]"
                  @click="activeTab = 'description'"
                >
                  Description
                </button>
                <button
                  type="button"
                  role="tab"
                  :aria-selected="activeTab === 'additional'"
                  :class="[
                    'py-4 px-4 mr-6 text-sm font-semibold transition border-b-2 -mb-px',
                    activeTab === 'additional'
                      ? 'text-[#8B0101] border-[#8B0101]'
                      : 'text-gray-500 border-transparent hover:text-gray-700',
                  ]"
                  @click="activeTab = 'additional'"
                >
                  Additional info
                </button>
                <button
                  type="button"
                  role="tab"
                  :aria-selected="activeTab === 'vendor'"
                  :class="[
                    'py-4 px-4 text-sm font-semibold transition border-b-2 -mb-px',
                    activeTab === 'vendor'
                      ? 'text-[#8B0101] border-[#8B0101]'
                      : 'text-gray-500 border-transparent hover:text-gray-700',
                  ]"
                  @click="activeTab = 'vendor'"
                >
                  Vendor
                </button>
              </div>
              <div class="p-6 sm:p-8 text-gray-700 text-sm leading-relaxed" role="tabpanel" :aria-label="activeTab === 'description' ? 'Description' : activeTab === 'additional' ? 'Additional info' : 'Vendor'">
                <!-- Description tab -->
                <div v-show="activeTab === 'description'" class="space-y-6">
                  <p>
                    Delgar {{ product.name }} is carefully prepared to deliver fresh taste, clean cuts, and dependable quality.
                    Each piece is expertly handled and frozen to preserve natural flavor, texture, and freshness.
                    Ideal for everyday meals, it offers convenience without compromising taste or quality.
                  </p>
                  <ul class="list-disc list-inside space-y-1">
                    <li><strong>Type Of Product:</strong> {{ product.category }}</li>
                    <li><strong>Cut:</strong> Deboned, cleaned</li>
                    <li><strong>Packaging:</strong> Vacuum sealed</li>
                    <li><strong>Weight options:</strong> Various</li>
                    <li><strong>Origin:</strong> Sourced with care</li>
                  </ul>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-2">Packaging & Storage</h4>
                    <p>
                      Our product is vacuum-packed and stored under controlled freezing conditions to maintain freshness and quality.
                      Keep frozen at recommended temperatures until ready for use. Do not refreeze once thawed.
                    </p>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-2">Suggested Use</h4>
                    <p>
                      Best for frying, grilling, or marinating. Thaw properly before cooking and season according to your preferred recipe.
                      Suitable for daily home cooking or food service use.
                    </p>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-2">Warnings</h4>
                    <p>
                      Keep the product frozen until ready for use to maintain freshness and quality. Thaw properly in the refrigerator
                      before cooking and handle with care to avoid contamination and ensure food safety.
                    </p>
                  </div>
                </div>
                <!-- Additional info tab -->
                <div v-show="activeTab === 'additional'" class="space-y-4">
                  <p>Weight options, origin, and other specifications can be displayed here when available.</p>
                </div>
                <!-- Vendor tab -->
                <div v-show="activeTab === 'vendor'" class="space-y-4">
                  <p class="font-semibold text-gray-900">{{ labels.brandLabel }}</p>
                  <p>Your trusted source for premium frozen products.</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.25s ease;
}
.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}
.modal-panel-enter-active {
  transition:
    transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 0.28s ease;
}
.modal-panel-leave-active {
  transition:
    transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.22s ease;
}
.modal-panel-enter-from,
.modal-panel-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.985);
}
</style>
