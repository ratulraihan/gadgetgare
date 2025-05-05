<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGadgetStore } from '../stores/gadgetStore'
import GadgetGrid from '../components/gadgets/GadgetGrid.vue'
import CategoryFilter from '../components/ui/CategoryFilter.vue'

const gadgetStore = useGadgetStore()
const selectedCategory = ref('')
const isLoading = ref(true)

const filteredGadgets = ref(gadgetStore.gadgets)

onMounted(() => {
  // Simulate data loading
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})

const updateCategory = (category: string) => {
  selectedCategory.value = category
  filteredGadgets.value = gadgetStore.getGadgetsByCategory(category)
}
</script>

<template>
  <div class="container">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Discover the Latest in Tech</h1>
        <p class="hero-subtitle">Explore detailed specifications of the newest gadgets on the market</p>
        <div class="hero-actions">
          <router-link to="/categories" class="button">Browse All Gadgets</router-link>
          <router-link to="/compare" class="button button-secondary">Compare Products</router-link>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://images.pexels.com/photos/1787044/pexels-photo-1787044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Various tech gadgets" />
      </div>
    </section>
    
    <section class="featured-section">
      <h2 class="section-title">Featured Products</h2>
      <div v-if="isLoading" class="loading-indicator">Loading featured products...</div>
      <GadgetGrid v-else :gadgets="gadgetStore.featuredGadgets" />
    </section>
    
    <section class="categories-section">
      <h2 class="section-title">Explore by Category</h2>
      <CategoryFilter 
        :categories="gadgetStore.categories" 
        :selectedCategory="selectedCategory"
        @update:selectedCategory="updateCategory"
      />
      <div v-if="isLoading" class="loading-indicator">Loading gadgets...</div>
      <GadgetGrid v-else :gadgets="filteredGadgets" />
    </section>
    
    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Stay Informed</h2>
        <p class="cta-text">Get the latest updates on new product releases and technology trends</p>
        <form class="subscribe-form">
          <input type="email" placeholder="Your email address" class="subscribe-input" />
          <button type="submit" class="button subscribe-button">Subscribe</button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--space-lg) 0 var(--space-xxl);
  gap: var(--space-xl);
}

.hero-content {
  text-align: center;
  max-width: 800px;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: var(--space-md);
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
}

.hero-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}

.hero-image {
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
}

.hero-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

.section-title {
  position: relative;
  margin-bottom: var(--space-xl);
  text-align: center;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 3px;
}

.featured-section, 
.categories-section {
  margin-bottom: var(--space-xxl);
}

.loading-indicator {
  text-align: center;
  padding: var(--space-xl);
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  color: var(--color-text-secondary);
}

.cta-section {
  background-color: var(--color-background-secondary);
  padding: var(--space-xl) 0;
  border-radius: 12px;
  margin-bottom: var(--space-xxl);
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.cta-title {
  margin-bottom: var(--space-md);
}

.cta-text {
  margin-bottom: var(--space-lg);
  color: var(--color-text-secondary);
}

.subscribe-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.subscribe-input {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-secondary-light);
  border-radius: 8px;
  font-size: 1rem;
  background-color: var(--color-background);
}

.subscribe-button {
  background-color: var(--color-primary);
}

@media (min-width: 768px) {
  .hero-section {
    flex-direction: row;
    gap: var(--space-xxl);
  }
  
  .hero-content {
    text-align: left;
    flex: 1;
  }
  
  .hero-image {
    flex: 1;
  }
  
  .hero-actions {
    justify-content: flex-start;
  }
  
  .subscribe-form {
    flex-direction: row;
  }
  
  .subscribe-input {
    flex: 1;
  }
}
</style>