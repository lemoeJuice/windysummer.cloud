<script setup>
defineProps({
  label: String,
  link: String,
})
</script>

<template>
  <li class="p-4 hover:bg-[#4a90e2]">
    <a :href="link">{{ label }}</a>
  </li>
</template>
