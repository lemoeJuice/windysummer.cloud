<script setup>
import CollapsibleItem from './CollapsibleItem.vue'
import SidebarItem from './SidebarItem.vue'

const _props = defineProps({
  isOpen: Boolean,
})
</script>

<template>
  <aside class="sidebar" :class="isOpen ? 'open' : 'closed'">
    <nav v-if="isOpen" class="mt-4">
      <ul>
        <SidebarItem label="Home" link="/" />
        <CollapsibleItem label="文章" link="/posts/" />
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 50px;
  /* 让出 Navbar */
  left: 0;
  height: calc(100vh - 50px);
  width: 60px;
  /* 默认收起时的宽度 */
  background: #76b9ed;
  transition:
    width 0.3s ease-in-out,
    background 0.3s;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  /* 添加阴影 */
  overflow: hidden;
}

.open {
  width: 200px;
}

.closed {
  width: 50px;
}
</style>
