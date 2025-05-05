import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Gadget } from '../types/gadget'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<string[]>([])
  
  const count = computed(() => items.value.length)
  
  const isInWishlist = (id: string) => items.value.includes(id)
  
  const addToWishlist = (id: string) => {
    if (!isInWishlist(id)) {
      items.value.push(id)
    }
  }
  
  const removeFromWishlist = (id: string) => {
    items.value = items.value.filter(itemId => itemId !== id)
  }
  
  const toggleWishlist = (id: string) => {
    if (isInWishlist(id)) {
      removeFromWishlist(id)
    } else {
      addToWishlist(id)
    }
  }
  
  return {
    items,
    count,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist
  }
})