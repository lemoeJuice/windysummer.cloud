<script setup>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { ref } from 'vue'

const isSidebarOpen = ref(true) // 侧边栏默认展开

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

watchEffect(() => {
  document.documentElement.style.backgroundColor = isDark.value ? '#1e2a35' : '#dff6ff'
})
</script>

<template>
  <Navbar @toggle-sidebar="toggleSidebar" />
  <div class="main-container">
    <Sidebar :is-open="isSidebarOpen" @toggle="toggleSidebar" />
    <main class="content" :class="{ expanded: isSidebarOpen, collapsed: !isSidebarOpen }">
      <RouterView />
    </main>
    <footer class="bottom" :class="{ expanded: isSidebarOpen, collapsed: !isSidebarOpen }">
      <TheFooter />
    </footer>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  flex: 1; /* 让主容器填充剩余空间 */
  min-height: 100vh;
  padding-top: 50px; /* 让出 Navbar 高度 */
}

.content {
  flex: 1; /* 让 main 内容自动填充，推动 footer 到底部 */
  padding: 20px;
  transition: margin-left 0.3s;
}

.bottom {
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
