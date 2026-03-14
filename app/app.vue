<template>
  <ToastContainer />
  <LoadingScreen :is-loading="isLoading" :message="loadingMessage" />
  <NuxtPage />

  <ClientLoginModal
    :model-value="showLoginModal"
    @update:model-value="updateLoginModal"
    @success="onLoginSuccess"
  />
</template>

<script setup lang="ts">
import { usePageLoading } from "~/composables/usePageLoading";
import { useClientLoginModal } from '~/composables/useClientLoginModal';
import { useToast } from '~/composables/useToast';
import { navigateTo } from '#app';

const { isLoading, loadingMessage } = usePageLoading();
const { showLoginModal, closeLogin } = useClientLoginModal();
const { success } = useToast();

const updateLoginModal = (value: boolean) => {
  showLoginModal.value = value;
};

const onLoginSuccess = async () => {
  success('Login successful!');
  closeLogin();
  await navigateTo('/admin/adminsahboard');
};
</script>