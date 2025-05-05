<script setup lang="ts">
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">GadgetSpecs</h3>
          <p class="footer-description">
            Your trusted source for detailed specifications of the latest electronic gadgets.
          </p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-subtitle">Quick Links</h4>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/categories">Categories</router-link></li>
            <li><router-link to="/compare">Compare</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-subtitle">Categories</h4>
          <ul class="footer-links">
            <li><router-link to="/categories/smartphones">Smartphones</router-link></li>
            <li><router-link to="/categories/laptops">Laptops</router-link></li>
            <li><router-link to="/categories/tablets">Tablets</router-link></li>
            <li><router-link to="/categories/cameras">Cameras</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-subtitle">Stay Connected</h4>
          <div class="social-links">
            <a href="#" aria-label="Twitter">
              <span class="social-icon">𝕏</span>
            </a>
            <a href="#" aria-label="Facebook">
              <span class="social-icon">ⓕ</span>
            </a>
            <a href="#" aria-label="Instagram">
              <span class="social-icon">📷</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} GadgetSpecs. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-background-secondary);
  padding: var(--space-xl) 0 var(--space-lg);
  margin-top: var(--space-xxl);
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.footer-title {
  font-size: 1.3rem;
  margin-bottom: var(--space-sm);
}

.footer-subtitle {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: var(--space-md);
}

.footer-description {
  color: var(--color-text-secondary);
  max-width: 300px;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: var(--space-sm);
}

.footer-links a {
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--color-primary);
}

.social-links {
  display: flex;
  gap: var(--space-md);
}

.social-icon {
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}

.social-links a:hover .social-icon {
  color: var(--color-primary);
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-secondary-light);
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.footer-bottom-links {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-sm);
}

.footer-bottom-links a {
  color: var(--color-text-secondary);
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
  
  .footer-bottom-links {
    margin-top: 0;
  }
}

@media (min-width: 1024px) {
  .footer-content {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
}
</style>