<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'windysummer.cloud',
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => isDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})

onMounted(() => {
  watchEffect(() => {
    document.documentElement.style.backgroundColor = isDark.value ? '#1e2a35' : '#dff6ff'
  })
})
</script>

<template>
  <RouterView />
</template>
