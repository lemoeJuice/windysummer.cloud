<script setup>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { ref } from 'vue'

const isSidebarOpen = ref(true) // 侧边栏默认展开

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="layout">
    <Navbar @toggle-sidebar="toggleSidebar" />
    <div class="main-container">
      <Sidebar :is-open="isSidebarOpen" @toggle="toggleSidebar" />
      <main class="content" :class="{ expanded: isSidebarOpen, collapsed: !isSidebarOpen }">
        <RouterView />
        <TheFooter />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-container {
  display: flex;
  flex: 1;
  margin-top: 50px; /* 让出 Navbar 高度 */
}

.content {
  flex: 1;
  padding: 20px;
  transition: margin-left 0.3s;
}

.expanded {
  margin-left: 200px; /* 侧边栏展开 */
}

.collapsed {
  margin-left: 50px; /* 侧边栏折叠 */
}
</style>
