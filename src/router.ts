import { createRouter, createWebHistory } from 'vue-router'

import CreateDeckPage from './pages/CreateDeckPage.vue'
import DeckDetailPage from './pages/DeckDetailPage.vue'
import EditDeckPage from './pages/EditDeckPage.vue'
import HomePage from './pages/HomePage.vue'
import SignInPage from './pages/SignInPage.vue'
import SignUpPage from './pages/SignUpPage.vue'
import { useAuthStore } from './store/auth.store'

export const ROUTES = {
  HOME: '/',
  SIGNIN: '/sign-in',
  SIGNUP: '/sign-up',
  DECK_CREATE: '/decks/create',
  DECK_DETAIL: '/decks/:id',
  DECK_EDIT: '/decks/:id/edit',
} as const

const routes = [
  { path: ROUTES.HOME, component: HomePage, meta: { requiresAuth: true } },
  { path: ROUTES.SIGNIN, component: SignInPage, meta: { requiresAuth: false } },
  { path: ROUTES.SIGNUP, component: SignUpPage, meta: { requiresAuth: false } },
  {
    path: ROUTES.DECK_CREATE,
    component: CreateDeckPage,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTES.DECK_DETAIL,
    component: DeckDetailPage,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTES.DECK_EDIT,
    component: EditDeckPage,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return ROUTES.SIGNIN
  }

  if (!to.meta.requiresAuth && auth.isAuthenticated) {
    return ROUTES.HOME
  }

  return true
})

export default router
