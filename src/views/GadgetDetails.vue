<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGadgetStore } from '../stores/gadgetStore'
import SpecTable from '../components/ui/SpecTable.vue'

const route = useRoute()
const router = useRouter()
const gadgetStore = useGadgetStore()
const isLoading = ref(true)

const gadgetId = computed(() => route.params.id as string)
const gadget = computed(() => gadgetStore.getGadgetById(gadgetId.value))

const isInCompareList = computed(() => 
  gadgetStore.compareList.includes(gadgetId.value)
)

const priceFormatted = computed(() => {
  if (!gadget.value) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(gadget.value.price)
})

const handleCompare = () => {
  if (isInCompareList.value) {
    gadgetStore.removeFromCompare(gadgetId.value)
  } else {
    const added = gadgetStore.addToCompare(gadgetId.value)
    if (!added) {
      alert('You can compare up to 3 gadgets at a time.')
    }
  }
}

const goToCompare = () => {
  if (gadgetStore.compareList.length > 0) {
    router.push('/compare')
  }
}

onMounted(() => {
  // Simulate data loading
  setTimeout(() => {
    if (!gadget.value) {
      router.push('/not-found')
      return
    }
    isLoading.value = false
  }, 300)
})
</script>

<template>
  <div class="container">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-indicator">Loading gadget details...</div>
    </div>
    
    <template v-else-if="gadget">
      <div class="breadcrumb">
        <router-link to="/">Home</router-link> &gt;
        <router-link :to="`/categories/${gadget.category.toLowerCase()}`">{{ gadget.category }}</router-link> &gt;
        <span>{{ gadget.name }}</span>
      </div>
      
      <div class="product-header">
        <h1 class="product-title">{{ gadget.name }}</h1>
        <div class="product-meta">
          <div class="product-category">{{ gadget.category }}</div>
          <div class="product-rating">
            <span class="rating-value">{{ gadget.rating }}/5</span>
            <span class="rating-stars">★★★★★</span>
          </div>
        </div>
      </div>
      
      <div class="product-content">
        <div class="product-gallery">
          <div class="main-image">
            <img :src="gadget.imageUrl" :alt="gadget.name" />
            <div v-if="gadget.isNew" class="new-label">New</div>
          </div>
        </div>
        
        <div class="product-info">
          <div class="product-price">{{ priceFormatted }}</div>
          <p class="product-description">{{ gadget.description }}</p>
          
          <div class="product-highlights">
            <h3>Key Highlights</h3>
            <ul class="highlights-list">
              <li v-for="(highlight, index) in gadget.highlights" :key="index">
                <strong>{{ highlight.name }}:</strong> {{ highlight.value }}
              </li>
            </ul>
          </div>
          
          <div class="product-actions">
            <button class="button">Buy Now</button>
            <button 
              class="button button-secondary" 
              @click="handleCompare"
            >
              {{ isInCompareList ? 'Remove from Compare' : 'Add to Compare' }}
            </button>
          </div>
          
          <div v-if="gadgetStore.compareList.length > 0" class="compare-status">
            <div class="compare-count">
              {{ gadgetStore.compareList.length }} gadget(s) in compare list
            </div>
            <button class="compare-now" @click="goToCompare">
              Compare Now
            </button>
          </div>
        </div>
      </div>
      
      <div class="specifications">
        <h2 class="section-title">Full Specifications</h2>
        
        <div v-if="gadget.specs.general">
          <SpecTable :specs="gadget.specs.general" title="General" />
        </div>
        
        <div v-if="gadget.specs.display">
          <SpecTable :specs="gadget.specs.display" title="Display" />
        </div>
        
        <div v-if="gadget.specs.performance">
          <SpecTable :specs="gadget.specs.performance" title="Performance" />
        </div>
        
        <div v-if="gadget.specs.camera">
          <SpecTable :specs="gadget.specs.camera" title="Camera" />
        </div>
        
        <div v-if="gadget.specs.connectivity">
          <SpecTable :specs="gadget.specs.connectivity" title="Connectivity" />
        </div>
        
        <div v-if="gadget.specs.battery">
          <SpecTable :specs="gadget.specs.battery" title="Battery" />
        </div>
        
        <div v-if="gadget.specs.additional">
          <SpecTable :specs="gadget.specs.additional" title="Additional Features" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-indicator {
  padding: var(--space-lg);
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  color: var(--color-text-secondary);
}

.breadcrumb {
  margin: var(--space-md) 0 var(--space-lg);
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.breadcrumb a {
  color: var(--color-text-secondary);
  margin: 0 var(--space-xs);
}

.breadcrumb a:first-child {
  margin-left: 0;
}

.breadcrumb a:hover {
  color: var(--color-primary);
}

.product-header {
  margin-bottom: var(--space-lg);
}

.product-title {
  margin-bottom: var(--space-sm);
}

.product-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  color: var(--color-text-secondary);
}

.product-category {
  background-color: var(--color-background-secondary);
  padding: 2px var(--space-sm);
  border-radius: 4px;
  font-size: 0.9rem;
}

.rating-stars {
  color: var(--color-accent);
  margin-left: var(--space-xs);
}

.product-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  margin-bottom: var(--space-xxl);
}

.product-gallery {
  flex: 1;
}

.main-image {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
}

.main-image img {
  width: 100%;
  height: auto;
  display: block;
}

.new-label {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  background-color: var(--color-accent);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 2px var(--space-sm);
  border-radius: 4px;
}

.product-info {
  flex: 1;
}

.product-price {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-md);
}

.product-description {
  margin-bottom: var(--space-lg);
  line-height: 1.6;
}

.product-highlights {
  margin-bottom: var(--space-lg);
}

.highlights-list {
  list-style: none;
  margin-top: var(--space-md);
}

.highlights-list li {
  margin-bottom: var(--space-sm);
  padding-left: var(--space-md);
  position: relative;
}

.highlights-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-primary);
}

.product-actions {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.compare-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  margin-top: var(--space-md);
}

.compare-now {
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.specifications {
  margin-bottom: var(--space-xxl);
}

.section-title {
  margin-bottom: var(--space-lg);
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: 3px;
}

@media (min-width: 768px) {
  .product-content {
    flex-direction: row;
  }
  
  .product-gallery, .product-info {
    flex: 1;
  }
}
</style>