<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Left illustration (desktop only) -->
    <div class="hidden md:flex md:w-1/2 bg-base-200 items-center justify-center">
      <img
        src="@/assets/auth-hero.png"
        alt="Reset Password Illustration"
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
            <h2 class="text-xl font-semibold text-center">Reset Password</h2>
            <p class="text-sm opacity-80 text-center">
              Enter your new password below.
            </p>
            <p v-if="error" class="text-error text-center">{{ error }}</p>
            <p v-if="success" class="text-success text-center">{{ success }}</p>
            <form @submit.prevent="onSubmit" class="space-y-4">
              <!-- New Password -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50">
                    <Lock class="w-5 h-5" />
                  </span>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    placeholder="Password"
                    class="input input-bordered w-full pl-10"
                    required
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50"
                    @click="showPassword = !showPassword"
                  >
                    <component :is="showPassword ? Eye : EyeOff" class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <!-- Confirm Password -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Confirm Password</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50">
                    <Lock class="w-5 h-5" />
                  </span>
                  <input
                    :type="showConfirm ? 'text' : 'password'"
                    v-model="confirmPassword"
                    placeholder="Confirm Password"
                    class="input input-bordered w-full pl-10"
                    required
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50"
                    @click="showConfirm = !showConfirm"
                  >
                    <component :is="showConfirm ? Eye : EyeOff" class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <!-- Terms checkbox (optional) -->
              <div class="form-control">
                <label class="cursor-pointer label">
                  <input type="checkbox" v-model="agree" class="checkbox checkbox-primary" />
                  <span class="label-text ml-2 text-sm">
                    I agree with <a href="#" class="link link-primary">terms and conditions</a>
                  </span>
                </label>
              </div>

              <!-- Submit button -->
              <button
                type="submit"
                class="btn btn-primary w-full"
                :disabled="!agree || password === '' || confirmPassword === ''"
              >
                <Lock class="w-5 h-5 mr-2" />
                Change Password
              </button>
            </form>

            <!-- Back to login link -->
            <p class="text-center text-sm">
              Go to <router-link to="/login" class="link link-primary">Login</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import ThemePicker from '../components/ThemePicker.vue'
import { Lock, Eye, EyeOff } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

// form state
const password = ref('')
const confirmPassword = ref('')
const agree = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const error = ref('')
const success = ref('')

// token from query string
const token = route.query.token as string || ''



async function onSubmit() {
  error.value = ''
  success.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }
  if (!agree.value) {
    error.value = 'You must agree to the terms.'
    return
  }
  try {
    await axios.post('http://localhost:3000/auth/reset-password', { token, newPassword: password.value })
    success.value = 'Password changed successfully.'
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Reset failed'
  }
}
</script>

