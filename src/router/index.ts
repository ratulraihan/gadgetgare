import Home from '../views/Home.vue'
import GadgetDetails from '../views/GadgetDetails.vue'
import CompareGadgets from '../views/CompareGadgets.vue'
import Categories from '../views/Categories.vue'
import NotFound from '../views/NotFound.vue'
import Wishlist from '../views/Wishlist.vue'
import TechNews from '../views/TechNews.vue'
import Reviews from '../views/Reviews.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home - GadgetSpecs' }
  },
  {
    path: '/gadget/:id',
    name: 'GadgetDetails',
    component: GadgetDetails,
    meta: { title: 'Gadget Details - GadgetSpecs' }
  },
  {
    path: '/compare',
    name: 'CompareGadgets',
    component: CompareGadgets,
    meta: { title: 'Compare Gadgets - GadgetSpecs' }
  },
  {
    path: '/categories/:category?',
    name: 'Categories',
    component: Categories,
    meta: { title: 'Categories - GadgetSpecs' }
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
    meta: { title: 'My Wishlist - GadgetSpecs' }
  },
  {
    path: '/tech-news',
    name: 'TechNews',
    component: TechNews,
    meta: { title: 'Tech News - GadgetSpecs' }
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: Reviews,
    meta: { title: 'User Reviews - GadgetSpecs' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '404 - GadgetSpecs' }
  }
]

export default routes