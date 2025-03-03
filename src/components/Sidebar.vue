<script setup>
import { defineProps } from 'vue'

const _props = defineProps({
  isOpen: Boolean,
})
</script>

<template>
  <aside class="sidebar" :class="isOpen ? 'open' : 'closed'">
    <nav v-if="isOpen" class="mt-4">
      <ul>
        <li class="p-4 hover:bg-blue-400">
          <a href="/">Home</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 50px; /* 让出 Navbar */
  left: 0;
  height: calc(100vh - 50px);
  background-color: #4a90e2;
  transition: width 0.3s;
  overflow: hidden;
}

.open {
  width: 200px;
}

.closed {
  width: 50px;
}
</style>
