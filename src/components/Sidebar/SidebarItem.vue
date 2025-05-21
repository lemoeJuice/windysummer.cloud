<script setup>
defineProps({
  label: String,
  link: String,
});
</script>

<template>
  <li>
    <router-link :to="link" class="block px-6 py-3 rounded-lg text-lg font-medium text-gray-900 dark:text-gray-200 
             hover:bg-[#4a90e2] hover:text-white hover:scale-105 transition-all duration-300 ease-in-out">
      {{ label }}
    </router-link>
  </li>
</template>
