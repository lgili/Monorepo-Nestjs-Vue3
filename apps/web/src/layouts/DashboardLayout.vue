<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-base-100 border-r h-full fixed top-0 left-0 z-20 transition-transform duration-300 ease-in-out',
        collapsed
          ? '-translate-x-full sm:translate-x-0 sm:w-16'
          : 'translate-x-0 w-64'
      ]"
    >
      <SideNav :collapsed="collapsed" @navigate="onNavigate" />
    </aside>

    <!-- Overlay para mobile -->
    <div
      v-if="!collapsed"
      class="fixed inset-0 bg-black/30 z-10 sm:hidden"
      @click="toggleSide"
    />

    <!-- Conteúdo principal: margem em px conforme largura do sidebar -->
    <div
      class="flex-1 flex flex-col transition-[margin] duration-300"
      :style="{
        marginLeft: `${collapsed ? 64 : 256}px`
      }"
    >
      <TopNav @toggle-side="toggleSide" />
      <main class="p-4 flex-1 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SideNav from '@/components/SideNav.vue'
import TopNav  from '@/components/TopNav.vue'

const collapsed = ref(true)

function toggleSide() {
  collapsed.value = !collapsed.value
}

function onNavigate() {
  if (window.innerWidth < 640) collapsed.value = true
}
</script>
