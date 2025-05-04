<template>
    <div class="relative overflow-hidden  to-pink-900">
      <section class="container mx-auto py-32 text-center px-4">
        <!-- Use text-base-content (DaisyUI) para cor dinâmica -->
        <h1 class="text-5xl font-extrabold mb-4 text-base-content">
          Boost Your Workflow
        </h1>
        <p class="text-lg opacity-80 mb-8 text-base-content">
          This is a placeholder hero — replace with your own splash or headline.
        </p>
        <router-link
          to="/login"
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full text-lg font-semibold"
        >
          Get Started
        </router-link>
      </section>
  
      <div class="flex justify-center pb-32">
        <div
          class="w-64 h-64 bg-base-100/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl font-medium opacity-80 text-base-content"
        >
          Your Graphic Here
        </div>
      </div>
    </div>
  </template>
  