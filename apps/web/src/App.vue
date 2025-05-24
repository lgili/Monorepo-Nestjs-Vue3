<!-- src/App.vue -->
<template>
  <RouterView v-slot="{ Component, route }">
    <!-- 1) Sem layout para páginas de auth/landing -->
    <component v-if="route.meta.hideLayout" :is="Component" />

    <!-- 2) DashboardLayout para todo /dashboard/* -->
    <DashboardLayout v-else-if="route.meta.layout === 'dashboard'">
      <component :is="Component" />
    </DashboardLayout>

    <!-- 3) DefaultLayout para o resto -->
    <DefaultLayout v-else>
      <component :is="Component" />
    </DefaultLayout>
  </RouterView>
</template>

<script setup>
import { RouterView } from 'vue-router'
import DefaultLayout   from './layouts/DefaultLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'
</script>
