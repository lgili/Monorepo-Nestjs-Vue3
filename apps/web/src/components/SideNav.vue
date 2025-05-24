<template>
    <nav
      class="h-full bg-base-100 flex flex-col border-r-2 border-base-300 dark:border-base-700
             transition-width duration-200"
      :class="collapsed ? 'w-16' : 'w-64'"
    >
      <!-- cabeçalho -->
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
          class="text-2xl font-bold ml-2 text-gray-800 dark:text-gray-100"
        >
          Nexus
        </span>
      </div>
  
      <!-- links -->
      <ul class="flex-1 menu p-2">
        <li>
          <router-link
            to="/dashboard"
            class="flex items-center space-x-3 p-2 rounded
                   hover:bg-base-200 dark:hover:bg-base-700"
            :class="{ 'justify-center': collapsed }"
            @click="$emit('navigate')"
          >
            <DashboardIcon class="w-5 h-5"/>
            <span v-if="!collapsed">Overview</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/dashboard/finance"
            class="flex items-center space-x-3 p-2 rounded
                   hover:bg-base-200 dark:hover:bg-base-700"
            :class="{ 'justify-center': collapsed }"
            @click="$emit('navigate')"
          >
            <CreditCardIcon class="w-5 h-5"/>
            <span v-if="!collapsed">Finance</span>
          </router-link>
        </li>
      </ul>
  
     
    </nav>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import { CreditCard as DashboardIcon, CreditCard as CreditCardIcon } from 'lucide-vue-next'
  import LogoIcon from '@/assets/logo-light.svg'
 
  
  defineProps<{ collapsed: boolean }>()
  </script>
  
  <style scoped>
  .transition-width {
    transition-property: width;
  }
  </style>
  