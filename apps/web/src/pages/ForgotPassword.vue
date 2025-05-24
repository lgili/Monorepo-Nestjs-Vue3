<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Left illustration (desktop only) -->
    <div class="hidden md:flex md:w-1/2 bg-base-200 items-center justify-center">
      <img
        src="@/assets/auth-hero.png"
        alt="Forgot Password Illustration"
        class="object-contain h-3/4"
      />
    </div>

    <!-- Right form section -->
    <div class="flex flex-1 items-center justify-center p-6">
      <div class="w-full max-w-md">
        <!-- Top bar: logo + theme picker -->
        <div class="flex justify-between items-center mb-6">
          <router-link to="/" class="text-2xl font-bold">MyApp</router-link>
          <ThemePicker />
        </div>

        <!-- Card container -->
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body space-y-4">
            <h2 class="text-xl font-semibold text-center">Forgot Password</h2>
            <p class="text-sm opacity-80 text-center">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <!-- error -->
            <p v-if="error" class="text-error text-center">{{ error }}</p>
            <!-- success -->
            <p v-if="success" class="text-success text-center">{{ success }}</p>

            <form @submit.prevent="onSubmit" class="space-y-4">
              <!-- Email input -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email Address</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50">
                    <Mail class="w-5 h-5" />
                  </span>
                  <input
                    v-model="email"
                    type="email"
                    placeholder="Email Address"
                    class="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>

              <!-- Send reset link button -->
              <button type="submit" class="btn btn-primary w-full">
                <Mail class="w-5 h-5 mr-2" />
                Send a reset link
              </button>
            </form>

            <!-- Back to login link -->
            <p class="text-center text-sm">
              Remembered your password?
              <router-link to="/login" class="link link-primary">Login</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useAuthStore } from '@/stores/auth'

import ThemePicker from '../components/ThemePicker.vue'
import { Mail } from 'lucide-vue-next'


const auth = useAuthStore()

const email = ref('')
const error = ref('')
const success = ref('')

async function onSubmit() {
  error.value = ''
  success.value = ''
  try {
    await auth.forgotPassword(email.value)
    success.value = 'If that email is in our system, you’ll receive a reset link shortly.'
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to send reset link'
  }
}
</script>
