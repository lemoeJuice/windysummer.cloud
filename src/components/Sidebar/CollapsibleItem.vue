<script setup>
import { ref } from 'vue'

const _props = defineProps({
  label: String,
  link: String,
})

const files = import.meta.glob('/src/pages/**/index.md')
const metas = import.meta.glob('/src/pages/**/meta.json', { import: 'default' })

const items = ref([])

async function loadItems() {
  const result = await Promise.all(Object.keys(files).map(async (file) => {
    const segments = file.split('/')
    const folderName = segments[segments.length - 2]
    const metaPath = file.replace('index.md', 'meta.json')

    let title = decodeURIComponent(folderName)
    let mtime = '1970-01-01T00:00:00.000Z' // 默认值：最早时间

    if (metas[metaPath]) {
      try {
        const meta = await metas[metaPath]()
        title = meta.title || title
        mtime = meta.mtime || mtime
      } catch (err) {
        console.error(`无法读取 ${metaPath}`, err)
      }
    }

    return {
      name: title.trim(),
      path: `/posts/${encodeURIComponent(folderName)}`,
      mtime: new Date(mtime),
    }
  }))

  // 按修改时间降序排序
  result.sort((a, b) => b.mtime - a.mtime)

  items.value = result
}

loadItems()

const isOpen = ref(false)
function toggle() {
  isOpen.value = !isOpen.value
}
</script>


<template>
  <li>
    <!-- 目录主项 -->
    <button @click="toggle" class="flex w-full justify-between px-6 py-3 rounded-lg text-lg font-medium 
             text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-500
             hover:bg-[#4a90e2] hover:text-white hover:scale-105 transition-all duration-300 ease-in-out"
      :aria-expanded="isOpen">
      <span>{{ label }}</span>
      <span class="transition-transform duration-300" :class="{ 'rotate-180': isOpen }">▼</span>
    </button>

    <!-- 子项列表 -->
    <ul v-show="isOpen" class="pl-5 mt-2 space-y-1 transition-all duration-300 ease-in-out">
      <li v-for="item in items" :key="item.path" class="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300
               hover:bg-[#5a9fd4] hover:text-white hover:scale-105 transition-all duration-300 ease-in-out">
        <router-link :to="item.path" class="block w-full">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </li>
</template>
