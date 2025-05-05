<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../ui/SearchBar.vue'
import { useWishlistStore } from '../../stores/wishlistStore'

defineProps<{
  isDarkMode: boolean
}>()

const emit = defineEmits(['toggle-dark-mode'])
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const router = useRouter()
const wishlistStore = useWishlistStore()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navigateTo = (path: string) => {
  router.push(path)
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header 
    class="header" 
    :class="{ 'scrolled': isScrolled, 'mobile-menu-open': isMobileMenuOpen }"
  >
    <div class="container header-container">
      <div class="header-left">
        <router-link to="/" class="logo">
          GadgetSpecs
        </router-link>
        <nav class="desktop-nav">
          <ul class="nav-list">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/categories">Categories</router-link></li>
            <li><router-link to="/compare">Compare</router-link></li>
            <li><router-link to="/tech-news">Tech News</router-link></li>
            <li><router-link to="/reviews">Reviews</router-link></li>
          </ul>
        </nav>
      </div>
      
      <div class="header-right">
        <SearchBar class="desktop-search" />
        <router-link to="/wishlist" class="wishlist-link">
          Wishlist
          <span v-if="wishlistStore.count" class="wishlist-count">
            {{ wishlistStore.count }}
          </span>
        </router-link>
        <button class="theme-toggle" @click="emit('toggle-dark-mode')" aria-label="Toggle dark mode">
          <span v-if="isDarkMode">🌞</span>
          <span v-else>🌙</span>
        </button>
        <button class="mobile-menu-button" @click="toggleMobileMenu" aria-label="Menu">
          <span class="menu-icon"></span>
        </button>
      </div>
    </div>

    <div class="mobile-menu" :class="{ 'open': isMobileMenuOpen }">
      <SearchBar class="mobile-search" />
      <nav class="mobile-nav">
        <ul class="mobile-nav-list">
          <li><a @click="navigateTo('/')">Home</a></li>
          <li><a @click="navigateTo('/categories')">Categories</a></li>
          <li><a @click="navigateTo('/compare')">Compare</a></li>
          <li><a @click="navigateTo('/tech-news')">Tech News</a></li>
          <li><a @click="navigateTo('/reviews')">Reviews</a></li>
          <li><a @click="navigateTo('/wishlist')">Wishlist</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-background);
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  padding: var(--space-md) 0;
}

.header.scrolled {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  background-color: var(--color-background);
  backdrop-filter: blur(10px);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-right: var(--space-lg);
}

.logo:hover {
  color: var(--color-primary);
}

.desktop-nav {
  display: none;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: var(--space-lg);
}

.nav-list a {
  color: var(--color-text);
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-list a:hover, .nav-list a.router-link-active {
  color: var(--color-primary);
}

.desktop-search {
  display: none;
  margin-right: var(--space-md);
}

.wishlist-link {
  position: relative;
  color: var(--color-text);
  font-weight: 500;
  padding: var(--space-xs) var(--space-sm);
}

.wishlist-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--color-primary);
  color: white;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: var(--space-xs);
  margin-right: var(--space-sm);
}

.mobile-menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  position: relative;
}

.menu-icon, .menu-icon::before, .menu-icon::after {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--color-text);
  transition: transform 0.3s ease;
}

.menu-icon::before, .menu-icon::after {
  content: '';
  position: absolute;
}

.menu-icon::before {
  top: 8px;
}

.menu-icon::after {
  bottom: 8px;
}

.mobile-menu-open .menu-icon {
  background-color: transparent;
}

.mobile-menu-open .menu-icon::before {
  transform: translateY(-8px) rotate(45deg);
}

.mobile-menu-open .menu-icon::after {
  transform: translateY(8px) rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background-color: var(--color-background);
  padding: var(--space-lg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 99;
}

.mobile-menu.open {
  transform: translateY(0);
  opacity: 1;
}

.mobile-nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  margin-top: var(--space-lg);
}

.mobile-nav-list a {
  color: var(--color-text);
  font-weight: 500;
  font-size: 1.2rem;
  display: block;
  padding: var(--space-sm) 0;
  cursor: pointer;
}

.mobile-nav-list a:hover {
  color: var(--color-primary);
}

.mobile-search {
  width: 100%;
  margin-bottom: var(--space-lg);
}

@media (min-width: 768px) {
  .desktop-nav {
    display: block;
  }

  .desktop-search {
    display: block;
  }

  .mobile-menu-button {
    display: none;
  }
}
</style>