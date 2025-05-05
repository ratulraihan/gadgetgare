<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

const router = useRouter()
const isDarkMode = ref(false)

onMounted(() => {
  // Check user's preferred color scheme
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark-mode')
  }
})

watch(() => isDarkMode.value, (newValue) => {
  if (newValue) {
    document.documentElement.classList.add('dark-mode')
  } else {
    document.documentElement.classList.remove('dark-mode')
  }
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}

// Set document title based on route meta
router.afterEach((to) => {
  document.title = to.meta.title as string || 'GadgetSpecs'
})
</script>

<template>
  <div class="app-container" :class="{ 'dark-mode': isDarkMode }">
    <AppHeader :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>