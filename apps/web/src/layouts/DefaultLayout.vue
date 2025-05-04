<template>
    <!-- Navbar with brand on the left, theme toggle + login on the right -->
    <header class="bg-base-100 shadow">
        <div class="container mx-auto flex justify-between items-center px-4 py-4">
            <!-- Marca no canto esquerdo -->
            <router-link to="/" class="text-2xl font-bold">
                MyApp
            </router-link>

            <!-- Botões no canto direito -->
            <div class="flex items-center space-x-4">
                <!-- Tema -->
                <ThemePicker />

                <!-- Login -->
                <router-link to="/login" class="link link-hover text-lg font-medium text-base-content">
                    Login
                </router-link>
            </div>
        </div>
    </header>

    <!-- Main content area -->
    <main class="container mx-auto p-8">
        <slot />
    </main>

    <!-- Footer -->
    <footer class="footer footer-center p-4 bg-base-200 text-base-content">
        <div>© 2025 MyApp. All rights reserved.</div>
    </footer>
</template>

<script setup>
import ThemePicker from '@/components/ThemePicker.vue'
import { useThemeStore } from '../stores/theme'
const theme = useThemeStore()
</script>

<style scoped>
/* Optional: customize navbar shadow or spacing */
.navbar {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>