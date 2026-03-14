<script setup lang="ts"></script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
      <Icon name="mdi:image" class="w-5 h-5 text-amber-500" />
      <h2 class="text-lg font-semibold text-gray-900">Images</h2>
    </div>

    <div class="p-6">
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition cursor-pointer">
        <Icon name="mdi:image-plus" class="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p class="text-sm text-gray-600">Add Image</p>
      </div>
    </div>
  </div>
</template>
