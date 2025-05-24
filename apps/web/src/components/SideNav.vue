<!-- src/components/SideNav.vue -->
<template>
    <nav
      class="
        h-full 
        bg-base-100 
        border-r border-base-300 
        flex flex-col 
        transition-width duration-200
      "
      :class="collapsed ? 'w-16' : 'w-64'"
    >
      <!-- Logo / cabeçalho -->
      <div
        class="flex items-center py-4 px-2"
        :class="collapsed ? 'justify-center' : ''"
      >
        <component
          v-if="collapsed"
          :is="LogoIcon"
          class="w-8 h-8"
        />
        <span
          v-else
          class="text-2xl font-bold ml-2 text-base-content"
        >
          Nexus
        </span>
      </div>
  
      <!-- Links de navegação -->
      <ul class="flex-1 menu p-2">
        <li>
          <router-link
            to="/dashboard"
            class="
              flex items-center
              space-x-3
              p-2 rounded
              hover:bg-base-200 dark:hover:bg-base-300
              text-base-content
            "
            :class="{ 'justify-center': collapsed }"
            @click="$emit('navigate')"
          >
            <!-- <DashboardIcon class="w-5 h-5" /> -->
            <span v-if="!collapsed">Overview</span>
          </router-link>
        </li>
  
        <li>
          <router-link
            to="/dashboard/finance"
            class="
              flex items-center
              space-x-3
              p-2 rounded
              hover:bg-base-200 dark:hover:bg-base-300
              text-base-content
            "
            :class="{ 'justify-center': collapsed }"
            @click="$emit('navigate')"
          >
            <CreditCardIcon class="w-5 h-5" />
            <span v-if="!collapsed">Finance</span>
          </router-link>
        </li>
  
        <!-- add more items here -->
      </ul>
  
      <!-- Perfil no rodapé -->
      <div class="p-2 border-t border-base-300">
        <div
          class="
            flex items-center
            p-2 rounded
            hover:bg-base-200 dark:hover:bg-base-300
            cursor-pointer
            text-base-content
          "
          :class="{ 'justify-center': collapsed }"
        >
          <ProfileDropdown :collapsed="collapsed" />
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  import {  CreditCardIcon } from 'lucide-vue-next'
  import LogoIcon from '@/assets/logo-light.svg'
  import ProfileDropdown from './ProfileDropdown.vue'
  
  const props = defineProps<{
    collapsed: boolean
  }>()
  
  defineEmits<{
    (e: 'navigate'): void
  }>()
  </script>
  
  <style scoped>
  .transition-width {
    transition-property: width;
  }
  </style>
  