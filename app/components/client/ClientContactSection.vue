<script setup lang="ts">
defineProps<{
  leftTitle: string;
  leftSubtitle: string;
  mapQuery: string;
  rightTitle: string;
  rightSubtitle: string;
  formPlaceholders: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  };
  subjectLabel: string;
  subjects: string[];
  sendButtonLabel: string;
}>();

const emit = defineEmits<{ send: [] }>();
</script>

<template>
  <section id="contact" class="bg-white py-20">
    <div class="max-w-384 mx-auto px-3 sm:px-4 lg:px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 class="text-4xl font-bold text-gray-900 mb-4">{{ leftTitle }}</h2>
          <p class="text-gray-600 mb-8">{{ leftSubtitle }}</p>
          <iframe
            :src="`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=17&output=embed`"
            width="100%"
            height="400"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Delgar Frozen Products - Ozamiz City location"
          />
        </div>

        <div>
          <h2 class="text-4xl font-bold text-[#8B0101] mb-4">{{ rightTitle }}</h2>
          <p class="text-gray-600 mb-8">{{ rightSubtitle }}</p>
          <form class="space-y-4" @submit.prevent="emit('send')">
            <div class="grid grid-cols-2 gap-4">
              <input
                type="text"
                :placeholder="formPlaceholders.firstName"
                class="px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B0101] outline-none"
              />
              <input
                type="text"
                :placeholder="formPlaceholders.lastName"
                class="px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B0101] outline-none"
              />
            </div>
            <input
              type="email"
              :placeholder="formPlaceholders.email"
              class="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B0101] outline-none"
            />
            <input
              type="tel"
              :placeholder="formPlaceholders.phone"
              class="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B0101] outline-none"
            />

            <div>
              <p class="text-gray-700 font-semibold mb-3">{{ subjectLabel }}</p>
              <div class="flex flex-wrap gap-3">
                <label
                  v-for="(subj, idx) in subjects"
                  :key="subj"
                  class="flex items-center gap-2 cursor-pointer"
                >
                  <input type="radio" name="subject" class="w-4 h-4" :checked="idx === 0" />
                  <span class="text-gray-700">{{ subj }}</span>
                </label>
              </div>
            </div>

            <textarea
              :placeholder="formPlaceholders.message"
              rows="5"
              class="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B0101] outline-none resize-none"
            />

            <button
              type="button"
              class="w-full py-3 bg-[#8B0101] text-white font-semibold rounded-lg hover:bg-[#6B0001] transition"
              @click="emit('send')"
            >
              {{ sendButtonLabel }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
