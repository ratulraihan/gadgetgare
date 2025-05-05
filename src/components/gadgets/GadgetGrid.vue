<script setup lang="ts">
import { computed } from 'vue'
import type { Gadget } from '../../types/gadget'
import GadgetCard from './GadgetCard.vue'

const props = defineProps<{
  gadgets: Gadget[]
  title?: string
  emptyMessage?: string
}>()

const hasGadgets = computed(() => props.gadgets.length > 0)
</script>

<template>
  <section class="gadget-grid-section">
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    
    <div v-if="hasGadgets" class="grid">
      <GadgetCard 
        v-for="gadget in gadgets" 
        :key="gadget.id" 
        :gadget="gadget"
      />
    </div>
    
    <div v-else class="empty-state">
      <p>{{ emptyMessage || 'No gadgets found' }}</p>
    </div>
  </section>
</template>

<style scoped>
.gadget-grid-section {
  margin-bottom: var(--space-xxl);
}

.section-title {
  margin-bottom: var(--space-lg);
}

.empty-state {
  text-align: center;
  padding: var(--space-xl);
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  color: var(--color-text-secondary);
}
</style>