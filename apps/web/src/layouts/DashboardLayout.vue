<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <SideNav
      :collapsed="collapsed"
      @navigate="collapsed = false"
    />

    <!-- Conteúdo ocupa todo o restante -->
    <div class="flex-1 flex flex-col">
      <!-- TopNav dispara o toggle -->
      <TopNav @toggle-side="collapsed = !collapsed" />

      <!-- Rotas -->
      <main class="flex-1 overflow-auto bg-base-100 dark:bg-base-200 p-4">        
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SideNav from '@/components/SideNav.vue'
import TopNav  from '@/components/TopNav.vue'

const collapsed = ref(false)
</script>
