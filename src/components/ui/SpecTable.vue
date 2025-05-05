<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  specs: Record<string, any>
  title?: string
}>()

const specEntries = computed(() => {
  return Object.entries(props.specs)
})
</script>

<template>
  <div class="spec-table">
    <h3 v-if="title" class="spec-table-title">{{ title }}</h3>
    <div class="spec-table-content">
      <div v-for="[name, value] in specEntries" :key="name" class="spec-row">
        <div class="spec-name">{{ name }}</div>
        <div class="spec-value">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spec-table {
  margin-bottom: var(--space-lg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.spec-table-title {
  padding: var(--space-md);
  background-color: var(--color-background-secondary);
  font-size: 1.1rem;
  margin-bottom: 0;
}

.spec-table-content {
  border: 1px solid var(--color-background-secondary);
  border-top: none;
}

.spec-row {
  display: flex;
  border-bottom: 1px solid var(--color-background-secondary);
}

.spec-row:last-child {
  border-bottom: none;
}

.spec-name, .spec-value {
  padding: var(--space-sm) var(--space-md);
}

.spec-name {
  flex: 1;
  font-weight: 500;
  background-color: var(--color-background-secondary);
}

.spec-value {
  flex: 2;
}

@media (max-width: 640px) {
  .spec-row {
    flex-direction: column;
  }
  
  .spec-name, .spec-value {
    width: 100%;
  }
}
</style>