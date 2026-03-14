<script setup lang="ts">
defineProps<{
  productsLabel: string;
  sectionTitle: string;
  searchPlaceholder: string;
  exploreMoreLabel: string;
  products: Array<{
    id: number;
    category: string;
    categoryClass: string;
    subcategory: string;
    name: string;
    price: string;
    stock: number;
    image: string;
  }>;
  quantityMap: Record<number, number>;
  priceTypeMap: Record<number, "retail" | "wholesale">;
  labels: {
    brandLabel: string;
    retailLabel: string;
    wholesaleLabel: string;
    addLabel: string;
    inStockLabel: string;
  };
}>();

const emit = defineEmits<{
  "update:quantity": [id: number, value: number];
  "update:priceType": [id: number, value: "retail" | "wholesale"];
  "add-to-cart": [
    product: {
      id: number;
      category: string;
      categoryClass: string;
      subcategory: string;
      name: string;
      price: string;
      stock: number;
      image: string;
    },
    quantity: number,
  ];
  "open-info": [
    product: {
      id: number;
      category: string;
      categoryClass: string;
      subcategory: string;
      name: string;
      price: string;
      stock: number;
      image: string;
    },
  ];
  search: [];
}>();
</script>

<template>
  <section id="catalog" class="py-20 bg-white">
    <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="mb-10 md:mb-12">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-2 h-10 bg-[#8B0101] rounded-md" />
          <span class="text-[#8B0101] font-semibold text-xl">{{ productsLabel }}</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
          {{ sectionTitle }}
        </h2>

        <div class="flex gap-4 max-w-lg">
          <input
            type="text"
            :placeholder="searchPlaceholder"
            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0101]"
          />
          <button
            type="button"
            class="px-6 py-3 bg-[#8B0101] text-white rounded-lg hover:bg-[#6B0001] transition"
            @click="emit('search')"
          >
            <Icon name="mdi:magnify" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <ClientProductCard
          v-for="product in products"
          :key="product.id"
          :product="{
            name: product.name,
            category: product.category,
            subcategory: product.subcategory,
            price: product.price,
            image: product.image,
            badge: product.category,
            categoryClass: product.categoryClass,
            inStock: true,
            stock: product.stock,
          }"
          :quantity="quantityMap[product.id] ?? 0"
          :max-quantity="product.stock"
          :price-type="priceTypeMap[product.id] ?? 'retail'"
          :labels="labels"
          @update:quantity="emit('update:quantity', product.id, $event)"
          @update:price-type="emit('update:priceType', product.id, $event)"
          @add-to-cart="(qty: number) => emit('add-to-cart', product, qty)"
          @open-info="() => emit('open-info', product)"
        />
      </div>

      <div class="text-center mt-12">
        <NuxtLink
          to="/client/catalog"
          class="inline-block px-8 py-3 bg-[#8B0101] text-white rounded-lg font-semibold hover:bg-[#6B0001] transition shadow-md hover:shadow-lg"
        >
          {{ exploreMoreLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
