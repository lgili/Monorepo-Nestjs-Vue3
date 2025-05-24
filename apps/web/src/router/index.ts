// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Overview        from '@/pages/dashboard/Overview.vue'
import Finance         from '@/pages/dashboard/Finance.vue'


const routes = [
  // rotas públicas…
  { path: '/',            name: 'Home',      component: import('@/pages/Home.vue') },
  { path: '/login',       name: 'Login',     component: import('@/pages/Login.vue'),       meta: { hideLayout: true } },
  { path: '/register',    name: 'Register',  component: import('@/pages/Register.vue'),    meta: { hideLayout: true } },
  { path: '/forgot-password', name: 'ForgotPassword', component: import('@/pages/ForgotPassword.vue'), meta: { hideLayout: true } },
  { path: '/reset-password',  name: 'ResetPassword',  component: import('@/pages/ResetPassword.vue'),  meta: { hideLayout: true } },



  // rotas de dashboard dentro do DashboardLayout
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { layout: 'dashboard', requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Overview',
        component: Overview,
        meta: { layout: 'dashboard' }
      },
      {
        path: 'finance',
        name: 'Finance',
        component: Finance,
        meta: { layout: 'dashboard' }
      },
      // … outras filhas …
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
