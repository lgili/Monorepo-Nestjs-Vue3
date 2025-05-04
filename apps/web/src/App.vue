<!-- src/App.vue -->
<template>
  <RouterView v-slot="{ Component, route }">
    <!-- Se a rota não solicita ocultar o layout, renderiza dentro do DefaultLayout -->
    <DefaultLayout v-if="!route.meta.hideLayout">
      <component :is="Component" />
    </DefaultLayout>

    <!-- Caso contrário, renderiza a página “crua” (sem navbar, footer, etc) -->
    <component v-else :is="Component" />
  </RouterView>
</template>

<script setup>
import { RouterView } from 'vue-router'
import DefaultLayout  from '@/layouts/DefaultLayout.vue'
</script>
