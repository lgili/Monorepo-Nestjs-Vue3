// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home       from '@/pages/Home.vue'
import Login      from '@/pages/Login.vue'
import Register   from '@/pages/Register.vue'
import Dashboard  from '@/pages/Dashboard.vue'

const routes = [
  { path: '/',         name: 'Home',      component: Home },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { hideLayout: true }   // ← aqui
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { hideLayout: true }   // ← aqui também
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../pages/ForgotPassword.vue'),
    meta: { hideLayout: true }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../pages/ResetPassword.vue'),
    meta: { hideLayout: true }
  },  
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
