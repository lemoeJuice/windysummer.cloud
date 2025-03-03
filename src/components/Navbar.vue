<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const emit = defineEmits(['toggleSidebar'])
const { t, locale } = useI18n()

async function toggleLocales() {
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <header class="navbar">
    <!-- 让侧边栏按钮靠左 -->
    <button class="sidebar-toggle" @click="emit('toggleSidebar')">
      ☰
    </button>

    <!-- 使用一个占位 div 将按钮推向两端 -->
    <div class="navbar-spacer" />

    <!-- 让深色模式和语言切换按钮靠右 -->
    <div class="navbar-content">
      <button class="icon-btn" :title="t('button.toggle_dark')" @click="toggleDark()">
        <div :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'" />
      </button>
      <button class="icon-btn" :title="t('button.toggle_langs')" @click="toggleLocales()">
        <div i-carbon-language />
      </button>
    </div>
  </header>
</template>

  <style scoped>
  .navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  color: #333333;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 侧边栏按钮靠左 */
.sidebar-toggle {
  font-size: 24px;
  cursor: pointer;
  margin-right: 16px;
}

/* 用 flex-grow 让左右两边按钮分开 */
.navbar-spacer {
  flex-grow: 1;
}

/* 右侧按钮容器 */
.navbar-content {
  display: flex;
  gap: 16px;
}
</style>
