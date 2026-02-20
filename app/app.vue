<template>
  <ToastContainer />
  <LoadingScreen :is-loading="isLoading" :message="loadingMessage" />
  <NuxtPage />
</template>

<script setup lang="ts">
import { usePageLoading } from "~/composables/usePageLoading";

const { isLoading, loadingMessage } = usePageLoading();
</script>