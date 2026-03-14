<template>
  <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start justify-between">
    <div class="flex items-start gap-3">
      <Icon name="mdi:alert-circle" class="w-5 h-5 text-red-500 mt-0.5" />
      <div>
        <p class="text-sm text-gray-900">
          Your product boneless bangus is running low, already below 5 Pcs.
          <span class="text-red-600 font-semibold cursor-pointer hover:underline">
            Add Stock
          </span>
        </p>
      </div>
    </div>
    <button class="text-gray-400 hover:text-gray-600">
      <Icon name="mdi:close" class="w-5 h-5" />
    </button>
  </div>
</template>
