<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    <header class="bg-indigo-700 py-16 px-4 text-center text-white shadow-lg">
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
        OJT Interns <span class="text-indigo-300">2026</span>
      </h1>
      <p class="text-lg md:text-xl font-medium opacity-90 italic">Academic Year 2025-2026</p>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-12">
      <section class="mb-20">
        <h2 class="text-2xl font-bold mb-8 border-b-2 border-indigo-500 w-fit pb-2">Meet the Team</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(j, i) in interns" 
            :key="i"
            class="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200"
          >
            <div class="flex items-center p-6">
              <div class="relative">
                <img 
                  :src="j.profile" 
                  class="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-50 group-hover:ring-indigo-200 transition-all"
                  :alt="j.name"
                />
                <span class="absolute -top-2 -left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  #{{ i + 1 }}
                </span>
              </div>

              <div class="ml-5">
                <h3 class="text-xl font-bold text-slate-800">{{ j.name }}</h3>
                <p class="text-indigo-600 font-medium text-sm">{{ j.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-slate-800">Sample JSON Reports</h2>
          <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Live Feed
          </span>
        </div>

        <div class="space-y-4">
          <div 
            v-for="h in list?.slice(0, 5)" 
            :key="h.id"
            class="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-sm hover:translate-x-1 transition-transform"
          >
            <div class="flex items-start gap-4">
              <span class="flex-shrink-0 bg-slate-100 text-slate-500 font-mono text-sm p-2 rounded">
                ID: {{ h.id }}
              </span>
              <div>
                <h4 class="font-bold text-lg text-slate-900 uppercase tracking-tight mb-2 italic">
                  {{ h.title }}
                </h4>
                <p class="text-slate-600 leading-relaxed">
                  {{ h.body }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const interns = [
  { name: "Carmel Blando", role: "Web Developer", profile: "https://upload.wikimedia.org/wikipedia/commons/2/27/Bea_Alonzo_by_Ronn_Tan%2C_April_2010.png" },
  { name: "RC Canete", role: "Web Developer", profile: "https://cdn.britannica.com/92/211792-050-E764F875/American-singer-Ariana-Grande-2018.jpg" },
  { name: "Mark", role: "Web Developer", profile: "https://cdn.tatlerasia.com/tatlerasia/i/2022/10/24135351-martin-coco_cover_1000x1500.jpg" },
  { name: "Prince", role: "Web Developer", profile: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Daniel_Padilla_at_Celebrate_Mega_in_Iceland_2016_%286%29.jpg" },
  { name: "Wen", role: "Web Developer", profile: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kim_Jennie_%28%EA%B9%80%EC%A0%9C%EB%8B%88%29_05.jpg/250px-Kim_Jennie_%28%EA%B9%80%EC%A0%9C%EB%8B%88%29_05.jpg" },
  { name: "Ralph", role: "Web Developer", profile: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Glaston2024_2806_300624_%28129_of_173%29_%28cropped%29.jpg/960px-Glaston2024_2806_300624_%28129_of_173%29_%28cropped%29.jpg" },
];

const list = ref([]);

const fetchData = async () => {
  try {
    // Note: Use $fetch for Nuxt 3, or standard fetch for plain Vue
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    list.value = await response.json();
  } catch (err) {
    console.error("Failed to fetch data:", err);
  }
};

onMounted(() => {
  fetchData();
});
</script>