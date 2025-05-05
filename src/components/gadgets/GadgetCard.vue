<script setup lang="ts">
import { computed } from 'vue'
import type { Gadget } from '../../types/gadget'

const props = defineProps<{
  gadget: Gadget
}>()

const priceFormatted = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(props.gadget.price)
})
</script>

<template>
  <router-link :to="`/gadget/${gadget.id}`" class="gadget-card card">
    <div class="card-image-container">
      <img :src="gadget.imageUrl" :alt="gadget.name" class="card-image" />
      <div v-if="gadget.isNew" class="new-label">New</div>
    </div>
    <div class="card-content">
      <h3 class="gadget-name">{{ gadget.name }}</h3>
      <div class="gadget-category">{{ gadget.category }}</div>
      <div class="gadget-price">{{ priceFormatted }}</div>
      
      <div class="gadget-specs">
        <div v-for="(spec, index) in gadget.highlights" :key="index" class="spec-item">
          <span class="spec-name">{{ spec.name }}:</span>
          <span class="spec-value">{{ spec.value }}</span>
        </div>
      </div>
      
      <div class="card-actions">
        <span class="view-details">View Details</span>
        <div class="rating">
          <span class="rating-value">{{ gadget.rating }}/5</span>
          <span class="rating-stars">★★★★★</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.gadget-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-background);
}

.card-image-container {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gadget-card:hover .card-image {
  transform: scale(1.05);
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

.card-content {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.gadget-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.gadget-category {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: var(--space-xs);
}

.gadget-price {
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--space-md);
}

.gadget-specs {
  margin-bottom: var(--space-md);
  flex: 1;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-xs);
  font-size: 0.9rem;
}

.spec-name {
  color: var(--color-text-secondary);
}

.spec-value {
  font-weight: 500;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.view-details {
  color: var(--color-primary);
  font-weight: 500;
  font-size: 0.9rem;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.rating-value {
  font-weight: 600;
  font-size: 0.9rem;
}

.rating-stars {
  color: var(--color-accent);
  font-size: 0.8rem;
}
</style>