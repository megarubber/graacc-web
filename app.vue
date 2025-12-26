<template>
  <NuxtLoadingIndicator />
  <v-app>
    <NuxtPage />
  </v-app>
  <the-header v-if="auth.authenticated"/>
</template>

<script setup lang="ts">
import { useAuthStore } from './store/auth';

const auth = useAuthStore();
</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
.overlay-loading {
  filter: blur(5px);
  opacity: 50%;
  pointer-events: none;
}
.loading {
  position: absolute;
  top: 50%;
  left: 48%;
}
</style>
