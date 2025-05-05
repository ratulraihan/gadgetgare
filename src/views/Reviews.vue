<script setup lang="ts">
import { ref } from 'vue'

interface Review {
  id: string
  userName: string
  gadgetId: string
  gadgetName: string
  rating: number
  comment: string
  date: string
  helpful: number
  userImage: string
}

const reviews = ref<Review[]>([
  {
    id: '1',
    userName: 'Sarah Johnson',
    gadgetId: '1',
    gadgetName: 'ProBook X14',
    rating: 4.5,
    comment: 'Excellent laptop for both work and entertainment. The display is stunning and performance is top-notch. Battery life could be better though.',
    date: '2025-03-10',
    helpful: 15,
    userImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    userName: 'Michael Chen',
    gadgetId: '2',
    gadgetName: 'UltraPhone 13',
    rating: 5,
    comment: 'Best smartphone I\'ve ever owned! The camera system is incredible and the battery life is outstanding. Definitely worth the investment.',
    date: '2025-03-12',
    helpful: 23,
    userImage: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
])

const markHelpful = (reviewId: string) => {
  const review = reviews.value.find(r => r.id === reviewId)
  if (review) {
    review.helpful++
  }
}
</script>

<template>
  <div class="container">
    <div class="page-header">
      <h1>User Reviews</h1>
      <p class="page-description">Read what our community thinks about their gadgets</p>
    </div>
    
    <div class="reviews-container">
      <article v-for="review in reviews" :key="review.id" class="review-card">
        <div class="review-header">
          <div class="user-info">
            <img :src="review.userImage" :alt="review.userName" class="user-image">
            <div>
              <h3 class="user-name">{{ review.userName }}</h3>
              <router-link :to="`/gadget/${review.gadgetId}`" class="gadget-link">
                {{ review.gadgetName }}
              </router-link>
            </div>
          </div>
          <div class="review-rating">
            <span class="rating-value">{{ review.rating }}/5</span>
            <span class="rating-stars">★★★★★</span>
          </div>
        </div>
        
        <p class="review-comment">{{ review.comment }}</p>
        
        <div class="review-footer">
          <time :datetime="review.date" class="review-date">
            {{ new Date(review.date).toLocaleDateString() }}
          </time>
          <button 
            class="helpful-button" 
            @click="markHelpful(review.id)"
          >
            👍 Helpful ({{ review.helpful }})
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  margin: var(--space-lg) 0;
  text-align: center;
}

.page-description {
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.reviews-container {
  max-width: 800px;
  margin: var(--space-xl) auto;
}

.review-card {
  background: var(--color-background);
  border-radius: 12px;
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.user-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 1.1rem;
  margin-bottom: 2px;
}

.gadget-link {
  color: var(--color-primary);
  font-size: 0.9rem;
}

.review-rating {
  text-align: right;
}

.rating-value {
  font-weight: 600;
  margin-right: var(--space-xs);
}

.rating-stars {
  color: var(--color-accent);
}

.review-comment {
  line-height: 1.6;
  margin-bottom: var(--space-md);
}

.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.helpful-button {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--space-xs) var(--space-sm);
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.helpful-button:hover {
  background-color: var(--color-background-secondary);
}
</style>