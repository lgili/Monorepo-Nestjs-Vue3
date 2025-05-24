<template>
    <!-- Only background + border on the header element itself -->
    <header
    class="
      flex items-center
      px-4 py-2
      bg-base-100
      border-b border-base-300
      sticky top-0 z-30
    "
  >
    <!-- 1) Hamburger always flush left -->
    <button
      @click="$emit('toggle-side')"
      class="btn btn-ghost btn-square text-base-content/70 hover:text-base-content dark:text-base-content/50 dark:hover:text-base-content"
      aria-label="Toggle sidebar"
    >
      <svg xmlns="http://www.w3.org/2000/svg"
           class="w-6 h-6"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
    

    
  
        <!-- RIGHT: search, theme picker, notifications, profile -->
        
          <input
            type="text"
            placeholder="Search…"
            class="
              input input-sm input-bordered
              bg-base-200 text-base-content placeholder:opacity-50
              dark:bg-base-200 dark:text-base-content dark:placeholder:opacity-50
              w-64
            "
          />
  
          <!-- 3) Right-hand icons get `ml-auto` to push them to the far edge -->
    <div class="flex items-center space-x-4 ml-auto">
      <ThemePicker />

      <button
        class="btn btn-ghost btn-circle text-gray-600 dark:text-gray-300"
        aria-label="Notifications"
      >
        <BellIcon class="w-6 h-6" />
      </button>

      <ProfileMenu
      :avatar-url="user?.avatarUrl"
      :name="user?.firstName + ' ' + user?.lastName"
      :subtitle="user?.username ? '@' + user.username : ''"
      :collapsed="false"
      direction="bottom"
      align="end"
    >
      <!-- slot: itens -->
      <li>
        <router-link to="/dashboard/profile" class="flex items-center space-x-2">
          <UserIcon class="w-5 h-5" /> <span>My Profile</span>
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/settings" class="flex items-center space-x-2">
          <SettingsIcon class="w-5 h-5" /> <span>Settings</span>
        </router-link>
      </li>
      <!-- <li>
        <router-link to="/dashboard/notifications" class="flex items-center space-x-2">
          <NotificationIcon class="w-5 h-5" /> <span>Notifications</span>
        </router-link>
      </li> -->
      <!-- separador estilizado -->
      <li>
            <hr class="border-base-300 dark:border-base-700 my-1" />
          </li>
      <li>
        <button @click="logout" class="flex items-center space-x-2 text-error">
          <LogOutIcon class="w-5 h-5"/> <span>Logout</span>
        </button>
      </li>
    </ProfileMenu>
    </div>
        
    </header>
  </template>
  
  <script setup lang="ts">
  import ThemePicker from '@/components/ThemePicker.vue'
  import ProfileMenu from '@/components/ProfileMenu.vue'
import {
  User as UserIcon,
  Settings as SettingsIcon,
  Bell as NotificationIcon,
  LogOut as LogOutIcon,
  BellIcon,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const user = auth.currentUser
console.log(user)

  defineEmits<{
    (e: 'toggle-side'): void
  }>()

  async function logout(){

  }
  </script>
  