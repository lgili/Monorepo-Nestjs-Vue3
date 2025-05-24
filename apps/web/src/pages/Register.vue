<template>
    <div class="min-h-screen flex flex-col md:flex-row">
        <!-- Left side: illustration (hidden on mobile) -->
        <div class="hidden md:flex md:w-1/2 bg-base-200 items-center justify-center">
            <img src="@/assets/auth-hero.png" alt="Register Illustration" class="object-contain h-3/4" />
        </div>

        <!-- Right side: registration form -->
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
                        <h2 class="text-xl font-semibold text-center">Register</h2>
                        <p v-if="error" class="text-error text-center">{{ error }}</p> <!-- ← show errors here -->
                        <p class="text-sm opacity-80 text-center">
                            Join us today! Create your account to get started.
                        </p>

                        <form @submit.prevent="onSubmit" class="space-y-4">
                            <!-- Name fields -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">First Name</span>
                                    </label>
                                    <div class="relative">
                                        <span
                                            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50">
                                            <User class="w-5 h-5" />
                                        </span>
                                        <input v-model="firstName" type="text" placeholder="First Name"
                                            class="input input-bordered w-full pl-10" required />
                                    </div>
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Last Name</span>
                                    </label>
                                    <div class="relative">
                                        <span
                                            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50">
                                            <User class="w-5 h-5" />
                                        </span>
                                        <input v-model="lastName" type="text" placeholder="Last Name"
                                            class="input input-bordered w-full pl-10" required />
                                    </div>
                                </div>
                            </div>

                            <!-- Username -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Username</span>
                                </label>
                                <div class="relative">
                                    <span
                                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50">
                                        <User class="w-5 h-5" />
                                    </span>
                                    <input v-model="username" type="text" placeholder="Username"
                                        class="input input-bordered w-full pl-10" required />
                                </div>
                            </div>

                            <!-- Email -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email Address</span>
                                </label>
                                <div class="relative">
                                    <span
                                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50">
                                        <Mail class="w-5 h-5" />
                                    </span>
                                    <input v-model="email" type="email" placeholder="Email Address"
                                        class="input input-bordered w-full pl-10" required />
                                </div>
                            </div>

                            <!-- Password -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <div class="relative">
                                    <span
                                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50">
                                        <Lock class="w-5 h-5" />
                                    </span>
                                    <input :type="show ? 'text' : 'password'" v-model="password" placeholder="Password"
                                        class="input input-bordered w-full pl-10" required />
                                    <button type="button"
                                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50"
                                        @click="show = !show">
                                        <component :is="show ? Eye : EyeOff" class="w-5 h-5" />
                                    </button>
                                </div>
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

                            <!-- Register button -->
                            <button type="submit" class="btn btn-primary w-full" :disabled="!agree">
                                <User class="w-5 h-5 mr-2" /> Register
                            </button>

                            <!-- Google register -->
                            <button type="button" @click="onGoogle"
                                class="btn btn-outline w-full flex items-center justify-center space-x-2">
                                <img src="@/assets/google/google.svg" class="object-contain h-3/4" />
                                <span>Register with Google</span>
                            </button>
                        </form>

                        <!-- Login link -->
                        <p class="text-center text-sm">
                            Already have an account?
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ThemePicker from '../components/ThemePicker.vue'
import { Mail, Lock, Eye, EyeOff, User, Globe } from 'lucide-vue-next'

const router = useRouter()
const auth = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const agree = ref(false)
const show = ref(false)
const error = ref<string>('')

async function onSubmit() {
    error.value = ''  // reset
    if (!agree.value) {
        error.value = 'You must agree to the terms.'
        return
    }
    try {
        await auth.register({
                firstName: firstName.value,
                lastName: lastName.value,
                username: username.value,
                email: email.value,
                password: password.value
            })
        // success → go to login
        router.push({ name: 'Login' })
    } catch (err: any) {
        // show the server’s error message if available
        error.value =
            err.response?.data?.message ||
            'Registration failed. Please try again.'
    }
}

function onGoogle() {
    window.location.href = 'http://localhost:3000/auth/google'
}
</script>