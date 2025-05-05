<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/categories',
      query: { search: searchQuery.value.trim() }
    })
    searchQuery.value = ''
  }
}
</script>

<template>
  <div class="search-container">
    <input 
      type="text" 
      v-model="searchQuery" 
      @keyup.enter="handleSearch"
      placeholder="Search gadgets..." 
      class="search-input"
    />
    <button @click="handleSearch" class="search-button" aria-label="Search">
      🔍
    </button>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.search-container:focus-within {
  box-shadow: 0 0 0 2px var(--color-primary);
}

.search-input {
  flex: 1;
  padding: var(--space-sm) var(--space-md);
  border: none;
  background: transparent;
  color: var(--color-text);
  font-size: 0.9rem;
  outline: none;
}

.search-button {
  background: none;
  border: none;
  padding: var(--space-sm) var(--space-md);
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}

.search-button:hover {
  color: var(--color-primary);
}
</style>