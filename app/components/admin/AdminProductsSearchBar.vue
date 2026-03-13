<script setup lang="ts">
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (event: 'update:modelValue', value: string): void }>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target) emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
    <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400" />
    <input
      :value="props.modelValue"
      @input="onInput"
      type="text"
      placeholder="Search"
      class="bg-transparent outline-none text-sm flex-1"
    />
  </div>
</template>
