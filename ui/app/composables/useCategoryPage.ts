import { computed, ref } from "vue";
import { useToast } from "~/composables/useToast";
import { useCategoriesData, type Category } from "~/composables/useCategoriesData";

export const useCategoryPage = () => {
  const { categories, addCategory } = useCategoriesData();
  const { success, error, info } = useToast();

  const searchQuery = ref("");
  const statusFilter = ref<"All" | "Active" | "Inactive">("All");
  const currentPage = ref(1);
  const rowsPerPage = ref(10);

  const filteredItems = computed(() => {
    return categories.value.filter((item) => {
      const matchSearch =
        searchQuery.value === "" ||
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchStatus = statusFilter.value === "All" || item.status === statusFilter.value;
      return matchSearch && matchStatus;
    });
  });

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    return filteredItems.value.slice(start, start + rowsPerPage.value);
  });

  const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / rowsPerPage.value)));

  const visiblePageNumbers = computed(() => {
    const total = totalPages.value;
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: number[] = [];
    let start = Math.max(1, currentPage.value - 2);
    let end = Math.min(total, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  });

  const showAddCategoryModal = ref(false);
  const newCategory = ref<{ name: string; slug: string; status: "Active" | "Inactive" }>({ name: "", slug: "", status: "Active" });

  const openAddCategoryModal = () => {
    newCategory.value = { name: "", slug: "", status: "Active" };
    showAddCategoryModal.value = true;
  };

  const closeAddCategoryModal = () => {
    showAddCategoryModal.value = false;
  };

  const submitAddCategory = () => {
    if (!newCategory.value.name?.trim()) {
      error("Please enter a category name.");
      return;
    }
    const slug = newCategory.value.slug?.trim() || newCategory.value.name.toLowerCase().replace(/\s+/g, "-");
    addCategory({
      name: newCategory.value.name.trim(),
      slug,
      createdOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/\//g, " "),
      status: newCategory.value.status,
    });
    success("Category added successfully!");
    closeAddCategoryModal();
  };

  const handleEdit = (id: number) => {
    success(`Editing category: ${id}`);
  };

  const handleArchive = (id: number) => {
    info(`Category ${id} archived`);
  };

  const handleDelete = (id: number) => {
    error(`Category ${id} deleted`);
  };

  const handleAddCategory = () => openAddCategoryModal();

  return {
    categories,
    searchQuery,
    statusFilter,
    currentPage,
    rowsPerPage,
    filteredItems,
    paginatedItems,
    totalPages,
    visiblePageNumbers,
    showAddCategoryModal,
    newCategory,
    openAddCategoryModal,
    closeAddCategoryModal,
    submitAddCategory,
    handleAddCategory,
    handleEdit,
    handleArchive,
    handleDelete,
  };
};
