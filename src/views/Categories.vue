<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGadgetStore } from '../stores/gadgetStore'
import GadgetGrid from '../components/gadgets/GadgetGrid.vue'
import CategoryFilter from '../components/ui/CategoryFilter.vue'

const route = useRoute()
const router = useRouter()
const gadgetStore = useGadgetStore()

const categoryParam = ref(route.params.category as string || '')
const searchQuery = ref(route.query.search as string || '')
const isLoading = ref(true)
const filteredGadgets = ref(gadgetStore.gadgets)

// Update the filtered gadgets based on category and search query
const updateFilteredGadgets = () => {
  let gadgets = gadgetStore.gadgets
  
  // Filter by category if one is selected
  if (categoryParam.value) {
    gadgets = gadgetStore.getGadgetsByCategory(categoryParam.value)
  }
  
  // Filter by search query if one exists
  if (searchQuery.value) {
    gadgets = gadgetStore.searchGadgets(searchQuery.value)
  }
  
  filteredGadgets.value = gadgets
}

// Watch for changes in the route
watch(() => route.params.category, (newCategory) => {
  categoryParam.value = newCategory as string || ''
  updateFilteredGadgets()
})

watch(() => route.query.search, (newQuery) => {
  searchQuery.value = newQuery as string || ''
  updateFilteredGadgets()
})

// Handle category selection
const updateCategory = (category: string) => {
  router.push({ 
    path: category ? `/categories/${category}` : '/categories',
    query: searchQuery.value ? { search: searchQuery.value } : {}
  })
}

onMounted(() => {
  // Simulate data loading
  setTimeout(() => {
    updateFilteredGadgets()
    isLoading.value = false
  }, 300)
})
</script>

<template>
  <div class="container">
    <div class="page-header">
      <h1 class="page-title">
        <template v-if="searchQuery">
          Search Results for "{{ searchQuery }}"
        </template>
        <template v-else-if="categoryParam">
          {{ categoryParam }} Gadgets
        </template>
        <template v-else>
          All Categories
        </template>
      </h1>
    </div>
    
    <div class="categories-layout">
      <aside class="sidebar">
        <CategoryFilter 
          :categories="gadgetStore.categories" 
          :selectedCategory="categoryParam"
          @update:selectedCategory="updateCategory"
        />
      </aside>
      
      <main class="main-content">
        <div v-if="searchQuery" class="search-info">
          <p>
            Showing results for "{{ searchQuery }}"
            <button 
              class="clear-search" 
              @click="router.push({ path: categoryParam ? `/categories/${categoryParam}` : '/categories' })"
            >
              Clear search
            </button>
          </p>
        </div>
        
        <div v-if="isLoading" class="loading-indicator">
          Loading gadgets...
        </div>
        <GadgetGrid 
          v-else 
          :gadgets="filteredGadgets" 
          :emptyMessage="searchQuery 
            ? `No gadgets found matching '${searchQuery}'` 
            : 'No gadgets found in this category'"
        />
      </main>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  margin: var(--space-lg) 0;
}

.page-title {
  margin-bottom: var(--space-md);
}

.categories-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  margin-bottom: var(--space-xxl);
}

.sidebar {
  width: 100%;
}

.main-content {
  flex: 1;
}

.search-info {
  margin-bottom: var(--space-lg);
  padding: var(--space-md);
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-search {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-weight: 500;
  padding: 0;
  margin-left: var(--space-sm);
}

.clear-search:hover {
  text-decoration: underline;
}

.loading-indicator {
  text-align: center;
  padding: var(--space-xl);
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  color: var(--color-text-secondary);
}

@media (min-width: 768px) {
  .categories-layout {
    flex-direction: row;
  }
  
  .sidebar {
    width: 250px;
    flex-shrink: 0;
  }
}
</style>