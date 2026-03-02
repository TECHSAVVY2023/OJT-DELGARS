<script setup lang="ts">
import { useCart } from "~/composables/useCart";

const { items, removeItem, clearCart } = useCart();
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <ClientHeader />

    <main class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6 py-10">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Your Cart</h1>
        <NuxtLink
          to="/client/landing"
          class="text-sm text-[#8B0101] hover:underline font-medium"
        >
          Continue shopping
        </NuxtLink>
      </div>

      <div v-if="items.length === 0" class="bg-white rounded-xl shadow-sm p-8 text-center">
        <p class="text-gray-500 mb-4">Your cart is currently empty.</p>
        <NuxtLink
          to="/client/landing"
          class="inline-flex items-center px-5 py-2.5 bg-[#8B0101] text-white rounded-lg text-sm font-semibold hover:bg-[#6B0001] transition"
        >
          Browse products
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in items"
            :key="item.id"
            class="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <h2 class="font-semibold text-sm sm:text-base text-gray-900 truncate">
                {{ item.name }}
              </h2>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">
                Qty: <span class="font-medium text-gray-800">{{ item.quantity }}</span>
              </p>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">
                Price: <span class="font-medium text-gray-800">{{ item.price }}</span>
              </p>
            </div>
            <button
              type="button"
              class="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
              @click="removeItem(item.id)"
            >
              Remove
            </button>
          </div>
        </div>

        <aside class="bg-white rounded-xl shadow-sm p-5 h-fit">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Summary</h2>
          <p class="text-sm text-gray-600 mb-4">
            Items in cart:
            <span class="font-semibold text-gray-900">
              {{ items.reduce((sum, item) => sum + item.quantity, 0) }}
            </span>
          </p>

          <button
            type="button"
            class="w-full mb-3 px-4 py-2.5 bg-[#8B0101] text-white rounded-lg text-sm font-semibold hover:bg-[#6B0001] transition"
          >
            Proceed to checkout
          </button>

          <button
            type="button"
            class="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
            @click="clearCart"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </main>

    <ClientFooter />
  </div>
</template>

