<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'WindySummer',
  meta: [
    {
      name: 'description',
      content: 'WindySummer的主页',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00c6ff' : '#42a5f5',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => isDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
watchEffect(() => {
  document.documentElement.style.backgroundColor = isDark.value ? '#1e3a5f' : '#e0f7fa'
})
</script>

<template>
  <RouterView />
</template>
