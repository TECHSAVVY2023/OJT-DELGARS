/**
 * Shared admin sidebar state. Uses Nuxt useState so the open/closed state
 * persists across page navigations (sidebar stays shrunk when you click a link).
 */
export function useAdminSidebar() {
  const sidebarOpen = useState("admin-sidebar-open", () => true);
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };
  return { sidebarOpen, toggleSidebar };
}
