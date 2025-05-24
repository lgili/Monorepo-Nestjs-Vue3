<template>
    <div class="min-h-screen flex flex-col md:flex-row">
      <!-- Left side: ilustration (escondido no mobile) -->
      <div class="hidden md:flex md:w-1/2 bg-base-200 items-center justify-center">
        <img
          src="@/assets/auth-hero.png"
          alt="Login Illustration"
          class="object-contain h-3/4"
        />
      </div>
  
      <!-- Right side: form -->
      <div class="flex flex-1 items-center justify-center p-6">
        <div class="w-full max-w-md">
          <!-- Top bar: logo + theme picker -->
          <div class="flex justify-between items-center mb-6">
            <router-link to="/" class="text-2xl font-bold">MyApp</router-link>
            <ThemePicker />
          </div>
  
          <!-- Card -->
          <div class="card bg-base-100 shadow-lg">
            <div class="card-body space-y-4">
              <h2 class="text-xl font-semibold text-center">Login</h2>
              <p class="text-sm opacity-80 text-center">
                Seamless Access, Secure Connection: Your Gateway to a Personalized Experience.
              </p>
              <p v-if="error" class="text-error text-center">{{ error }}</p>
              <form @submit.prevent="onSubmit" class="space-y-4">
                <!-- Email -->
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
  
                <!-- Password -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50">
                      <Lock class="w-5 h-5" />
                    </span>
                    <input
                      :type="show ? 'text' : 'password'"
                      v-model="password"
                      placeholder="Password"
                      class="input input-bordered w-full pl-10"
                      required
                    />
                    <button
                      type="button"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50"
                      @click="show = !show"
                    >
                      <component :is="show ? Eye : EyeOff" class="w-5 h-5" />
                    </button>
                  </div>
                  <label class="label">
                    <router-link to="/forgot-password" class="link link-hover text-sm">Forgot Password?</router-link>
                  </label>
                </div>
  
                <!-- Terms checkbox -->
                <div class="form-control">
                  <label class="cursor-pointer label">
                    <input type="checkbox" v-model="agree" class="checkbox checkbox-primary" />
                    <span class="label-text ml-2 text-sm">
                      I agree with <a href="#" class="link link-primary">terms and conditions</a>
                    </span>
                  </label>
                </div>
  
                <!-- Submit button -->
                <button type="submit" class="btn btn-primary w-full" :disabled="!agree">
                  Login
                </button>
  
                <!-- Google login -->
                <button
                  type="button"
                  @click="onGoogle"
                  class="btn btn-outline w-full flex items-center justify-center space-x-2"
                >
                <img
                    src="@/assets/google/google.svg"                    
                    class="object-contain h-3/4"
                    />
                  <span>Login with Google</span>
                </button>
              </form>
  
              <!-- Register link -->
              <p class="text-center text-sm">
                Don't have an account?
                <router-link to="/register" class="link link-primary">Create One</router-link>
              </p>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import ThemePicker from '@/components/ThemePicker.vue'
  import { Mail, Lock, Eye, EyeOff, Globe } from 'lucide-vue-next'
  
  const email = ref('')
  const password = ref('')
  const agree = ref(false)
  const show = ref(false)
  const error = ref('')
  
  const router = useRouter()
  
  async function onSubmit() {
  error.value = ''
  if (!agree.value) {
    error.value = 'You must agree to the terms.'
    return
  }
  try {
    const res = await axios.post('http://localhost:3000/auth/login', { email: email.value, password: password.value }, { withCredentials: true })
    localStorage.setItem('accessToken', res.data.accessToken)
    router.push({ name: 'Dashboard' })
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Login failed'
  }
}
  
  function onGoogle() {
    // redirect to your OAuth endpoint
    window.location.href = 'http://localhost:3000/auth/google'
  }
  </script>
  