export default defineNuxtPlugin((nuxtApp) => {
  const { startLoading, stopLoading } = usePageLoading();

  // Show loading on route changes
  nuxtApp.hook("page:start", () => {
    startLoading("Please wait while the page is being loaded.");
  });

  nuxtApp.hook("page:finish", () => {
    // Small delay for smooth transition
    setTimeout(() => {
      stopLoading();
    }, 300);
  });

  // Show loading on initial page load
  if (import.meta.client) {
    startLoading("Please wait while the page is being loaded.");
    window.addEventListener("load", () => {
      setTimeout(() => {
        stopLoading();
      }, 500);
    });
  }
});
