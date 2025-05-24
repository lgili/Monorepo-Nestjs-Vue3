// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Overview        from '@/pages/dashboard/Overview.vue'
import Finance         from '@/pages/dashboard/Finance.vue'
import Profile         from '@/pages/dashboard/Profile.vue'
import Settings         from '@/pages/dashboard/Settings.vue'

const routes = [
  // rotas públicas…
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
    meta: { hideLayout: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register.vue'),
    meta: { hideLayout: true },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/pages/ForgotPassword.vue'),
    meta: { hideLayout: true },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/pages/ResetPassword.vue'),
    meta: { hideLayout: true },
  },

  // rotas de dashboard dentro do DashboardLayout
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { layout: 'dashboard', requiresAuth: false },
    children: [
      {
        path: '',
        name: 'Overview',
        component: Overview,
        meta: { layout: 'dashboard', requiresAuth: false },
      },
      {
        path: 'finance',
        name: 'Finance',
        component: Finance,
        meta: { layout: 'dashboard', requiresAuth: false },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        meta: { layout: 'dashboard', requiresAuth: false },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
        meta: { layout: 'dashboard', requiresAuth: false },
      },
      // … outras filhas …
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Proteção de rotas que exigem autenticação
router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next({ name: 'Login' })
  }
  next()
})

export { router }
