<!-- src/components/ThemePicker.vue -->
<template>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-square">
        <!-- ícone dinâmico conforme tema -->
        <component
          :is=" theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor "
          class="w-6 h-6"
        />
      </label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li @click="set('light')">
          <a class="flex items-center">
            <Sun class="w-5 h-5 mr-2"/> Light
          </a>
        </li>
        <li @click="set('dark')">
          <a class="flex items-center">
            <Moon class="w-5 h-5 mr-2"/> Dark
          </a>
        </li>
        <li @click="set('system')">
          <a class="flex items-center">
            <Monitor class="w-5 h-5 mr-2"/> System
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useThemeStore } from '../stores/theme'
  import type { ThemeOption } from '../stores/theme'
  // importa os ícones da lucide
  import { Sun, Moon, Monitor } from 'lucide-vue-next'
  
  const store = useThemeStore()
  const theme = computed(() => store.theme)
  
  function set(t: ThemeOption) {
    store.setTheme(t)
  }
  </script>
  