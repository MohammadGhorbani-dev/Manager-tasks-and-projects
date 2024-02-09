<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav
      class="flex justify-center h-14 gap-x-5 items-center bg-gray-500 bg-opacity-5 z-20 backdrop-blur-sm text-xl font-bold fixed left-0 right-0"
    >
      <RouterLink
        :to="{ name: 'home' }"
        exact-active-class="border-b-2 border-green-500"
        class="focus:outline-none"
      >
        Home
      </RouterLink>
      <RouterLink
        :to="{ name: 'createproject' }"
        exact-active-class="border-b-2 border-green-500"
        class="focus:outline-none"
      >
        Add New Project
      </RouterLink>
    </nav>
  </header>
  <RouterView />
</template>
