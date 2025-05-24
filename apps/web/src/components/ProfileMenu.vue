<template>
    <div
      :class="[
        'dropdown',
        `dropdown-${direction}`,
        `dropdown-${align}`,
      ]"
    >
      <!-- TRIGGER -->
      <label
        tabindex="0"
        class="
          flex items-center space-x-2 p-2 rounded cursor-pointer
          hover:bg-base-200 dark:hover:bg-base-300
        "
        :class="{ 'justify-center': collapsed }"
      >
        <img
          :src="avatarUrl || defaultAvatar"
          alt="Avatar"
          class="w-8 h-8 rounded-full"
        />
        <div v-if="!collapsed" class="leading-tight text-left">
          <div class="font-medium text-base-content">
            {{ name }}
          </div>
          <div class="text-sm text-base-content/70">
            {{ subtitle }}
          </div>
        </div>
        <ChevronDownIcon class="w-4 h-4 text-base-content/70" />
      </label>
  
      <!-- DROPDOWN -->
      <ul
        tabindex="0"
        class="
          dropdown-content menu menu-compact p-2 shadow
          bg-base-100 dark:bg-base-200 rounded-box w-48
        "
      >
        <slot />
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import { ChevronDown as ChevronDownIcon } from 'lucide-vue-next'
  
  const props = defineProps<{
    avatarUrl?: string
    name?: string
    subtitle?: string
    collapsed?: boolean
    direction?: 'top' | 'bottom'
    align?: 'start' | 'end'
  }>()
  
  const {
    avatarUrl,
    name = '',
    subtitle = '',
    collapsed = false,
    direction = 'bottom',
    align = 'end',
  } = props
  
  const defaultAvatar = 'https://i.pravatar.cc/100'
  </script>
  
  <style scoped>
  /* nenhuma modificação extra */
  </style>
  