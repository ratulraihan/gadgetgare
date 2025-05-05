<script setup lang="ts">
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <h2 class="not-found-subtitle">Page Not Found</h2>
      <p class="not-found-message">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <router-link to="/" class="button">Back to Home</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: var(--space-xl);
}

.not-found-content {
  text-align: center;
  max-width: 500px;
}

.not-found-title {
  font-size: 6rem;
  margin: 0;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.not-found-subtitle {
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: var(--space-md);
}

.not-found-message {
  margin-bottom: var(--space-lg);
  color: var(--color-text-secondary);
}
</style>