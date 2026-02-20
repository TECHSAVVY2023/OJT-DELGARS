import categoriesData from "~/data/categories.json";

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdOn: string;
  status: "Active" | "Inactive";
}

export const useCategoriesData = () => {
  const categories = useState<Category[]>("categories", () => categoriesData as Category[]);

  const updateCategory = (id: number, updates: Partial<Category>) => {
    const category = categories.value.find((c) => c.id === id);
    if (category) {
      Object.assign(category, updates);
    }
  };

  const addCategory = (category: Omit<Category, "id">) => {
    const maxId = Math.max(...categories.value.map((c) => c.id), 0);
    categories.value.unshift({ ...category, id: maxId + 1 });
  };

  const deleteCategory = (id: number) => {
    const index = categories.value.findIndex((c) => c.id === id);
    if (index > -1) {
      categories.value.splice(index, 1);
    }
  };

  return {
    categories,
    updateCategory,
    addCategory,
    deleteCategory,
  };
};
