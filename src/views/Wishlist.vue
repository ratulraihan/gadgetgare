<script setup lang="ts">
import { computed } from 'vue'
import { useWishlistStore } from '../stores/wishlistStore'
import { useGadgetStore } from '../stores/gadgetStore'
import GadgetGrid from '../components/gadgets/GadgetGrid.vue'

const wishlistStore = useWishlistStore()
const gadgetStore = useGadgetStore()

const wishlistGadgets = computed(() => {
  return wishlistStore.items.map(id => gadgetStore.getGadgetById(id)).filter(Boolean)
})
</script>

<template>
  <div class="container">
    <div class="page-header">
      <h1>My Wishlist</h1>
      <p v-if="wishlistGadgets.length > 0" class="wishlist-count">
        {{ wishlistGadgets.length }} item(s)
      </p>
    </div>
    
    <GadgetGrid 
      :gadgets="wishlistGadgets"
      emptyMessage="Your wishlist is empty. Browse our gadgets to add items to your wishlist!"
    />
    
    <div v-if="wishlistGadgets.length === 0" class="empty-actions">
      <router-link to="/categories" class="button">Browse Gadgets</router-link>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  margin: var(--space-lg) 0;
  display: flex;
  align-items: baseline;
  gap: var(--space-md);
}

.wishlist-count {
  color: var(--color-text-secondary);
}

.empty-actions {
  text-align: center;
  margin-top: var(--space-xl);
}
</style>