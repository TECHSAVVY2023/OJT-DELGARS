<script setup lang="ts">
import { ref, computed } from "vue";
import { useToast } from "~/composables/useToast";
import { useRoute } from "vue-router";
import { useSubcategoriesData } from "~/composables/useSubcategoriesData";
import { useOptionsData } from "~/composables/useOptionsData";

const route = useRoute();
const { success, error, info } = useToast();
const { subcategories, addSubcategory } = useSubcategoriesData();
const { options } = useOptionsData();

const searchQuery = ref("");
const statusFilter = ref("All");
const currentPage = ref(1);
const rowsPerPage = ref(10);

const filteredItems = computed(() => {
  return subcategories.value.filter((item) => {
    const matchSearch =
      searchQuery.value === "" ||
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.parentCategory.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatus = statusFilter.value === "All" || item.status === statusFilter.value;
    return matchSearch && matchStatus;
  });
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  return filteredItems.value.slice(start, start + rowsPerPage.value);
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredItems.value.length / rowsPerPage.value))
);

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

const parentCategoryOptions = computed(() => options.value.parentCategoryOptions);

const showAddSubcategoryModal = ref(false);
const newSubcategory = ref({ name: "", parentCategory: "Seafood", slug: "", status: "Active" as "Active" | "Inactive" });

const openAddSubcategoryModal = () => {
  newSubcategory.value = { name: "", parentCategory: "Seafood", slug: "", status: "Active" };
  showAddSubcategoryModal.value = true;
};
const closeAddSubcategoryModal = () => { showAddSubcategoryModal.value = false; };

const submitAddSubcategory = () => {
  if (!newSubcategory.value.name?.trim()) {
    error("Please enter a sub category name.");
    return;
  }
  const slug = newSubcategory.value.slug?.trim() || newSubcategory.value.name.toLowerCase().replace(/\s+/g, "-");
  addSubcategory({
    name: newSubcategory.value.name.trim(),
    parentCategory: newSubcategory.value.parentCategory,
    slug,
    createdOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/\//g, " "),
    status: newSubcategory.value.status,
  });
  success("Sub category added successfully!");
  closeAddSubcategoryModal();
};

const handleAddSubcategory = () => { openAddSubcategoryModal(); };
const handleEdit = (id: number) => { success(`Editing sub category: ${id}`); };
const handleDelete = (id: number) => { error(`Sub category ${id} deleted`); };
</script>

<template>
  <div class="flex h-screen bg-gray-50" style="font-family: 'Nunito Sans', sans-serif">
    <AdminSidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <div class="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <div class="bg-white border-b border-gray-200 px-8 py-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <NuxtLink to="/admin/adminsahboard" class="hover:text-[#8B0101]">Dashboard</NuxtLink>
                <span class="text-gray-400">›</span>
                <span class="text-gray-900 font-medium">Sub Category</span>
              </div>
              <h1 class="text-3xl font-bold text-gray-900">Sub Category</h1>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2 border-l border-gray-200 pl-3">
                <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Export to PDF"><Icon name="mdi:file-pdf" class="w-7 h-7 text-red-500" /></button>
                <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Export to Excel"><Icon name="mdi:file-excel" class="w-7 h-7 text-green-600" /></button>
                <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Print"><Icon name="mdi:printer" class="w-7 h-7 text-gray-600" /></button>
                <button class="p-2.5 hover:bg-gray-100 rounded-lg transition" title="Refresh"><Icon name="mdi:refresh" class="w-7 h-7 text-gray-600" /></button>
                <button class="p-2.5 hover:bg-gray-100 rounded-lg transition"><Icon name="mdi:chevron-down" class="w-7 h-7 text-gray-600" /></button>
              </div>
              <button
                @click="handleAddSubcategory"
                class="px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition flex items-center gap-2"
              >
                <Icon name="mdi:plus" class="w-5 h-5" />
                Add Sub Category
              </button>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
              <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400" />
              <input v-model="searchQuery" type="text" placeholder="Search" class="bg-transparent outline-none text-sm flex-1" />
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Status</label>
              <select
                v-model="statusFilter"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-auto px-8 py-6">
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table class="w-full border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50">
                  <th class="px-6 py-4 text-center"><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#8B0101] focus:ring-[#8B0101] cursor-pointer" /></th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Sub Category</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Parent Category</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Sub Category Slug</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Created On ⬇</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in paginatedItems" :key="item.id" class="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td class="px-6 py-4 text-center"><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#8B0101] focus:ring-[#8B0101] cursor-pointer" /></td>
                  <td class="px-6 py-4 text-sm font-medium text-gray-900 text-center">{{ item.name }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ item.parentCategory }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ item.slug }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600 text-center">{{ item.createdOn }}</td>
                  <td class="px-6 py-4 text-center">
                    <span
                      v-if="item.status === 'Active'"
                      class="inline-flex px-2 py-0.5 text-[10px] font-medium rounded border-2 border-green-600 bg-green-500 text-white"
                    >
                      Active
                    </span>
                    <span
                      v-else
                      class="inline-flex px-2 py-0.5 text-[10px] font-medium rounded border-2 border-gray-400 bg-gray-100 text-gray-700"
                    >
                      Inactive
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <button @click="handleEdit(item.id)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition" title="Edit"><Icon name="mdi:pencil" class="w-5 h-5" /></button>
                      <button @click="handleDelete(item.id)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition" title="Delete"><Icon name="mdi:trash-can" class="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Row Per Page</label>
              <select v-model.number="rowsPerPage" class="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0101] focus:ring-offset-0">
                <option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option>
              </select>
            </div>
            <span class="text-sm text-gray-600">Entries</span>
          </div>
          <div class="flex items-center gap-2">
            <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1" class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-50"><Icon name="mdi:chevron-left" class="w-5 h-5 text-gray-600" /></button>
            <div class="flex items-center gap-1">
              <button v-for="page in visiblePageNumbers" :key="page" @click="currentPage = page" :class="['w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition', currentPage === page ? 'bg-[#8B0101] text-white' : 'border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50']">{{ page }}</button>
              <span v-if="totalPages > 5 && !visiblePageNumbers.includes(totalPages)" class="px-2 text-gray-600 text-sm">...</span>
              <button v-if="totalPages > 5 && !visiblePageNumbers.includes(totalPages)" @click="currentPage = totalPages" class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition">{{ totalPages }}</button>
            </div>
            <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages" class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-50"><Icon name="mdi:chevron-right" class="w-5 h-5 text-gray-600" /></button>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Sub Category Modal - Improved Design -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showAddSubcategoryModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          style="font-family: 'Nunito Sans', sans-serif"
          @click.self="closeAddSubcategoryModal"
        >
          <div class="bg-white rounded-xl shadow-2xl w-full max-w-xs overflow-hidden transform transition-all" @click.stop>
            <!-- Header -->
            <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-white">
              <h2 class="text-base font-semibold text-gray-900">Add Sub Category</h2>
              <button
                type="button"
                class="p-1 text-gray-400 hover:text-gray-600 rounded transition"
                @click="closeAddSubcategoryModal"
              >
                <Icon name="mdi:close" class="w-5 h-5" />
              </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitAddSubcategory" class="p-6 space-y-6">
              <!-- Sub Category Name -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Sub Category Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="newSubcategory.name"
                  type="text"
                  placeholder="e.g. Bangus"
                  class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent hover:border-gray-400 transition"
                />
              </div>

              <!-- Parent Category -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Parent Category <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="newSubcategory.parentCategory"
                  class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent hover:border-gray-400 transition bg-white cursor-pointer"
                >
                  <option v-for="cat in parentCategoryOptions" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <!-- Slug -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Slug <span class="text-gray-500 font-normal text-xs">(optional)</span>
                </label>
                <input
                  v-model="newSubcategory.slug"
                  type="text"
                  placeholder="e.g. bangus"
                  class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent hover:border-gray-400 transition"
                />
                <p class="text-xs text-gray-500 mt-1.5">Auto-generated from name if left empty</p>
              </div>

              <!-- Status -->
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Status <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="newSubcategory.status"
                  class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent hover:border-gray-400 transition bg-white cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <!-- Buttons -->
              <div class="flex items-center gap-3 justify-end pt-2">
                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  @click="closeAddSubcategoryModal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition flex items-center gap-2"
                >
                  <Icon name="mdi:plus" class="w-4 h-4" />
                  Add Sub Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;800&display=swap");

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>