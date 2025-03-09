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
  <li>
    <!-- 目录主项 -->
    <button 
      @click="toggle"
      class="flex w-full justify-between px-6 py-3 rounded-lg text-lg font-medium 
             text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-500
             hover:bg-[#4a90e2] hover:text-white hover:scale-105 transition-all duration-300 ease-in-out"
      :aria-expanded="isOpen"
    >
      <span>{{ label }}</span>
      <span class="transition-transform duration-300" :class="{ 'rotate-180': isOpen }">▼</span>
    </button>

    <!-- 子项列表 -->
    <ul v-show="isOpen" class="pl-5 mt-2 space-y-1 transition-all duration-300 ease-in-out">
      <li 
        v-for="item in items" 
        :key="item.path" 
        class="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300
               hover:bg-[#5a9fd4] hover:text-white hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <router-link :to="item.path" class="block w-full">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </li>
</template>

