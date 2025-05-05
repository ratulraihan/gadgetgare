<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGadgetStore } from '../stores/gadgetStore'

const gadgetStore = useGadgetStore()
const router = useRouter()

const compareGadgets = computed(() => gadgetStore.gadgetsToCompare)
const hasGadgetsToCompare = computed(() => compareGadgets.value.length > 0)

// Get unique spec categories from all gadgets being compared
const specCategories = computed(() => {
  const categories = new Set<string>()
  
  compareGadgets.value.forEach(gadget => {
    Object.keys(gadget.specs).forEach(category => {
      categories.add(category)
    })
  })
  
  return Array.from(categories)
})

// Get all spec keys for a given category
const getSpecKeysForCategory = (category: string) => {
  const allKeys = new Set<string>()
  
  compareGadgets.value.forEach(gadget => {
    const categorySpecs = gadget.specs[category as keyof typeof gadget.specs]
    if (categorySpecs) {
      Object.keys(categorySpecs).forEach(key => {
        allKeys.add(key)
      })
    }
  })
  
  return Array.from(allKeys)
}

// Get a specific spec value for a gadget
const getSpecValue = (gadget: any, category: string, key: string) => {
  const categorySpecs = gadget.specs[category as keyof typeof gadget.specs]
  return categorySpecs ? categorySpecs[key] || '—' : '—'
}

const removeGadget = (id: string) => {
  gadgetStore.removeFromCompare(id)
}

const clearAll = () => {
  gadgetStore.clearCompare()
}

const navigateToGadget = (id: string) => {
  router.push(`/gadget/${id}`)
}
</script>

<template>
  <div class="container">
    <div class="page-header">
      <h1 class="page-title">Compare Gadgets</h1>
      <p class="page-description">Compare features and specifications of up to 3 gadgets side by side.</p>
    </div>
    
    <div v-if="!hasGadgetsToCompare" class="empty-compare">
      <p>You haven't added any gadgets to compare.</p>
      <router-link to="/categories" class="button">Browse Gadgets</router-link>
    </div>
    
    <div v-else class="compare-container">
      <div class="compare-actions">
        <span class="compare-count">Comparing {{ compareGadgets.length }} gadget(s)</span>
        <button @click="clearAll" class="clear-button">Clear All</button>
      </div>
      
      <!-- Gadget Headers -->
      <div class="compare-table">
        <div class="compare-header">
          <div class="compare-cell header-cell">
            <span class="header-title">Gadget</span>
          </div>
          <div 
            v-for="gadget in compareGadgets" 
            :key="gadget.id" 
            class="compare-cell gadget-cell"
          >
            <button 
              class="remove-button" 
              @click="removeGadget(gadget.id)"
              aria-label="Remove from comparison"
            >
              ✕
            </button>
            <img 
              :src="gadget.imageUrl" 
              :alt="gadget.name" 
              class="gadget-image"
              @click="navigateToGadget(gadget.id)"
            />
            <h3 class="gadget-name" @click="navigateToGadget(gadget.id)">
              {{ gadget.name }}
            </h3>
            <div class="gadget-category">{{ gadget.category }}</div>
            <div class="gadget-price">
              {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(gadget.price) }}
            </div>
          </div>
        </div>
        
        <!-- For each spec category (general, display, etc.) -->
        <div v-for="category in specCategories" :key="category" class="compare-section">
          <div class="category-header">
            <div class="compare-cell header-cell">
              <span class="category-title">{{ category.charAt(0).toUpperCase() + category.slice(1) }}</span>
            </div>
            <div 
              v-for="gadget in compareGadgets" 
              :key="`${category}-${gadget.id}-header`" 
              class="compare-cell"
            ></div>
          </div>
          
          <!-- For each spec key in this category -->
          <div 
            v-for="key in getSpecKeysForCategory(category)" 
            :key="`${category}-${key}`" 
            class="compare-row"
          >
            <div class="compare-cell spec-name">
              {{ key }}
            </div>
            <div 
              v-for="gadget in compareGadgets" 
              :key="`${category}-${key}-${gadget.id}`" 
              class="compare-cell spec-value"
              :class="{ highlight: key === 'Processor' || key === 'RAM' || key === 'Camera' }"
            >
              {{ getSpecValue(gadget, category, key) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  margin: var(--space-lg) 0 var(--space-xl);
  text-align: center;
}

.page-description {
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.empty-compare {
  text-align: center;
  padding: var(--space-xxl) 0;
  background-color: var(--color-background-secondary);
  border-radius: 8px;
}

.empty-compare p {
  margin-bottom: var(--space-md);
  color: var(--color-text-secondary);
}

.compare-container {
  margin-bottom: var(--space-xxl);
}

.compare-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
}

.compare-count {
  font-weight: 500;
}

.clear-button {
  background: none;
  border: none;
  color: var(--color-error);
  cursor: pointer;
  font-weight: 500;
  padding: var(--space-xs) var(--space-sm);
}

.clear-button:hover {
  text-decoration: underline;
}

.compare-table {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
}

.compare-header, .compare-row, .category-header {
  display: flex;
  border-bottom: 1px solid var(--color-background-secondary);
}

.compare-cell {
  flex: 1;
  min-width: 180px;
  padding: var(--space-md);
  border-right: 1px solid var(--color-background-secondary);
}

.compare-cell:last-child {
  border-right: none;
}

.header-cell {
  background-color: var(--color-background-secondary);
  font-weight: 600;
  position: sticky;
  left: 0;
  z-index: 1;
}

.header-title, .category-title {
  font-weight: 600;
}

.category-header {
  background-color: var(--color-background-secondary);
}

.gadget-cell {
  position: relative;
  padding-top: var(--space-xl);
  text-align: center;
}

.remove-button {
  position: absolute;
  top: var(--space-xs);
  right: var(--space-xs);
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 2px;
}

.remove-button:hover {
  color: var(--color-error);
}

.gadget-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: var(--space-sm);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.gadget-image:hover {
  transform: scale(1.05);
}

.gadget-name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: var(--space-xs);
  cursor: pointer;
}

.gadget-name:hover {
  color: var(--color-primary);
}

.gadget-category {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xs);
}

.gadget-price {
  font-weight: 600;
  color: var(--color-primary);
}

.spec-name {
  font-weight: 500;
  background-color: var(--color-background-secondary);
  position: sticky;
  left: 0;
  z-index: 1;
}

.spec-value {
  text-align: center;
}

.spec-value.highlight {
  background-color: rgba(var(--color-primary-rgb), 0.05);
  font-weight: 600;
}

.compare-section {
  margin-bottom: var(--space-md);
}

.compare-section:last-child {
  margin-bottom: 0;
}

@media (max-width: 640px) {
  .compare-table {
    font-size: 0.9rem;
  }
  
  .compare-cell {
    min-width: 150px;
    padding: var(--space-sm);
  }
  
  .gadget-image {
    width: 80px;
    height: 80px;
  }
}
</style>