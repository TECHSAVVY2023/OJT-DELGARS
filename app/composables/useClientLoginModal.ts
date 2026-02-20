export const useClientLoginModal = () => {
  const showLoginModal = useState<boolean>("clientShowLoginModal", () => false);

  const openLogin = () => {
    showLoginModal.value = true;
  };

  const closeLogin = () => {
    showLoginModal.value = false;
  };

  return {
    showLoginModal,
    openLogin,
    closeLogin,
  };
};
