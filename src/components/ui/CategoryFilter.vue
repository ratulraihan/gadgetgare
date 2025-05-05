<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  categories: string[]
  selectedCategory?: string
}>()

const emit = defineEmits(['update:selectedCategory'])

const selected = ref(props.selectedCategory || '')

watch(() => props.selectedCategory, (newValue) => {
  selected.value = newValue || ''
})

const selectCategory = (category: string) => {
  selected.value = category
  emit('update:selectedCategory', category)
}
</script>

<template>
  <div class="category-filter">
    <h3 class="filter-title">Categories</h3>
    <div class="filter-options">
      <button 
        class="filter-button" 
        :class="{ active: selected === '' }"
        @click="selectCategory('')"
      >
        All
      </button>
      
      <button 
        v-for="category in categories" 
        :key="category"
        class="filter-button" 
        :class="{ active: selected === category }"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.category-filter {
  margin-bottom: var(--space-lg);
}

.filter-title {
  margin-bottom: var(--space-md);
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.filter-button {
  background-color: var(--color-background-secondary);
  color: var(--color-text);
  border: none;
  border-radius: 24px;
  padding: var(--space-xs) var(--space-md);
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.filter-button:hover {
  background-color: var(--color-secondary-light);
}

.filter-button.active {
  background-color: var(--color-primary);
  color: white;
}
</style>