// src/stores/auth.ts
import { defineStore } from 'pinia'
import { api } from '@/services/api'

export interface User {
  id?: number
  firstName: string
  lastName: string
  username: string
  email: string
  avatarUrl?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    user: null as User | null,
  }),

  getters: {
    isLoggedIn: state => !!state.token,
    currentUser: state => state.user,
  },

  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
      window.location.href = '/login'
    },

    async fetchUser() {
      if (!this.token) return
      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

      try {
        const { data } = await api.get<User>('/auth/me')
        this.user = data
        // console.log(this.user)
      } catch {
        this.logout()
      }
    },

    async login(email: string, password: string) {
      const { data } = await api.post<{ token: string; user: User }>('/auth/login', { email, password })
      this.setToken(data.accessToken)
      await this.fetchUser()
    },

    async register(payload: {
      firstName: string
      lastName: string
      username: string
      email: string
      password: string
    }) {
      const { data } = await api.post<{ token: string; user: User }>('/auth/register', payload)
      this.setToken(data.token)
      this.user = data.user
    },

    async forgotPassword(email: string) {
      await api.post('/auth/forgot-password', { email })
    },

    async resetPassword(token: string, password: string) {
      await api.post('/auth/reset-password', { token, password })
    },
  },
})
