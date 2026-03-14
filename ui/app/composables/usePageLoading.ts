export const usePageLoading = () => {
  const isLoading = useState<boolean>("pageLoading", () => false);
  const loadingMessage = useState<string>("loadingMessage", () => "Please wait while the page is being loaded.");

  const startLoading = (message?: string) => {
    isLoading.value = true;
    if (message) {
      loadingMessage.value = message;
    }
  };

  const stopLoading = () => {
    isLoading.value = false;
  };

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
  };
};
