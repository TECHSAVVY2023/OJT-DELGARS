import subcategoriesData from "~/data/subcategories.json";

export interface Subcategory {
  id: number;
  name: string;
  parentCategory: string;
  slug: string;
  createdOn: string;
  status: "Active" | "Inactive";
}

export const useSubcategoriesData = () => {
  const subcategories = useState<Subcategory[]>("subcategories", () => subcategoriesData as Subcategory[]);

  const updateSubcategory = (id: number, updates: Partial<Subcategory>) => {
    const subcategory = subcategories.value.find((s) => s.id === id);
    if (subcategory) {
      Object.assign(subcategory, updates);
    }
  };

  const addSubcategory = (subcategory: Omit<Subcategory, "id">) => {
    const maxId = Math.max(...subcategories.value.map((s) => s.id), 0);
    subcategories.value.unshift({ ...subcategory, id: maxId + 1 });
  };

  const deleteSubcategory = (id: number) => {
    const index = subcategories.value.findIndex((s) => s.id === id);
    if (index > -1) {
      subcategories.value.splice(index, 1);
    }
  };

  return {
    subcategories,
    updateSubcategory,
    addSubcategory,
    deleteSubcategory,
  };
};
