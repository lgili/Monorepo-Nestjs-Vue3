<!-- src/components/ProfileDropdown.vue -->
<template>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <!-- troque pela URL real do avatar -->
          <img src="https://i.pravatar.cc/100" alt="User avatar" />
        </div>
      </label>
      <ul
        tabindex="0"
        class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <a @click="goProfile">
            <span class="font-medium">Profile</span>
          </a>
        </li>
        <li>
          <a @click="logout" class="text-error">
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  function goProfile() {
    router.push({ name: 'Profile' })  // crie essa rota se precisar
  }
  
  function logout() {
    localStorage.removeItem('accessToken')
    router.push({ name: 'Login' })
  }
  </script>
  