<script setup lang="ts">
import { ref } from 'vue'

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  date: string
  imageUrl: string
  category: string
}

const articles = ref<NewsArticle[]>([
  {
    id: '1',
    title: 'The Future of Foldable Smartphones',
    excerpt: 'Exploring the latest innovations in foldable display technology and what it means for the future of mobile devices.',
    date: '2025-03-15',
    imageUrl: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Smartphones'
  },
  {
    id: '2',
    title: 'AI-Powered Cameras Revolutionize Photography',
    excerpt: 'How artificial intelligence is transforming smartphone photography and enabling professional-quality shots.',
    date: '2025-03-14',
    imageUrl: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Photography'
  },
  {
    id: '3',
    title: 'Next-Gen Gaming Consoles: What to Expect',
    excerpt: 'A look at the upcoming features and improvements in the next generation of gaming consoles.',
    date: '2025-03-13',
    imageUrl: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Gaming'
  }
])
</script>

<template>
  <div class="container">
    <div class="page-header">
      <h1>Tech News</h1>
      <p class="page-description">Stay updated with the latest technology news and trends</p>
    </div>
    
    <div class="news-grid">
      <article v-for="article in articles" :key="article.id" class="news-card">
        <div class="article-image">
          <img :src="article.imageUrl" :alt="article.title">
          <span class="article-category">{{ article.category }}</span>
        </div>
        <div class="article-content">
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          <div class="article-meta">
            <time :datetime="article.date">{{ new Date(article.date).toLocaleDateString() }}</time>
            <button class="read-more">Read More</button>
          </div>
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

.news-grid {
  display: grid;
  gap: var(--space-lg);
  margin: var(--space-xl) 0;
}

.news-card {
  background: var(--color-background);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.news-card:hover {
  transform: translateY(-4px);
}

.article-image {
  position: relative;
  aspect-ratio: 16/9;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-category {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  background: var(--color-primary);
  color: white;
  padding: 4px var(--space-sm);
  border-radius: 4px;
  font-size: 0.8rem;
}

.article-content {
  padding: var(--space-lg);
}

.article-title {
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
}

.article-excerpt {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
  line-height: 1.6;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.read-more {
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 500;
  cursor: pointer;
}

.read-more:hover {
  text-decoration: underline;
}

@media (min-width: 768px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>