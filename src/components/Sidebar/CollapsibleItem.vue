<script setup>
import { computed, ref } from 'vue'

// 接收栏目名称和目录路径
const props = defineProps({
  label: String,
  link: String, // 传入目录路径，例如 '/src/pages/posts/'
})

// 读取指定目录下的 Markdown 文件（懒加载）
const files = import.meta.glob('/src/pages/**/*.md')

// 计算符合目录的文件列表
const items = computed(() => {
  return Object.keys(files)
    .filter(file => file.startsWith(`/src/pages${props.link}`)) // 筛选符合目录的文件
    .map((file) => {
      const name = file.split('/').pop().replace(/\.\w+$/, '') // 去掉扩展名
      return { name, path: `/posts/${encodeURIComponent(name)}` }
    })
})

// 折叠状态
const isOpen = ref(false)
function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <li class="flex cursor-pointer items-center justify-between p-4 hover:bg-[#4a90e2]" @click="toggle">
    <span>{{ label }}</span>
    <span>{{ isOpen ? '▲' : '▼' }}</span>
  </li>
  <ul v-show="isOpen" class="pl-4">
    <li v-for="item in items" :key="item.path" class="p-2 hover:bg-[#5a9fd4]">
      <a :href="item.path">{{ item.name }}</a>
    </li>
  </ul>
</template>
