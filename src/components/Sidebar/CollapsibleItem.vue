<script setup>
import { ref } from 'vue'

// 接收栏目名称和目录路径
const _props = defineProps({
  label: String,
  link: String, // 传入目录路径，例如 '/posts/'
})

// 读取 index.md 和 title.txt
const files = import.meta.glob('/src/pages/**/index.md')
const titles = import.meta.glob('/src/pages/**/title.txt', { query: '?raw', import: 'default' })

const items = ref([])

async function loadTitles() {
  const result = await Promise.all(Object.keys(files).map(async (file) => {
    const segments = file.split('/')
    const folderName = segments[segments.length - 2] // 获取倒数第二个路径（文件夹名）
    const titlePath = file.replace('index.md', 'title.txt') // 计算 title.txt 路径

    // 读取 title.txt（如果存在）
    let title = decodeURIComponent(folderName) // 默认用文件夹名
    if (titles[titlePath]) {
      try {
        title = await titles[titlePath]() // ✅ `await` 解析 Promise
      }
      catch (error) {
        console.error(`无法读取 ${titlePath}`, error)
      }
    }

    return {
      name: title.trim(),
      path: `/posts/${encodeURIComponent(folderName)}`,
    }
  }))

  items.value = result
}

// 组件初始化时加载标题
loadTitles()

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
